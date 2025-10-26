import './PersonalInfoPage.css'

const PersonalInfoPage = () => {
  return (
    <div className="personal-info-page">
      <div className="personal-info-container">
        <div className="personal-info-card">
          <h1 className="page-title">개인정보 입력</h1>

          <form className="info-form">
            {/* 기본 정보 */}
            <div className="form-section">
              <h2 className="section-title">기본 정보</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">이름</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="홍길동"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">직급</label>
                  <select className="form-select">
                    <option>선택하세요</option>
                    <option>사원</option>
                    <option>대리</option>
                    <option>과장</option>
                    <option>차장</option>
                    <option>부장</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">소속</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="개발팀"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">카드번호</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="1234-5678-9012-3456"
                  />
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="button-group">
              <button type="button" className="button-cancel">
                취소
              </button>
              <button type="submit" className="button-submit">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoPage
