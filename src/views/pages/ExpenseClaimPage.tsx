import { Upload, Check, RefreshCw } from 'lucide-react'
import { useState, useRef } from 'react'

import './ExpenseClaimPage.css'

const ExpenseClaimPage = () => {
  const currentStep = 3; // 현재 진행 중인 단계 (1-5)
  const totalSteps = 5;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const [isCheckingServer, setIsCheckingServer] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 서버 체크 API 호출
  const handleServerCheck = async () => {
    setIsCheckingServer(true);
    try {
      const response = await fetch('/serverCheck', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('서버 체크 실패');
      }

      const data = await response.json();
      console.log('서버 상태:', data);
      alert(`서버 응답: ${data.msg}`);
    } catch (error) {
      console.error('서버 체크 에러:', error);
      alert('서버 체크 중 오류가 발생했습니다.');
    } finally {
      setIsCheckingServer(false);
    }
  };

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
        setReceipts(data.receipts);
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

  return (
    <div className="expense-claim-page">
      <div className="expense-claim-container">
        {/* 진행 상황 */}
        <div className="progress-section">
          <div className="progress-header">
            <h2 className="progress-title">처리 진행상황</h2>
            <button
              className="progress-check-button"
              onClick={handleServerCheck}
              disabled={isCheckingServer}
            >
              {isCheckingServer ? '확인 중...' : 'OCR 서버 상태 확인'}
            </button>
            <span className="progress-counter">{currentStep} / {totalSteps} 단계</span>
          </div>
          <div className="progress-steps">
            <div className="progress-track">
              <div className="progress-track-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="progress-step">
              <div className="progress-step-icon completed">
                <Check className="w-5 h-5" />
              </div>
              <span className="progress-step-text">영수증 업로드</span>
            </div>

            <div className="progress-step">
              <div className="progress-step-icon completed">
                <Check className="w-5 h-5" />
              </div>
              <span className="progress-step-text">OCR 처리</span>
            </div>

            <div className="progress-step">
              <div className="progress-step-icon current">
                <RefreshCw className="w-5 h-5" />
              </div>
              <span className="progress-step-text">데이터 분류</span>
            </div>

            <div className="progress-step">
              <div className="progress-step-icon pending">4</div>
              <span className="progress-step-text pending">엑셀 생성</span>
            </div>

            <div className="progress-step">
              <div className="progress-step-icon pending">5</div>
              <span className="progress-step-text pending">다운로드</span>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="main-content">
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
                      <tr key={index}>
                        <td>{receipt.transaction_date}</td>
                        <td>{receipt.merchant_name}</td>
                        <td>{receipt.total_amount}원</td>
                        <td>{receipt.card_number}</td>
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
          </div>

          {/* 영수증 미리보기 */}
          <div className="receipt-preview">
            <h2 className="section-title">영수증 미리보기</h2>
            <div className="upload-area">
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
            </div>
          </div>
        </div>

        {/* 하단 3개 카드 */}
        <div className="bottom-cards">
          {/* 엑셀 Import */}
          <div className="card">
            <div className="card-content">
              <div className="card-icon green">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <h3 className="card-title">엑셀 Import</h3>
              <p className="card-description">시리얼 데이터를 엑셀 파일로 내보내기</p>
              <button className="card-button green">
                엑셀 다운로드
              </button>
            </div>
          </div>

          {/* PDF 병합 */}
          <div className="card">
            <div className="card-content">
              <div className="card-icon red">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <h3 className="card-title">PDF 병합</h3>
              <p className="card-description">모든 영수증을 하나의 PDF로 병합</p>
              <button className="card-button red">
                PDF 다운로드
              </button>
            </div>
          </div>

          {/* 요약 통계 */}
          <div className="card">
            <div className="card-content">
              <div className="card-icon blue">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3z" />
                </svg>
              </div>
              <h3 className="card-title">요약 통계</h3>
              <div className="stats-list">
                <div className="stats-item">
                  <span className="stats-label">교통비:</span>
                  <span className="stats-value">15,000원</span>
                </div>
                <div className="stats-item">
                  <span className="stats-label">식비:</span>
                  <span className="stats-value">12,000원</span>
                </div>
                <div className="stats-item">
                  <span className="stats-label">사무비:</span>
                  <span className="stats-value">25,000원</span>
                </div>
                <div className="stats-total">
                  <span className="stats-total-label">총합:</span>
                  <span className="stats-total-value">52,000원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseClaimPage
