import { Suspense } from 'react';
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CommonLayout from 'views/layout/CommonLayout'
import Loading from 'views/pages/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/*" element={<CommonLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
