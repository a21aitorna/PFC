import { useState } from "react";

export function useRecoverPasswordPageTwo() {
  const [formData, setFormData] = useState({
    answer: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.answer.trim()) newErrors.answer = "La respuesta es obligatoria";
    if (formData.password.length < 8)
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // // Simular envío o llamada API
    // console.log("Datos enviados:", formData);
    // setSuccess(true);

    // // Reset opcional
    // setFormData({ answer: "", password: "", confirmPassword: "" });
  };

  return {
    formData,
    errors,
    success,
    handleChange,
    handleSubmit,
  };
}
