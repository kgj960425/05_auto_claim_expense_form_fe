import { Upload, Check, RefreshCw } from 'lucide-react'
import './ExpenseClaimPage.css'

const ExpenseClaimPage = () => {
  const currentStep = 3; // 현재 진행 중인 단계 (1-5)
  const totalSteps = 5;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="expense-claim-page">
      <div className="expense-claim-container">
        {/* 진행 상황 */}
        <div className="progress-section">
          <div className="progress-header">
            <h2 className="progress-title">처리 진행상황</h2>
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
                    <th>항목</th>
                    <th>금액</th>
                    <th>분류</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-01-15</td>
                    <td>택시요금</td>
                    <td>15,000원</td>
                    <td className="category-text">교통비</td>
                  </tr>
                  <tr>
                    <td>2024-01-15</td>
                    <td>점심식사</td>
                    <td>12,000원</td>
                    <td className="category-text blue">식비</td>
                  </tr>
                  <tr>
                    <td>2024-01-16</td>
                    <td>사무용품</td>
                    <td>25,000원</td>
                    <td className="category-text red">사무비</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="summary-section">
              <div className="summary-row">
                <span className="summary-label">총 건수:</span>
                <span className="summary-value">3건</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">총 금액:</span>
                <span className="summary-total">52,000원</span>
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
                <button className="upload-button">
                  파일 선택
                </button>
                <p className="upload-hint">지원 형식: JPG, PNG, PDF (최대 10MB)</p>
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
