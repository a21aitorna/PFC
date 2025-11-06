import { useNavigate } from "react-router-dom";
import logoAtenea from "../assets/images/logoAtenea.png";

export default function Header() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-start p-4 bg-black/40 backdrop-blur-md">
      <div
        data-testid="returnMainPage"
        onClick={handleReturnHome}
        className="flex items-center space-x-3 text-white cursor-pointer select-none"
      >
        {/* Icono dentro del recuadro */}
        <div className="bg-indigo-500 rounded-xl p-2 flex items-center justify-center shadow-md h-12 w-12">
          <img
            src={logoAtenea}
            alt="Logo Atenea"
            className="h-8 w-8 object-contain filter invert brightness-0"
          />
        </div>

        {/* Texto al lado derecho del icono */}
        <div className="flex flex-col justify-center leading-tight">
          <p className="font-gelio text-3xl">Proyecto Atenea</p>
        </div>
      </div>
    </header>
  );
}
