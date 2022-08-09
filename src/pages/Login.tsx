import React, { useContext } from "react";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import { useForm } from "../hooks/useForm";
import { LoginDataFormValues } from "../types/wallet";
import { WalletStoreContext } from "../stores/WalletStore";
import { useNavigate } from "react-router-dom";
import { View } from "../components/View/View";

export const Login = () => {
  const { authUser } = useContext(WalletStoreContext);
  const navigate = useNavigate();

  const handleSaveForm = () => {
    console.log("Cliquei no logar");
    authUser(data);
  };

  const { data, handleChange, handleSubmit, errors } =
    useForm<LoginDataFormValues>({
      initialValues: {
        login: "",
        password: "",
      },
      onSubmit: handleSaveForm,
      validations: {
        login: {
          required: { value: true, message: "Preencha o campo obrigatório." },
        },
        password: {
          required: { value: true, message: "Preencha o campo obrigatório." },
        },
      },
    });
  const onNewRegister = () => {
    navigate(`/register`);
  };

  return (
    <View
      alignItems="items-center"
      justifyItems="center"
      height="min-h-screen"
      bgColor="gray-100"
    >
      <View
        padding="px-8 py-6"
        margin="mt-4"
        textAlign="text-left"
        bgColor="white"
        boxShadow="lg"
        direction="flex-col"
      >
        <View justifyItems="center" data-testid="loginSVG">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-green-600"
            fill="currentColor"
            viewBox="0 0 512 512"
            stroke="currentColor"
          >
            <path d="M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z" />
          </svg>
        </View>

        <form onSubmit={handleSubmit} data-testid="loginForm">
          <Input
            title="login"
            name="login"
            label="Login: "
            value={data.login}
            errors={errors.login}
            onChange={handleChange("login")}
            placeholder="Digite o login"
            data-testid="login"
          />
          <Input
            title="password"
            name="password"
            type="password"
            label="Senha: "
            value={data.password}
            errors={errors.password}
            onChange={handleChange("password")}
            placeholder="Digite a senha"
            data-testid="password"
          />
          <View alignItems="items-baseline" margin="m-4" justifyItems="center">
            <Button type="submit" data-testid="btnLogin">
              Login
            </Button>
          </View>
        </form>

        <a
          className="text-sm text-blue-600 hover:underline"
          href=""
          onClick={() => onNewRegister()}
          data-testid="linkRegister"
        >
          Ainda não é cliente? Faça seu cadastro aqui!
        </a>
      </View>
    </View>
  );
};
