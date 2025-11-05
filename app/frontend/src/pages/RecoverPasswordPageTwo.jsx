import { ShieldCheck, ArrowLeft } from "lucide-react";
import { useRecoverPasswordPageTwo } from "../hooks/recoverPasswordPageTwoHook";
import Background from "../components/Background";
import Header from "../components/Header";
import Card from "../components/Card";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import Button from "../components/SendButton";
import Footer from "../components/Footer";

export default function RecoverPasswordPageTwo() {
  const {
    username,
    formData,
    errors,
    success,
    loading,
    securityQuestion,
    handleChange,
    handleSubmit,
    goBackToLogin,
  } = useRecoverPasswordPageTwo();

  return (
    <Background>
      <Header />

      <Card
        icon={ShieldCheck}
        title="Pregunta de Seguridad"
        subtitle={`Usuario: ${username || "Desconocido"}`}
        className="mt-20"
      >
        {/* Volver al inicio */}
        <button
          onClick={goBackToLogin}
          className="flex items-center text-sm text-gray-500 mb-4 hover:text-indigo-600 transition mx-auto"
        >
          <ArrowLeft size={16} className="mr-1" />
          Volver al inicio de sesión
        </button>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          {/* Pregunta de seguridad */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {securityQuestion
                ? securityQuestion
                : "Cargando pregunta de seguridad..."}
            </label>
            <InputText
              name="answer"
              placeholder="Ingresa tu respuesta"
              value={formData.answer}
              onChange={handleChange}
            />
            {errors.answer && (
              <p className="text-xs text-red-500 mt-1">{errors.answer}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Pista: La respuesta no distingue mayúsculas/minúsculas
            </p>
          </div>

          {/* Nueva contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nueva Contraseña *
            </label>
            <InputPassword
              name="password"
              placeholder="Ingresa la nueva contraseña"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar Contraseña *
            </label>
            <InputPassword
              name="confirmPassword"
              placeholder="Confirma la nueva contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botón enviar */}
          <Button type="submit" disabled={loading}>
            {loading ? "Restableciendo..." : "Restablecer Contraseña"}
          </Button>

          {/* Mensajes de estado */}
          {success && (
            <p className="text-green-600 text-sm mt-3 text-center">
              Contraseña restablecida con éxito
            </p>
          )}

          {errors.general && (
            <p className="text-red-600 text-sm mt-3 text-center">
              {errors.general}
            </p>
          )}
        </form>
      </Card>

      <Footer />
    </Background>
  );
}
