import { useState } from "react";

export function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    console.log("✅ Login correcto:", { usuario, password });


  };

  return {
    usuario,
    password,
    error,
    setUsuario,
    setPassword,
    handleSubmit,
  };
}
