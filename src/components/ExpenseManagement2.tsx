import React, { useState, useRef } from 'react';
import { Workbook } from '@fortune-sheet/react';
import '@fortune-sheet/react/dist/index.css';
import * as XLSX from 'xlsx';
import { Upload, FileText, Download, Loader2, Plus } from 'lucide-react';

export default function ExpenseManagementFortuneSheet() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetData, setSheetData] = useState([{
    name: '경비내역',
    color: '',
    config: {
      columnlen: {
        0: 120, // 날짜
        1: 180, // 업종
        2: 120, // 금액
        3: 120, // 분류
        4: 250  // 상세
      }
    },
    celldata: [
      // 헤더 행
      { r: 0, c: 0, v: { v: '날짜', ct: { fa: 'General', t: 'g' }, m: '날짜', bg: '#4472C4', fc: '#ffffff', fs: 12, bl: 1 } },
      { r: 0, c: 1, v: { v: '업종', ct: { fa: 'General', t: 'g' }, m: '업종', bg: '#4472C4', fc: '#ffffff', fs: 12, bl: 1 } },
      { r: 0, c: 2, v: { v: '금액', ct: { fa: 'General', t: 'g' }, m: '금액', bg: '#4472C4', fc: '#ffffff', fs: 12, bl: 1 } },
      { r: 0, c: 3, v: { v: '분류', ct: { fa: 'General', t: 'g' }, m: '분류', bg: '#4472C4', fc: '#ffffff', fs: 12, bl: 1 } },
      { r: 0, c: 4, v: { v: '상세', ct: { fa: 'General', t: 'g' }, m: '상세', bg: '#4472C4', fc: '#ffffff', fs: 12, bl: 1 } },
    ]
  }]);

  const workbookRef = useRef(null);

  // PDF 파일 선택
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const fileURL = URL.createObjectURL(file);
      setPdfPreview(fileURL);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  };

  // OCR API 호출
  const handleOCRProcess = async () => {
    if (!pdfFile) {
      alert('PDF 파일을 먼저 선택해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);

      const response = await fetch('http://localhost:8000/api/ocr/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('OCR 처리 실패');
      }

      const data = await response.json();

      if (data.success) {
        addDataToSheet(data.data);
      } else {
        throw new Error(data.message || 'OCR 처리 중 오류 발생');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert(`오류 발생: ${error.message}\n\n개발용 샘플 데이터를 추가합니다.`);
      
      // 개발용 더미 데이터
      const dummyData = [
        { date: '2024-01-15', store: '택시요금', amount: 15000, category: '교통비', description: '출장용' },
        { date: '2024-01-15', store: '편의점식사', amount: 12000, category: '식비', description: '점심' },
        { date: '2024-01-16', store: '사무용품', amount: 25000, category: '사무비', description: '볼펜 구매' }
      ];
      addDataToSheet(dummyData);
    } finally {
      setIsLoading(false);
    }
  };

  // Fortune Sheet에 데이터 추가
  const addDataToSheet = (expenses) => {
    const newCelldata = [...sheetData[0].celldata];
    
    expenses.forEach((expense, index) => {
      const rowIndex = index + 1; // 헤더 다음부터
      
      // 날짜
      newCelldata.push({
        r: rowIndex,
        c: 0,
        v: { v: expense.date, ct: { fa: 'yyyy-MM-dd', t: 'd' }, m: expense.date }
      });
      
      // 업종
      newCelldata.push({
        r: rowIndex,
        c: 1,
        v: { v: expense.store, ct: { fa: 'General', t: 'g' }, m: expense.store }
      });
      
      // 금액
      newCelldata.push({
        r: rowIndex,
        c: 2,
        v: { 
          v: expense.amount, 
          ct: { fa: '#,##0', t: 'n' }, 
          m: expense.amount.toLocaleString()
        }
      });
      
      // 분류
      newCelldata.push({
        r: rowIndex,
        c: 3,
        v: { v: expense.category, ct: { fa: 'General', t: 'g' }, m: expense.category }
      });
      
      // 상세
      newCelldata.push({
        r: rowIndex,
        c: 4,
        v: { v: expense.description || '', ct: { fa: 'General', t: 'g' }, m: expense.description || '' }
      });
    });

    setSheetData([{
      ...sheetData[0],
      celldata: newCelldata
    }]);
  };

  // 샘플 셀 합병 데이터 추가
  const addMergedSample = () => {
    const newCelldata = [...sheetData[0].celldata];
    const lastRow = Math.max(...newCelldata.map(cell => cell.r)) + 1;

    // 합병된 셀 추가 (2행 x 2열 합병)
    newCelldata.push({
      r: lastRow,
      c: 0,
      v: { 
        v: '합병된 셀 예시', 
        ct: { fa: 'General', t: 'g' }, 
        m: '합병된 셀 예시',
        bg: '#FFF2CC',
        mc: { r: lastRow, c: 0, rs: 2, cs: 2 } // rs: rowspan, cs: colspan
      }
    });

    // 금액
    newCelldata.push({
      r: lastRow,
      c: 2,
      v: { v: 50000, ct: { fa: '#,##0', t: 'n' }, m: '50,000' }
    });

    setSheetData([{
      ...sheetData[0],
      celldata: newCelldata
    }]);
  };

  // 엑셀 다운로드 (SheetJS)
  const handleExcelExport = () => {
    try {
      // Fortune Sheet에서 데이터 추출
      const celldata = sheetData[0].celldata;
      
      // 행과 열의 최대값 찾기
      const maxRow = Math.max(...celldata.map(cell => cell.r));
      const maxCol = Math.max(...celldata.map(cell => cell.c));

      // 2D 배열 생성
      const data = Array(maxRow + 1).fill(null).map(() => Array(maxCol + 1).fill(''));

      // 셀 데이터 채우기
      celldata.forEach(cell => {
        if (cell.v && cell.v.v !== undefined) {
          data[cell.r][cell.c] = cell.v.v;
        }
      });

      // SheetJS 워크북 생성
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);

      // 컬럼 너비 설정
      ws['!cols'] = [
        { wch: 12 }, // 날짜
        { wch: 20 }, // 업종
        { wch: 12 }, // 금액
        { wch: 10 }, // 분류
        { wch: 30 }  // 상세
      ];

      // 셀 합병 정보 추가
      const merges = [];
      celldata.forEach(cell => {
        if (cell.v && cell.v.mc) {
          const mc = cell.v.mc;
          merges.push({
            s: { r: mc.r, c: mc.c },
            e: { r: mc.r + mc.rs - 1, c: mc.c + mc.cs - 1 }
          });
        }
      });
      if (merges.length > 0) {
        ws['!merges'] = merges;
      }

      XLSX.utils.book_append_sheet(wb, ws, '경비내역');

      // 다운로드
      const fileName = `경비내역_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error('Export Error:', error);
      alert('엑셀 다운로드 중 오류가 발생했습니다.');
    }
  };

  // 총액 계산
  const calculateTotal = () => {
    const celldata = sheetData[0].celldata;
    let total = 0;
    
    celldata.forEach(cell => {
      if (cell.c === 2 && cell.r > 0) { // 금액 열, 헤더 제외
        const value = cell.v && cell.v.v;
        if (typeof value === 'number') {
          total += value;
        }
      }
    });
    
    return total;
  };

  // 데이터 행 개수
  const getRowCount = () => {
    const celldata = sheetData[0].celldata;
    const rows = new Set(celldata.map(cell => cell.r));
    return rows.size - 1; // 헤더 제외
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">스마트 경비관리</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">처리 진행상황</h2>
            <span className="text-sm text-gray-500">3 / 5 단계</span>
          </div>
          <div className="flex items-center">
            {/* Step 1 - Complete */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="mt-2 text-xs font-medium text-gray-900">PDF 업로드</span>
            </div>
            <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>

            {/* Step 2 - Complete */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="mt-2 text-xs font-medium text-gray-900">OCR 처리</span>
            </div>
            <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>

            {/* Step 3 - Current */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                3
              </div>
              <span className="mt-2 text-xs font-medium text-gray-900">데이터 편집</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

            {/* Step 4 - Pending */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
                4
              </div>
              <span className="mt-2 text-xs font-medium text-gray-400">검증</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

            {/* Step 5 - Pending */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
                5
              </div>
              <span className="mt-2 text-xs font-medium text-gray-400">다운로드</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - PDF Upload */}
          <div className="space-y-6">
            {/* PDF Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">PDF 영수증 업로드</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">PDF 파일 선택</p>
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 text-sm">
                    <Upload className="w-4 h-4" />
                    파일 선택
                  </span>
                </label>
              </div>

              {pdfFile && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">📄 {pdfFile.name}</p>
                  <button
                    onClick={handleOCRProcess}
                    disabled={isLoading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center justify-center gap-2 disabled:bg-gray-400"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        OCR 처리 중...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        OCR 처리 시작
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* PDF Preview */}
            {pdfPreview && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">미리보기</h3>
                <iframe
                  src={pdfPreview}
                  className="w-full h-64 border border-gray-300 rounded"
                  title="PDF Preview"
                />
              </div>
            )}

            {/* Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">요약</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">총 건수:</span>
                  <span className="font-medium">{getRowCount()}건</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold text-gray-900">총 금액:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {calculateTotal().toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Fortune Sheet */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">경비 내역 편집</h3>
                <div className="flex gap-2">
                  <button
                    onClick={addMergedSample}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    셀 합병 샘플
                  </button>
                  <button
                    onClick={handleExcelExport}
                    disabled={getRowCount() === 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2 disabled:bg-gray-400 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    엑셀 다운로드
                  </button>
                </div>
              </div>

              <div style={{ height: '600px' }}>
                <Workbook
                  ref={workbookRef}
                  data={sheetData}
                  onChange={(data) => setSheetData(data)}
                  lang="ko"
                />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 사용 팁</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 셀을 선택하고 마우스 우클릭하여 셀 합병 가능</li>
                <li>• 셀을 더블클릭하여 직접 편집</li>
                <li>• Ctrl+C / Ctrl+V로 복사/붙여넣기</li>
                <li>• "셀 합병 샘플" 버튼으로 합병 예시 확인</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
