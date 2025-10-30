export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-start p-4 bg-black/40 backdrop-blur-md">
        <div className="flex items-center space-x-2 text-white">
          <div className="bg-indigo-500 rounded-md p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16M4 10h16M4 15h16" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Proyecto Atenea</p>
            <p className="text-xs text-gray-300">Portal de Acceso</p>
          </div>
        </div>
    </header>
  );
}
