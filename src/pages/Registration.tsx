import React, { useContext } from "react";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import { useForm } from "../hooks/useForm";
import { UserDataFormValues } from "../types/wallet";
import { WalletStoreContext } from "../stores/WalletStore";
import { useNavigate } from "react-router-dom";
import { View } from "../components/View/View";

export const Registration = () => {
  const { newUser } = useContext(WalletStoreContext);
  const navigate = useNavigate();
  const handleSaveForm = () => {
    newUser(data);
  };

  const { data, errors, handleChange, handleSubmit } =
    useForm<UserDataFormValues>({
      initialValues: {
        name: "",
        birthDate: "",
        cpf: "",
        email: "",
        login: "",
        pass: "",
        extract: [],
        balanceTotal: 100000.0,
        balanceBitcoin: 0,
        quantBitcoin: 0,
        balanceBusd: 0,
        quantBusd: 0,
      },
      onSubmit: handleSaveForm,
      validations: {
        name: {
          required: { value: true, message: "Preencha o campo obrigatório." },
        },
        cpf: {
          required: { value: true, message: "Preencha o campo obrigatório." },
          custom: {
            isValid: (value: string) =>
              /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/.test(
                value
              ),
            message: "CPF inválido",
          },
        },
        email: {
          required: { value: true, message: "Preencha o campo obrigatório." },
          custom: {
            isValid: (value: string) =>
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                value
              ),
            message: "E-mail inválido!",
          },
        },
        login: {
          required: { value: true, message: "Preencha o campo obrigatório." },
        },
        birthDate: {
          required: { value: true, message: "Preencha o campo obrigatório." },
          custom: {
            isValid: (value: string) =>
              /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/.test(value),
            message: "Data Inválida",
          },
        },
        pass: {
          required: { value: true, message: "Preencha o campo obrigatório." },
          custom: {
            isValid: (value: string) =>
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(
                value
              ),
            message: "Senha inválida",
          },
        },
      },
    });

  const backToLogin = () => {
    navigate(`/`);
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
        width="3/5"
      >
        <View justifyItems="start" margin="mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-600"
            fill="currentColor"
            viewBox="0 0 512 512"
            stroke="currentColor"
            onClick={backToLogin}
          >
            <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z" />
          </svg>
        </View>
        <View justifyItems="center" margin="mb-5">
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
        <form onSubmit={handleSubmit} data-testid="registerForm">
          <View direction="flex-row" justifyItems="between" margin="m-0">
            <View direction="flex-col" width="full md:w-1/2" margin="mr-5">
              <Input
                name="name"
                label="Nome* : "
                value={data.name}
                errors={errors.name}
                onChange={handleChange("name")}
                placeholder="Digite o nome completo"
                data-testid="name"
              />
            </View>
            <View direction="flex-col" width="full md:w-1/2">
              <Input
                name="birthDate"
                label="Data de Nascimento* : "
                value={data.birthDate}
                errors={errors.birthDate}
                onChange={handleChange("birthDate")}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                data-testid="dataDeNascimento"
              />
            </View>
          </View>
          <View direction="flex-col" margin="mt-4">
            <Input
              name="cpf"
              maxLength={11}
              label="CPF (sem pontos ou traços)* : "
              value={data.cpf}
              onChange={handleChange("cpf")}
              errors={errors.cpf}
              placeholder="Digite o CPF"
              data-testid="cpf"
            />
          </View>
          <View direction="flex-col" margin="mt-4">
            <Input
              name="email"
              label="E-mail* : "
              value={data.email}
              errors={errors.email}
              onChange={handleChange("email")}
              placeholder="Digite o E-mail"
              data-testid="email"
            />
          </View>
          <View direction="flex-row" justifyItems="between" margin="m-0">
            <View direction="flex-col" width="full md:w-1/2" margin="mr-5">
              <Input
                name="login"
                label="Login* : "
                value={data.login}
                errors={errors.login}
                onChange={handleChange("login")}
                placeholder="Digite o login"
                data-testid="novoLogin"
              />
            </View>
            <View direction="flex-col" width="full md:w-1/2">
              <Input
                name="password"
                type="password"
                label="Senha** : "
                maxLength={8}
                value={data.pass}
                errors={errors.pass}
                onChange={handleChange("pass")}
                placeholder="Digite a senha"
                data-testid="novaSenha"
              />
            </View>
          </View>
          <p className="text-red-500 text-xs m-4 italic font-semibold">
            ** A senha não dever ter espaços em branco. Precisa ter um número,
            uma letra maiúsula, uma letra minúscula e um caracter especial!
          </p>
          <View alignItems="items-baseline" justifyItems="center" margin="m-4">
            <Button data-testid="btnCriarUsuario">Criar usuário</Button>
          </View>
        </form>
      </View>
    </View>
  );
};
