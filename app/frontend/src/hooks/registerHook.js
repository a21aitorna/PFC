import { useState } from "react";
import { useNavigate } from "react-router-dom";
import es from "../assets/i18n/es.json";

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

  //Mapeo códigos del backend con los mensajes del front 
  const errorCodeMap = {
    "2001": es.register.requiredFields,
    "2002": es.register.passwordsMismatch,
    "2003": es.register.invalidPassword,
    "2005": es.register.invalidAge,
    "2006": es.register.usernameExists,
  };

  //Manejo cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Manejo el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");


    setLoading(true);

    try {
      // Mapear nombres de campos con los del back backend
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

      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Mostrar error según el código recibido del back
        const message = errorCodeMap[data.code] || es.register.errorInesperado;
        setError(message);
        return;
      }

      // Registro exitoso
      navigate("/login");
    } catch (err) {
      setError(es.conexionServidor.errorConexion);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, error, loading };
}
