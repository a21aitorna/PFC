import es from "../assets/i18n/es.json";
import { User, ArrowLeft } from "lucide-react";
import { useRecoverPasswordPageOne } from "../hooks/recoverPasswordPageOneHook";

import Background from "../components/Background";
import Header from "../components/Header";
import Card from "../components/Card";
import InputText from "../components/InputText";
import Button from "../components/SendButton";
import Footer from "../components/Footer";

export default function RecoverPasswordPageOne() {
  const { usuario, setUsuario, handleSubmit, error, loading } =
    useRecoverPasswordPageOne();

  const mostrarHeader = true;

  return (
    <Background>
      {mostrarHeader && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
      )}

      <Card
        icon={User}
        title={es.recoverPassword.title}
        className="text-center"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {es.recoverPassword.usernameField}
            </label>
            <InputText
              placeholder={es.recoverPassword.usernamePlaceholder}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              data-testid="usernameRecovery"
            />
          </div>

          {/* ✅ Mensaje de error: encima del botón y alineado a la izquierda */}
          {error && (
            <p
              data-testid="errorReason"
              className="text-red-500 text-sm font-medium text-left mt-2"
            >
              {error}
            </p>
          )}

          {/* Botón debajo del error */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              data-testid="continueButtonRecovery"
            >
              {es.recoverPassword.continueButton}
            </Button>
          </div>
        </form>

        <button
          data-testid="loginReturnRecovery"
          onClick={() => (window.location.href = "/login")}
          className="mt-6 flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {es.recoverPassword.returnLogin}
        </button>

        <Footer />
      </Card>
    </Background>
  );
}
