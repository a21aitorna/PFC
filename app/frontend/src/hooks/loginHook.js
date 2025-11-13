import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";
import es from "../assets/i18n/es.json";
import { useUser } from "../context/userProvider";

export function useLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser, logout } = useUser(); // ✅ usamos logout del contexto

  const errorCodeMap = {
    "1001": es.login.requiredFields,
    "1002": es.login.requiredUsername,
    "1003": es.login.requiredPassword
  };

  // Mapeo de id_role a rutas y nombres de rol
  const roleMap = {
    1: { name: "admin", path: "/admin" },
    2: { name: "usuario", path: "/library" }
  };

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

      logout();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      const roleInfo = roleMap[data.user.id_role];
      if (roleInfo) {
        navigate(roleInfo.path);
      } else {
        navigate("/");
      }

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
