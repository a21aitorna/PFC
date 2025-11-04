import { useState } from "react";

export function useRecoverPasswordPageOne() {
  const [usuario, setUsuario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario para recuperar contraseña:", usuario);
    // Aquí podrías agregar la lógica real de recuperación, por ejemplo:
    // enviarUsuario(usuario);
  };

  return {
    usuario,
    setUsuario,
    handleSubmit,
  };
}
