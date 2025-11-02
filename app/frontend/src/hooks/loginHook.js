import { useState } from "react";

import es from "../assets/i18n/es.json"

export function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setError(es.login.requiredFields);
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
