import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import es from "../assets/i18n/es.json";

export function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const errorCodeMap = {
    "1001": es.login.requiredFields,
    "1002": es.login.requiredUsername,
    "1003": es.login.requiredPassword
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/login`, {
        username: usuario,
        password: password,
      });

      const data = response.data;

      if (data?.code && errorCodeMap[data.code]) {
        setError(errorCodeMap[data.code]);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // navigate("/libreria");

    } catch (err) {
      console.error(err);

      if (err.response) {
        const serverCode = err.response.data?.code;

        if (serverCode && errorCodeMap[serverCode]) {
          setError(errorCodeMap[serverCode]);
          return;
        }

        navigate("/register");

      } else {
        setError(es.conexionServidor.errorConexion);
      }
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