import { useState } from "react";

export function useRegister() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    usuario: "",
    fechaNacimiento: "",
    contraseña: "",
    verificarContraseña: "",
    biblioteca: "",
    preguntaSeguridad: "",
    respuesta: "",
  });

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    if (callback) callback(formData);
  };

  return { formData, handleChange, handleSubmit };
}
