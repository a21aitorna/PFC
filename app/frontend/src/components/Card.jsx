export default function Card({ icon: Icon, title, subtitle, children, className = "" }) {
  return (
    <div className={`relative z-10 bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center ${className}`}>
      {/* Icono superior, opcional */}
      {Icon && (
        <div className="mx-auto bg-indigo-100 text-indigo-600 p-4 w-14 h-14 flex items-center justify-center rounded-full mb-4">
          <Icon className="w-7 h-7" />
        </div>
      )}

      {/* Título */}
      {title && <h2 className="text-lg font-semibold mb-1">{title}</h2>}

      {/* Subtítulo */}
      {subtitle && <p className="text-gray-500 text-sm mb-6">{subtitle}</p>}

      {/* Contenido dentro de la card */}
      {children}
    </div>
  );
}
