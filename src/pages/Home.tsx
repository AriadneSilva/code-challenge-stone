import React, { useContext } from "react";
import { WalletStoreContext } from "../stores/WalletStore";
import { useNavigate } from "react-router-dom";
import { Tab } from "../components/Tab/Tab";
import { Extract } from "../containers/Extract";
import { Negociation } from "../containers/Negociation";
import { Transactions } from "../containers/Transactions";
import moment from "moment";
import RealLogo from "../assets/images/real-logo.png";
import { View } from "../components/View/View";

export const Home = () => {
  const { userLogged } = useContext(WalletStoreContext);
  const navigate = useNavigate();

  const tabOptions = [
    {
      label: "Extrato Detalhado",
      content: <Extract />,
    },
    {
      label: "Transações (R$)",
      content: <Transactions />,
    },
    {
      label: "Negociação (Criptomoedas)",
      content: <Negociation />,
    },
  ];

  const onLogout = () => {
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
        <View
          width="full"
          border="border-b"
          borderColor="gray-300"
          padding="py-3 px-6"
        >
          <View
            justifyItems="between"
            direction="flex-row"
            width="full"
            data-testid="headerHome"
          >
            <View direction="flex-col" width="full">
              <h5 className="text-gray-900 text-xl font-medium">
                Olá, {userLogged?.name}
              </h5>
              <p className="text-gray-500 text-xs italic font-semibold">
                {userLogged?.email}
              </p>
            </View>
            <View
              direction="flex-col"
              onClick={() => onLogout()}
              data-testid="logoutUser"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 512 512"
                stroke="currentColor"
              >
                <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
              </svg>
            </View>
          </View>
        </View>
        <View padding="p-6" direction="flex-col" justifyItems="center">
          <h5 className="text-gray-900 text-xl font-normal mb-2">
            Bem vindo(a) a sua conta!
          </h5>
          <h5 className="text-gray-900 text-xl font-normal mb-2">
            Aqui você pode fazer transações e as movimentações que desejar, além
            de consultar seu extrato detalhado.
          </h5>

          <View justifyItems="center" padding="p-2" margin="m-2">
            <View direction="flex-col">
              <img src={RealLogo} width="40px" height="40px" alt="Busd logo" />
            </View>
            <View direction="flex-col" margin="ml-2">
              <h5
                className={
                  userLogged?.balanceTotal.toFixed(2).startsWith("-")
                    ? `text-red-600 text-2xl font-bold`
                    : `text-gray-900 text-2xl font-bold`
                }
              >
                Saldo:{userLogged?.balanceTotal.toFixed(2)}
              </h5>
            </View>
          </View>
          <Tab key={0} options={tabOptions} selectedIndex={0} />
        </View>
        <View
          justifyItems="end"
          padding="py-3 px-6"
          border="border-t"
          borderColor="gray-300"
        >
          <p className="text-gray-600">{moment().format("DD/MM/YYYY")}</p>
        </View>
      </View>
    </View>
  );
};
