import { FileText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import './NavigationLayout.css'

const NavigationLayout = () => {
    const handleLoginClick = () => {
        alert('로그인 기능 개발 예정입니다.')
    }

    return (
        <header className="navigation-header">
                <div className="navigation-container">
                  <div className="navigation-logo">
                    <div className="navigation-logo-icon">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="navigation-logo-title">스마트 경비관리</h1>
                  </div>
                  <nav className="navigation-menu">
                    <NavLink
                      to="/expense-claim"
                      className={({ isActive }) => `navigation-link ${isActive ? 'active' : ''}`}
                    >
                      경비청구서 작성
                    </NavLink>
                    <NavLink
                      to="/personal-info"
                      className={({ isActive }) => `navigation-link ${isActive ? 'active' : ''}`}
                    >
                      개인정보 입력
                    </NavLink>
                    <NavLink
                      to="/notice"
                      className={({ isActive }) => `navigation-link ${isActive ? 'active' : ''}`}
                    >
                      공지사항
                    </NavLink>
                  </nav>
                  <div className="navigation-login">
                    <button className="navigation-login-button" onClick={handleLoginClick}>
                      로그인
                    </button>
                  </div>
                </div>
              </header>
    )
}
export default NavigationLayout