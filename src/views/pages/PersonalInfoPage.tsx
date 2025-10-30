import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import './PersonalInfoPage.css'

interface PersonalInfo {
  name: string
  position: string
  department: string
  cardNumbers: string[]
}

const PersonalInfoPage = () => {
  // localStorage에서 초기값 불러오기
  const loadPersonalInfo = (): PersonalInfo => {
    const saved = localStorage.getItem('personalInfo')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      name: '',
      position: '',
      department: '',
      cardNumbers: ['']
    }
  }

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(loadPersonalInfo())

  // 컴포넌트 마운트 시 localStorage에서 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('personalInfo')
    if (saved) {
      const data = JSON.parse(saved)
      setPersonalInfo(data)
    }
  }, [])

  const addCardNumber = () => {
    setPersonalInfo({
      ...personalInfo,
      cardNumbers: [...personalInfo.cardNumbers, '']
    })
  }

  const removeCardNumber = (index: number) => {
    if (personalInfo.cardNumbers.length > 1) {
      setPersonalInfo({
        ...personalInfo,
        cardNumbers: personalInfo.cardNumbers.filter((_, i) => i !== index)
      })
    }
  }

  const updateCardNumber = (index: number, value: string) => {
    const newCardNumbers = [...personalInfo.cardNumbers]
    newCardNumbers[index] = value
    setPersonalInfo({
      ...personalInfo,
      cardNumbers: newCardNumbers
    })
  }

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // localStorage에 저장
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo))
    alert('개인정보가 저장되었습니다!')
  }

  return (
    <div className="personal-info-page">
      <div className="personal-info-container">
        <div className="personal-info-card">
          <div className="page-header">
            <h1 className="page-title">개인정보 입력</h1>
            <span className="storage-notice">* 저장한 정보는 브라우저에 저장됩니다.</span>
          </div>

          <form className="info-form" onSubmit={handleSubmit}>
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
                        value={personalInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
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
                        value={personalInfo.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
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
                        value={personalInfo.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
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
                {personalInfo.cardNumbers.map((cardNumber, index) => (
                  <div key={index} className="card-number-item">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="1234-5678-9012-3456"
                      value={cardNumber}
                      onChange={(e) => updateCardNumber(index, e.target.value)}
                    />
                    {personalInfo.cardNumbers.length > 1 && (
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
