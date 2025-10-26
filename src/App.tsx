import { Suspense } from 'react';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import NavigationLayout from 'views/layout/NavigationLayout'
import Loading from 'views/pages/Loading';

// Pages
import ExpenseClaimPage from 'views/pages/ExpenseClaimPage'
import PersonalInfoPage from 'views/pages/PersonalInfoPage'
import NoticePage from 'views/pages/NoticePage'

function App() {
  return (
    <>
      <NavigationLayout />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/expense-claim" />} />
          <Route path="/expense-claim" element={<ExpenseClaimPage />} />
          <Route path="/personal-info" element={<PersonalInfoPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="*" element={<Navigate to="/expense-claim" />} />
        </Routes>
      </Suspense>
    </>

  )
}

export default App
