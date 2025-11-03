import { useState } from "react";
import { useNavigate } from "react-router-dom";
import es from "../assets/i18n/es.json";

export function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.trim() || !password.trim()) {
      setError(es.login.requiredFields);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usuario,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // navigate("/libreria"); // nueva página
      } else {
        // Usuario no encontrado o error: ir a registro
        navigate("/register");
      }

    } catch (err) {
      console.error(err);
      setError("Error conectando al servidor");
    } finally {
      setLoading(false);
    }
  };

  return {
    usuario,
    password,
    error,
    setUsuario,
    setPassword,
    handleSubmit,
    loading,
  };
}
