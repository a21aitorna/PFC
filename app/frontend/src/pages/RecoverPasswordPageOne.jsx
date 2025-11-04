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

  const {usuario, setUsuario, handleSubmit, error, loading } = useRecoverPasswordPageOne();

  return (

    <Background>
      <Header />

      <Card
        icon={User}
        title= {es.recoverPassword.title}
        // subtitle="Ingresa tu nombre de usuario para continuar"
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
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <p data-testid="motivoError" className="text-red-500 text-sm font-medium">{error}</p>
          )}

          <Button type="submit" disabled={loading}>{es.recoverPassword.continueButton}</Button>
        </form>

        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-6 flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {es.recoverPassword.returnLogin}
        </button>
      </Card>

      <Footer />
    </Background>
  );
}
