import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    dataBorn: "",     
    password: "",
    verifyPassword: "",
    library: "",
    securityQuestion: "",
    answer: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Datos del formulario antes de validación:", formData);

    // Validaciones básicas
    if (
      !formData.name ||
      !formData.surname ||
      !formData.username ||
      !formData.password ||
      !formData.verifyPassword ||
      !formData.dataBorn ||
      !formData.library ||
      !formData.securityQuestion ||
      !formData.answer
    ) {
      console.warn("⚠️ Campos obligatorios faltantes");
      setError("Todos los campos obligatorios deben estar completos");
      return;
    }

    if (formData.password !== formData.verifyPassword) {
      console.warn("⚠️ Las contraseñas no coinciden");
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      // Mapeo de nombres al formato que espera el backend
      const payload = {
        name: formData.name,
        surname: formData.surname,
        username: formData.username,
        password: formData.password,
        repeat_password: formData.verifyPassword,
        born_date: formData.dataBorn,
        library_name: formData.library,
        security_question: formData.securityQuestion,
        answer: formData.answer,
      };

      console.log("Payload enviado al backend:", payload);

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(" Respuesta del backend:", data);

      if (!res.ok) {
        //setError(data.msg || "Error al registrar el usuario");
        setError("Error al registrar el usuario");
      } else {
        // Redirigir a la página de login u otra página después de registro
        navigate("/login");
      }
    } catch (err) {
      console.error("Error conectando al servidor:", err);
      setError("Error conectando al servidor");
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, loading };
}
