import backgroundImage from "../assets/images/background.png"

export default function Background({ children }) {
  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Este contenedor ya no intenta forzar el alto */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
