import { Bell } from 'lucide-react'
import './NoticePage.css'

const NoticePage = () => {
  const notices = [
    {
      id: 1,
      title: '2024년 1월 경비 청구 마감 안내',
      date: '2024-01-20',
      content: '1월 경비 청구는 1월 25일까지 완료해주시기 바랍니다.',
      important: true
    },
    {
      id: 2,
      title: '시스템 점검 안내',
      date: '2024-01-18',
      content: '1월 21일 00:00 ~ 02:00 시스템 점검이 진행됩니다.',
      important: false
    },
    {
      id: 3,
      title: '경비 청구 가이드라인 업데이트',
      date: '2024-01-15',
      content: '새로운 경비 청구 가이드라인이 업데이트되었습니다. 확인 부탁드립니다.',
      important: false
    },
    {
      id: 4,
      title: 'OCR 기능 개선 안내',
      date: '2024-01-10',
      content: '영수증 인식 정확도가 향상되었습니다.',
      important: false
    },
    {
      id: 5,
      title: '신규 기능 추가 안내',
      date: '2024-01-05',
      content: 'PDF 병합 기능이 새롭게 추가되었습니다.',
      important: false
    }
  ]

  return (
    <div className="notice-page">
      <div className="notice-container">
        <div className="notice-card">
          <div className="notice-header">
            <Bell className="w-6 h-6 notice-icon" />
            <h1 className="notice-title">공지사항</h1>
          </div>

          <div className="notice-list">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`notice-item ${notice.important ? 'important' : ''}`}
              >
                <div className="notice-item-content">
                  <div className="notice-item-text">
                    <div className="notice-item-header">
                      {notice.important && (
                        <span className="notice-badge">
                          중요
                        </span>
                      )}
                      <h3 className="notice-item-title">
                        {notice.title}
                      </h3>
                    </div>
                    <p className="notice-item-description">{notice.content}</p>
                    <div className="notice-item-meta">
                      <span>{notice.date}</span>
                    </div>
                  </div>
                  <button className="notice-item-arrow">
                    <svg
                      className="notice-arrow-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button className="pagination-button">
              이전
            </button>
            <button className="pagination-button active">1</button>
            <button className="pagination-button">
              2
            </button>
            <button className="pagination-button">
              3
            </button>
            <button className="pagination-button">
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticePage
