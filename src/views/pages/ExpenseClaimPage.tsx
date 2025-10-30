import { Upload } from 'lucide-react'
import { useState, useRef } from 'react'

import './ExpenseClaimPage.css'

const ExpenseClaimPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [outputFolder, setOutputFolder] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 셀 편집 상태 관리
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];

    // 각 파일 검증
    for (const file of fileArray) {
      // PDF 파일 검증
      if (file.type !== 'application/pdf') {
        alert(`${file.name}은(는) PDF 파일이 아닙니다.`);
        continue;
      }
      // 파일 크기 검증 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name}의 크기가 10MB를 초과합니다.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      console.log(selectedFiles);
      setSelectedFiles(validFiles);
      handleFileUpload(validFiles);
    }
  };

  // 파일 업로드 API 호출
  const handleFileUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
      const formData = new FormData();

      // 여러 파일을 files 필드에 추가
      files.forEach((file) => {
        formData.append('files', file);
      });

      console.log('업로드 요청:', {
        filesCount: files.length,
        fileNames: files.map(f => f.name),
      });

      // Vite 프록시를 통해 /ocr 경로로 요청
      const response = await fetch('/ocr/upload?user_id=tester', {
        method: 'POST',
        body: formData,
      });

      console.log('응답 상태:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답:', errorText);
        throw new Error(`파일 업로드 실패: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('업로드 응답:', data);

      // 영수증 데이터 저장
      if (data.receipts && Array.isArray(data.receipts)) {
        // 날짜 기준 오름차순 정렬
        const sortedReceipts = [...data.receipts].sort((a, b) => {
          const dateA = new Date(a.transaction_date);
          const dateB = new Date(b.transaction_date);
          return dateA.getTime() - dateB.getTime();
        });
        setReceipts(sortedReceipts);
        // 첫 번째 영수증을 기본으로 선택
        if (sortedReceipts.length > 0) {
          setSelectedReceipt(sortedReceipts[0]);
        }
      }

      // output_folder 저장
      if (data.output_folder) {
        setOutputFolder(data.output_folder);
      }

      alert(`${files.length}개의 파일 업로드가 완료되었습니다!\n${data.receipts?.length || 0}개의 영수증이 처리되었습니다.`);
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      setSelectedFiles([]);
      // input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 파일 선택 버튼 클릭 핸들러
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 영수증 row 클릭 핸들러
  const handleReceiptClick = (receipt: any) => {
    setSelectedReceipt(receipt);
  };

  // 영수증 이미지 URL 생성
  const getReceiptImageUrl = (receipt: any) => {
    if (!receipt || !receipt.filename || !outputFolder) return null;

    // output_folder에서 user_id와 timestamp 부분만 추출
    // 예: "static/temp/tester_20251030030748_c02fb65b/ocr" -> "tester_20251030030748_c02fb65b/ocr"
    const folderPath = outputFolder.replace('static/temp/', '');

    const baseUrl = import.meta.env.VITE_EXPENSE_CLAIM_FORM_URL;
    return `${baseUrl}/blur/${folderPath}/${receipt.filename}`;
  };

  // 셀 더블클릭 핸들러
  const handleCellDoubleClick = (rowIndex: number, field: string, currentValue: string) => {
    setEditingCell({ rowIndex, field });
    setEditValue(currentValue);
  };

  // 셀 편집 완료 핸들러
  const handleCellBlur = () => {
    if (editingCell) {
      const { rowIndex, field } = editingCell;
      const updatedReceipts = [...receipts];
      updatedReceipts[rowIndex][field] = editValue;
      setReceipts(updatedReceipts);

      // 선택된 영수증도 업데이트
      if (selectedReceipt === receipts[rowIndex]) {
        setSelectedReceipt(updatedReceipts[rowIndex]);
      }
    }
    setEditingCell(null);
    setEditValue('');
  };

  // Enter 키 입력 시 편집 완료
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    }
    if (e.key === 'Escape') {
      setEditingCell(null);
      setEditValue('');
    }
  };

  // 날짜를 월/일 형식으로 변환 (2자리 패딩)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}/${day}`;
    } catch {
      return dateString;
    }
  };

  // localStorage에서 저장된 카드번호 가져오기
  const getSavedCardNumbers = (): string[] => {
    const saved = localStorage.getItem('personalInfo');
    if (saved) {
      const data = JSON.parse(saved);
      return data.cardNumbers || [];
    }
    return [];
  };

  // 카드번호 비교 함수 (숫자만 추출해서 비교)
  const getMatchingCardNumber = (receiptCardNumber: string): string => {
    const savedCards = getSavedCardNumbers();
    const receiptDigits = receiptCardNumber.replace(/[^0-9]/g, ''); // 숫자만 추출

    // 저장된 카드번호들과 비교
    for (const savedCard of savedCards) {
      const savedDigits = savedCard.replace(/[^0-9]/g, ''); // 숫자만 추출

      // 최소 4자리 이상 일치하는지 확인
      let matchCount = 0;
      const minLength = Math.min(receiptDigits.length, savedDigits.length);

      for (let i = 0; i < minLength; i++) {
        if (receiptDigits[i] === savedDigits[i]) {
          matchCount++;
        }
      }

      // 4자리 이상 일치하면 저장된 카드번호 반환
      if (matchCount >= 4) {
        return savedCard;
      }
    }

    // 일치하는 카드가 없으면 원래 번호 반환
    return receiptCardNumber;
  };

  // 가맹점명에 특정 키워드가 포함되어 있는지 확인
  const isInvalidMerchantName = (merchantName: string): boolean => {
    const invalidKeywords = [
      '카드명', '카드번호', '거래일자', '승인번호', '금액', '부가세', '봉사료',
      '컵 보증금', '합계', '거래유형', '승인상태', '결제방법', '할부',
      '가맹점명', '업종', '대표자명', '사업자번호', '전화번호', '가맹점번호', '주소'
    ];

    return invalidKeywords.some(keyword => merchantName.includes(keyword));
  };

  return (
    <div className="expense-claim-page">
      <div className="expense-claim-container">
        {/* 메인 컨텐츠 */}
        <div className="main-content">
          {/* 영수증 미리보기 */}
          <div className="receipt-preview">
            <div className="upload-area">
              {selectedReceipt ? (
                <img
                  src={getReceiptImageUrl(selectedReceipt) || ''}
                  alt={selectedReceipt.merchant_name}
                  className="receipt-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <div className="upload-content">
                  <div className="upload-icon">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="upload-text">영수증을 드래그하여 업로드하거나</p>
                  <p className="upload-text">클릭하여 파일을 선택하세요</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <button
                    className="upload-button"
                    onClick={handleButtonClick}
                    disabled={isUploading}
                  >
                    {isUploading ? '업로드 중...' : '파일 선택'}
                  </button>
                  <p className="upload-hint">지원 형식: PDF (최대 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* 영수 상세 내용 */}
          <div className="receipt-details">
            <h2 className="section-title">영수 상세 내용</h2>
            <div className="receipt-table-container">
              <table className="receipt-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>가맹점명</th>
                    <th>금액</th>
                    <th>카드번호</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.length > 0 ? (
                    receipts.map((receipt, index) => (
                      <tr
                        key={index}
                        onClick={() => handleReceiptClick(receipt)}
                        className={`${selectedReceipt === receipt ? 'selected' : ''} ${isInvalidMerchantName(receipt.merchant_name) ? 'invalid-merchant' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <td
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleCellDoubleClick(index, 'transaction_date', receipt.transaction_date);
                          }}
                        >
                          {editingCell?.rowIndex === index && editingCell?.field === 'transaction_date' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={handleCellBlur}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="cell-input"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            formatDate(receipt.transaction_date)
                          )}
                        </td>
                        <td
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleCellDoubleClick(index, 'merchant_name', receipt.merchant_name);
                          }}
                        >
                          {editingCell?.rowIndex === index && editingCell?.field === 'merchant_name' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={handleCellBlur}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="cell-input"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            receipt.merchant_name
                          )}
                        </td>
                        <td
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleCellDoubleClick(index, 'total_amount', receipt.total_amount);
                          }}
                        >
                          {editingCell?.rowIndex === index && editingCell?.field === 'total_amount' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={handleCellBlur}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="cell-input"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            `${receipt.total_amount}원`
                          )}
                        </td>
                        <td
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleCellDoubleClick(index, 'card_number', receipt.card_number);
                          }}
                        >
                          {editingCell?.rowIndex === index && editingCell?.field === 'card_number' ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={handleCellBlur}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="cell-input"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            getMatchingCardNumber(receipt.card_number)
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                        파일을 업로드하면 영수증 정보가 표시됩니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="summary-section">
              <div className="summary-row">
                <span className="summary-label">총 건수:</span>
                <span className="summary-value">{receipts.length}건</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">총 금액:</span>
                <span className="summary-total">
                  {receipts.reduce((sum, receipt) => {
                    const amount = parseInt(receipt.total_amount.replace(/,/g, '')) || 0;
                    return sum + amount;
                  }, 0).toLocaleString()}원
                </span>
              </div>
            </div>
            <div className="action-buttons">
              <button className="action-button green">
                엑셀 다운로드
              </button>
              <button className="action-button red">
                PDF 다운로드
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ExpenseClaimPage
