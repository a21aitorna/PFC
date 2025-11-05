import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config/api";

export function useRecoverPasswordPageTwo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const username = state?.username || ""; // Recupera el usuario de la pantalla anterior

  const [formData, setFormData] = useState({
    answer: "",
    password: "",
    confirmPassword: "",
  });

  const [securityQuestion, setSecurityQuestion] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Se pide la pregunta de seguridad
  useEffect(() => {
    const fetchSecurityQuestion = async () => {
      if (!username) return;
      try {
        const res = await axios.get(`${API_BASE}/recover-password/security-question`, {
          params: { username },
        });
        setSecurityQuestion(res.data.security_question);
      } catch (error) {
        console.error("Error al obtener la pregunta de seguridad:", error);
        setErrors({ general: "No se pudo obtener la pregunta de seguridad." });
      }
    };

    fetchSecurityQuestion();
  }, [username]);

  // Maneja cambios de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validar datos antes del envío
  const validate = () => {
    const newErrors = {};
    if (!formData.answer.trim())
      newErrors.answer = "La respuesta es obligatoria";
    if (formData.password.length < 8)
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Enviar formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await axios.post(`${API_BASE}/recover-password/update-password`, {
        username,
        answer: formData.answer,
        password: formData.password,
        repeat_password: formData.confirmPassword,
      });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ answer: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          setErrors({ general: "Datos incorrectos o formato inválido." });
        } else if (status === 404) {
          setErrors({ general: "Usuario no encontrado." });
        } else {
          setErrors({ general: "Error interno del servidor." });
        }
      } else {
        setErrors({ general: "No se pudo conectar con el servidor." });
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para volver al login
  const goBackToLogin = () => navigate("/login");

  return {
    username,
    formData,
    errors,
    success,
    loading,
    securityQuestion,
    handleChange,
    handleSubmit,
    goBackToLogin, // Exportamos el navigate para usarlo en el componente
  };
}
