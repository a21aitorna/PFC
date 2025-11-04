import { useState } from "react";
import { useNavigate } from "react-router-dom";
import es from "../assets/i18n/es.json"

export function useRecoverPasswordPageOne() {
  const [usuario, setUsuario] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mapeo de códigos de error personalizados del backend
  const errorCodeMap = {
    "1004": es.recoverPassword.userNotFound,
    "3001": es.recoverPassword.verifyUserEmptyField
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/recover-password/verify-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usuario }),
      });

      const data = await response.json();

      if (response.ok) {
        // Ir a la siguente página
        console.log("Usuario encontrado:", data); //BORRAR LUEGO UNA VEZ IMPLEMENTADA LA SEGUNDA PARTE DE LA VALIDACIÓN!
        // navigate("/recover-password-step-two", { state: { username: usuario } });
      } else {
        //Mostrar error según el código del backend
        const customMsg = errorCodeMap[data.code] || es.recoverPassword.errorInesperado;
        setError(customMsg);
      }
    } catch (err) {
      setError(es.conexionServidor.errorConexion);
    } finally {
      setLoading(false);
    }
  };

  return {
    usuario,
    setUsuario,
    handleSubmit,
    error,
    loading,
  };
}
