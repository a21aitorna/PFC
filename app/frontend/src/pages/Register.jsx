import { Lock } from "lucide-react";
import { useRegister } from "../hooks/registerHook";

import Background from "../components/Background";
import Header from "../components/Header";
import Card from "../components/Card";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import Button from "../components/SendButton";
import Footer from "../components/Footer";

import es from "../assets/i18n/es.json"

export default function Register() {
    const {formData, handleChange, handleSubmit} = useRegister()

    const campos = [
        { name: "nombre", placeholder: "Nombre", type: "text" },
        { name: "apellidos", placeholder: "Apellidos", type: "text" },
        { name: "usuario", placeholder: "Usuario", type: "text" },
        { name: "fechaNacimiento", placeholder: "Fecha de nacimiento", type: "date" },
        { name: "contraseña", placeholder: "Contraseña", type: "password" },
        { name: "verificarContraseña", placeholder: "Verificar Contraseña", type: "password" },
        { name: "biblioteca", placeholder: "Nombre de la biblioteca", type: "text" },
        { name: "preguntaSeguridad", placeholder: "Pregunta de seguridad", type: "text" },
        { name: "respuesta", placeholder: "Respuesta", type: "text" },
    ];

    const onSubmit = (datos) => {
        console.log("Enviando datos al backend:", datos);
        // Aquí podrías hacer fetch/axios.post() a tu API
    };

    return (
    <Background>
      <Header />

      <Card
        title="Registro de Usuario"
        subtitle="Completa el formulario para crear tu cuenta"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre y apellidos en dos columnas */}
          <div className="grid grid-cols-2 gap-4">
            <InputText
              placeholder="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <InputText
              placeholder="Apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          {/* Resto de campos */}
          {campos
            .filter((c) => c.name !== "nombre" && c.name !== "apellidos")
            .map((campo) =>
              campo.type === "password" ? (
                <InputPassword
                  key={campo.name}
                  placeholder={campo.placeholder}
                  name={campo.name}
                  value={formData[campo.name]}
                  onChange={handleChange}
                  required
                />
              ) : (
                <InputText
                  key={campo.name}
                  type={campo.type}
                  placeholder={campo.placeholder}
                  name={campo.name}
                  value={formData[campo.name]}
                  onChange={handleChange}
                  required
                />
              )
            )}

          <Button type="submit">Registrarse</Button>
        </form>
      </Card>

      <Footer />
    </Background>
  );
}