const NavigationLayout = () => {
    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900">스마트 경비관리</h1>
                  </div>
                  <nav className="flex gap-8">
                    <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-4">경비청구서 작성</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">가이드</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">개인정보 기입</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">게시판</a>
                    <a href="#" className="text-gray-600 hover:text-gray-900">공지사항</a>
                  </nav>
                </div>
              </header>
    )
}
export default NavigationLayout