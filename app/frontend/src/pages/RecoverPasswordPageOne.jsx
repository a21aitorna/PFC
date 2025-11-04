import React from "react";
import { User, ArrowLeft } from "lucide-react";
import { useRecoverPasswordPageOne } from "../hooks/recoverPasswordOneHook"; // ✅ asegúrate de usar la ruta correcta

import Background from "../components/Background";
import Header from "../components/Header";
import Card from "../components/Card";
import InputText from "../components/InputText";
import Button from "../components/SendButton";
import Footer from "../components/Footer";

export default function RecoverPasswordPageOne() {
  // ✅ Usamos el hook que maneja el estado y el submit
  const { usuario, setUsuario, handleSubmit } = useRecoverPasswordPageOne();

  return (
    <Background>
      <Header />

      <Card
        icon={User}
        title="Recuperar Contraseña"
        subtitle="Ingresa tu nombre de usuario para continuar"
        className="text-center"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <InputText
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <Button type="submit">Continuar</Button>
        </form>

        <button
          onClick={() => (window.location.href = "/login")}
          className="mt-6 flex items-center justify-center text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver al inicio de sesión
        </button>
      </Card>

      <Footer />
    </Background>
  );
}
