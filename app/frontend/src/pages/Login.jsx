import { Lock } from "lucide-react";
import { useLogin } from "../hooks/loginHook";

import Background from "../components/Background";
import Header from "../components/Header";
import Card from "../components/Card";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import Button from "../components/SendButton";
import Footer from "../components/Footer";

export default function Login() {
  const { usuario, password, error, setUsuario, setPassword, handleSubmit } = useLogin();

  const mostrarHeader = true;

  return (
    <Background data-testid="login-background">
      {mostrarHeader && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full min-h-screen pt-24 pb-16 px-4">
        <Card
          icon={Lock}
          title="Iniciar Sesión"
          subtitle="Ingresa tus credenciales para acceder a tu cuenta"
        >
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            {/* Input usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario *
              </label>
              <InputText
                data-testid="usernameLogin"
                placeholder="Ingresa tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            {/* Input contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <InputPassword
                data-testid="passwordLogin"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-1">
                <a href="#" className="text-xs text-indigo-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Mensaje de error */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <Button type="submit">Login / Registro</Button>
          </form>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <Footer />
      </div>
    </Background>
  );
}
