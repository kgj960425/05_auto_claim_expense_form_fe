import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import './PersonalInfoPage.css'

const PersonalInfoPage = () => {
  const [cardNumbers, setCardNumbers] = useState([''])

  const addCardNumber = () => {
    setCardNumbers([...cardNumbers, ''])
  }

  const removeCardNumber = (index: number) => {
    if (cardNumbers.length > 1) {
      setCardNumbers(cardNumbers.filter((_, i) => i !== index))
    }
  }

  const updateCardNumber = (index: number, value: string) => {
    const newCardNumbers = [...cardNumbers]
    newCardNumbers[index] = value
    setCardNumbers(newCardNumbers)
  }

  return (
    <div className="personal-info-page">
      <div className="personal-info-container">
        <div className="personal-info-card">
          <h1 className="page-title">개인정보 입력</h1>

          <form className="info-form">
            {/* 기본 정보 */}
            <div className="form-section">
              <table className="info-table">
                <tbody>
                  <tr>
                    <td className="table-header" rowSpan={3}>기본 정보</td>
                    <td className="table-label">이름</td>
                    <td className="table-input">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="홍길동"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="table-label">직급</td>
                    <td className="table-input">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="대리"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="table-label">소속</td>
                    <td className="table-input">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="개발팀"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 카드 번호 */}
            <div className="form-section">
              <h2 className="section-title">카드 번호</h2>
              <div className="card-numbers-container">
                {cardNumbers.map((cardNumber, index) => (
                  <div key={index} className="card-number-item">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="1234-5678-9012-3456"
                      value={cardNumber}
                      onChange={(e) => updateCardNumber(index, e.target.value)}
                    />
                    {cardNumbers.length > 1 && (
                      <button
                        type="button"
                        className="remove-card-button"
                        onClick={() => removeCardNumber(index)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="add-card-button"
                  onClick={addCardNumber}
                >
                  <Plus className="w-5 h-5" />
                  카드 추가
                </button>
              </div>
            </div>

            {/* 버튼 */}
            <div className="button-group">
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
