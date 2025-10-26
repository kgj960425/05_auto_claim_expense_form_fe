// import React, { useState } from 'react';
// import { Upload, FileText, FileImage, List } from 'lucide-react';

// export default function ExpenseManagement() {
//   const [expenses, setExpenses] = useState([
//     { id: 1, date: '2024-01-15', store: '택시요금', amount: 15000, category: '교통비' },
//     { id: 2, date: '2024-01-15', store: '편의점식사', amount: 12000, category: '식비' },
//     { id: 3, date: '2024-01-16', store: '사무용품', amount: 25000, category: '사무비' }
//   ]);

//   const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//               <FileText className="w-5 h-5 text-white" />
//             </div>
//             <h1 className="text-xl font-semibold text-gray-900">스마트 경비관리</h1>
//           </div>
//           <nav className="flex gap-8">
//             <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">경비청구서 작성</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">가이드</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">개인정보 기입</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">게시판</a>
//             <a href="#" className="text-gray-600 hover:text-gray-900">공지사항</a>
//           </nav>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Progress Steps */}
//         <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-lg font-semibold text-gray-900">처리 진행상황</h2>
//             <span className="text-sm text-gray-500">3 / 5 단계</span>
//           </div>
//           <div className="flex items-center">
//             {/* Step 1 - Complete */}
//             <div className="flex flex-col items-center">
//               <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <span className="mt-2 text-xs font-medium text-gray-900">양수증 업로드</span>
//             </div>
//             <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>

//             {/* Step 2 - Complete */}
//             <div className="flex flex-col items-center">
//               <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <span className="mt-2 text-xs font-medium text-gray-900">OCR 확인</span>
//             </div>
//             <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>

//             {/* Step 3 - Current */}
//             <div className="flex flex-col items-center">
//               <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
//                 3
//               </div>
//               <span className="mt-2 text-xs font-medium text-gray-900">데이터 분류</span>
//             </div>
//             <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

//             {/* Step 4 - Pending */}
//             <div className="flex flex-col items-center">
//               <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
//                 4
//               </div>
//               <span className="mt-2 text-xs font-medium text-gray-400">예별 생성</span>
//             </div>
//             <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

//             {/* Step 5 - Pending */}
//             <div className="flex flex-col items-center">
//               <div className="w-10 h-10 rounded-full bg-gray-300 text-white flex items-center justify-center font-semibold">
//                 5
//               </div>
//               <span className="mt-2 text-xs font-medium text-gray-400">다운로드</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           {/* Left Column - Expense List */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">예별 상세 내용</h3>
            
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-3 text-sm font-medium text-gray-600">날짜</th>
//                   <th className="text-left py-3 text-sm font-medium text-gray-600">업종</th>
//                   <th className="text-left py-3 text-sm font-medium text-gray-600">금액</th>
//                   <th className="text-left py-3 text-sm font-medium text-gray-600">분류</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {expenses.map((expense) => (
//                   <tr key={expense.id} className="border-b border-gray-100">
//                     <td className="py-3 text-sm text-gray-900">{expense.date}</td>
//                     <td className="py-3 text-sm text-gray-900">{expense.store}</td>
//                     <td className="py-3 text-sm text-gray-900">{expense.amount.toLocaleString()}원</td>
//                     <td className="py-3 text-sm text-gray-900">{expense.category}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="mt-6 space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">총 건수:</span>
//                 <span className="font-medium text-gray-900">{expenses.length}건</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">총 금액:</span>
//                 <span className="font-semibold text-blue-600">{totalAmount.toLocaleString()}원</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - File Upload & Summary */}
//           <div className="space-y-6">
//             {/* File Upload Area */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">영수증 미리보기</h3>
              
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
//                 <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600 mb-2">영수증을 드래그하여 업로드하거나</p>
//                 <p className="text-gray-600 mb-4">클릭하여 파일을 선택하세요.</p>
//                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
//                   <Upload className="w-4 h-4" />
//                   파일 선택
//                 </button>
//               </div>
              
//               <p className="text-xs text-gray-500 mt-3">지원 형식: JPG, PNG, PDF (최대 10MB)</p>
//             </div>

//             {/* Import Options */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* Excel Import */}
//               <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <FileText className="w-6 h-6 text-green-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">엑셀 Import</h4>
//                 <p className="text-xs text-gray-600 mb-4">작성된 데이터를 엑셀 파일로 내보내기</p>
//                 <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium inline-flex items-center justify-center gap-2">
//                   <Upload className="w-4 h-4" />
//                   엑셀 다운로드
//                 </button>
//               </div>

//               {/* PDF Export */}
//               <div className="bg-white rounded-lg shadow-sm p-6 text-center">
//                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <FileImage className="w-6 h-6 text-red-600" />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 mb-2">PDF 생성</h4>
//                 <p className="text-xs text-gray-600 mb-4">모든 영수증을 하나의 PDF로 변환</p>
//                 <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium inline-flex items-center justify-center gap-2">
//                   <FileImage className="w-4 h-4" />
//                   PDF 다운로드
//                 </button>
//               </div>
//             </div>

//             {/* Summary Card */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                 <List className="w-6 h-6 text-blue-600" />
//               </div>
//               <h4 className="font-semibold text-gray-900 mb-4">요약 통계</h4>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">교통비:</span>
//                   <span className="font-medium text-gray-900">15,000원</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">식비:</span>
//                   <span className="font-medium text-gray-900">12,000원</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">사무비:</span>
//                   <span className="font-medium text-gray-900">25,000원</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
//                   <span className="text-sm font-semibold text-gray-900">총합:</span>
//                   <span className="text-lg font-bold text-blue-600">52,000원</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
