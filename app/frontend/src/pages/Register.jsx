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

    const mostrarHeader = true;

    const campos = [
        { name: "name", placeholder: es.register.namePlaceholder, type: "text", data_testid: "nameRegister" },
        { name: "surname", placeholder: es.register.surnamePlaceholder, type: "text", data_testid: "surnameRegister" },
        { name: "username", placeholder: es.register.usernamePlaceholder, type: "text", data_testid: "usernameRegister" },
        { name: "dataBorn", placeholder: es.register.birthDatePlaceholder, type: "date", data_testid: "birthdayRegister" },
        { name: "password", placeholder: es.register.passwordPlaceholder, type: "password", data_testid: "passwordRegister" },
        { name: "verifyPassword", placeholder: es.register.verifyPasswordPlaceholder, type: "password", data_testid: "verifyPasswordRegister" },
        { name: "library", placeholder: es.register.libraryNamePlaceholder, type: "text", data_testid: "libraryRegister" },
        { name: "securityQuestion", placeholder: es.register.securityQuestionPlaceholder, type: "text", data_testid: "securityQuestionRegister" },
        { name: "answer", placeholder: es.register.answerPlaceholder, type: "text", data_testid: "answerField" },
    ];

  const onSubmit = (datos) => {
      console.log("Enviando datos al backend:", datos);
        // Aquí podrías hacer fetch/axios.post() a tu API
  };

  return (
    <Background data-testid="login-background">
          {mostrarHeader && (
            <div className="fixed top-0 left-0 w-full z-50">
              <Header />
            </div>
          )}

      <div className="flex flex-col items-center justify-center w-full min-h-screen pt-24 pb-16 px-4">
        <Card title={es.register.title}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre y Apellidos */}
            <div className="grid grid-cols-2 gap-4">
              {campos.filter((c) => c.name === "name" || c.name === "surname").map((campo) => (
                  <InputText
                    key={campo.name}
                    placeholder={campo.placeholder}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    required
                    data-testid={campo.data_testid}
                  />
                ))}
            </div>

            {/* Resto de campos */}
            {campos.filter((c) => c.name !== "name" && c.name !== "surname").map((campo) =>
                campo.type === "password" ? (
                  <InputPassword
                    key={campo.name}
                    placeholder={campo.placeholder}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    data-testid={campo.data_testid}
                  />
                ) : (
                  <InputText
                    key={campo.name}
                    type={campo.type}
                    placeholder={campo.placeholder}
                    name={campo.name}
                    value={formData[campo.name]}
                    onChange={handleChange}
                    data-testid={campo.data_testid}
                  />
                )
              )}

            <Button type="submit" data-testid="register-submit">
              {es.register.registerButton}
            </Button>
          </form>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50">
          <Footer />
      </div>
    </Background>
  );
}