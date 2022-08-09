import React, { useState, useEffect, ReactNode, createContext } from "react";

//APIs
import walletAPI from "../api/wallet";

import { LoginDataFormValues, User, UserDataFormValues } from "../types/wallet";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

//Initial DB
const initialState = [
  {
    name: "Administrador",
    birthDate: "01/01/2000",
    cpf: "12345678900",
    email: "admin@admin.com.br",
    login: "admin",
    pass: "admin1234",
    extract: [
      {
        op: "credito",
        desc: "Saldo inicial em 5000000,00",
        data: "01/01/2000",
        moeda: "real",
      },
    ],
    balanceTotal: 500000.0,
    balanceBitcoin: 0,
    quantBitcoin: 0,
    balanceBusd: 0,
    quantBusd: 0,
  },
];

localStorage.setItem("usersData", JSON.stringify(initialState));

interface WalletContextData {
  isLoading: boolean;
  setIsLoading: (condition: boolean) => void;
  authUser: (data: LoginDataFormValues) => Promise<void>;
  newUser: (data: UserDataFormValues) => Promise<void>;
  userLogged: User | undefined;
  lastBitcoinValue: number;
  currentBusdValue: number;
  getBitcoinValue: () => Promise<void>;
  getBusdValue: () => Promise<void>;
  prepareExtract: (filter: string) => string[] | undefined;
  transactionCripto: (
    quant: number,
    value: number,
    option: string,
    operation: string
  ) => Promise<void>;
  negociationCripto: (
    quant: number,
    value: number,
    option: string,
    operation: string
  ) => Promise<void>;
}

interface WalletStoreProviderProps {
  children: ReactNode;
}

export const WalletStoreContext = createContext<WalletContextData>(
  {} as WalletContextData
);
export const WalletStoreProvider = ({ children }: WalletStoreProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastBitcoinValue, setLastBitcoinValue] = useState<number>(0);
  const [currentBusdValue, setCurrentBusdValue] = useState<number>(0);
  const [userLogged, setUserLogged] = useState<User>();
  const navigate = useNavigate();

  const getBitcoinValue = () =>
    new Promise<void>((resolve, reject) => {
      walletAPI
        .getBitcoinQuote()
        .then((data) => {
          setLastBitcoinValue(parseFloat(parseFloat(data.last).toFixed(2)));
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });

  const getBusdValue = () =>
    new Promise<void>((resolve, reject) => {
      walletAPI
        .getBusdQuote()
        .then((data) => {
          setCurrentBusdValue(parseFloat(parseFloat(data.bid).toFixed(2)));
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });

  const authUser = async (data: LoginDataFormValues) => {
    const dataUsers = localStorage.getItem("usersData");
    if (dataUsers !== null) {
      let user = JSON.parse(dataUsers).filter(
        (user: any) => user.login === data.login && user.pass === data.password
      );
      if (user.length > 0) {
        console.log(user);
        setUserLogged(user[0] as User);
        navigate(`/home`);
      } else {
        toast.error(`Usuário e/ou senha inválidos!`);
      }
    }
  };

  const newUser = async (data: UserDataFormValues) => {
    const dataUsers = localStorage.getItem("usersData");
    if (dataUsers !== null) {
      let dataBD = JSON.parse(dataUsers);
      dataBD.push(data);
      // atualizando os dados no banco
      localStorage.setItem("usersData", JSON.stringify(dataBD));
      toast.success(`Usuário cadastrado com sucesso!`);
      navigate(`/`);
    }
  };

  const transactionCripto = async (
    quant: number,
    value: number,
    option: string,
    operation: string
  ) => {
    try {
      const dataUsers = localStorage.getItem("usersData");
      console.log("Toa qui ", dataUsers);
      if (dataUsers !== null) {
        //  o usuario pra atualizar
        let actualUser = JSON.parse(dataUsers).filter(
          (user: any) => user.login === userLogged?.login
        );

        // atualizando o saldo em reais de acordo com a operação
        operation === "Compra"
          ? (actualUser[0].balanceTotal =
              actualUser[0].balanceTotal - quant * value)
          : (actualUser[0].balanceTotal =
              actualUser[0].balanceTotal + quant * value);

        // atualizando o saldo da cripto moeda vendida de acordo com a operação
        if (option === "bitcoin") {
          if (operation === "Compra") {
            actualUser[0].balanceBitcoin =
              actualUser[0].balanceBitcoin + quant * value;
            actualUser[0].quantBitcoin = actualUser[0].quantBitcoin + quant;
          } else {
            actualUser[0].balanceBitcoin =
              actualUser[0].balanceBitcoin - quant * value;
            actualUser[0].quantBitcoin = actualUser[0].quantBitcoin - quant;
          }
        } else {
          if (operation === "Compra") {
            actualUser[0].balanceBusd =
              actualUser[0].balanceBusd + quant * value;
            actualUser[0].quantBusd = actualUser[0].quantBusd + quant;
          } else {
            actualUser[0].balanceBusd =
              actualUser[0].balanceBusd - quant * value;
            actualUser[0].quantBusd = actualUser[0].quantBusd - quant;
          }
        }

        //adicionando a operação ao extrato
        actualUser[0].extract.push({
          op: "credito",
          desc: `${operation} de ${quant} ${option} no valor corrente (em R$) de ${value}`,
          data: moment().format("DD/MM/YYYY HH:mm"),
          moeda: "real",
        });

        actualUser[0].extract.push({
          op: "debito",
          desc: `${operation} de ${quant} ${option} no valor corrente (em R$)  de ${value}`,
          data: moment().format("DD/MM/YYYY HH:mm"),
          moeda: option,
        });

        // atualizando o array completo
        let dataBD = JSON.parse(dataUsers);
        dataBD[Object.keys(actualUser)[0]] = actualUser[0];

        // atualizando os dados no banco
        localStorage.setItem("usersData", JSON.stringify(dataBD));

        //atualizando os dados do usuário
        setUserLogged(actualUser[0] as User);
        toast.success(`${operation} realizada com sucesso!`);
      }
    } catch (error) {
      toast.error(`Erro ao realizar a ${operation} !`);
    }
  };

  const negociationCripto = async (
    quant: number,
    value: number,
    option: string,
    operation: string
  ) => {
    try {
      let dataUsers = localStorage.getItem("usersData");
      if (dataUsers !== null) {
        // o usuario pra atualizar
        let actualUser = JSON.parse(dataUsers).filter(
          (user: any) =>
            user.login === userLogged?.login && user.pass === userLogged?.pass
        );

        // negociação por bitcoin
        if (option === "bitcoin") {
          if (operation === "Compra") {
            // aumentando a quantidade de bitcoin
            actualUser[0].quantBitcoin = actualUser[0].quantBitcoin + quant;
            // diminuindo a quantidade de busd
            actualUser[0].quantBusd = actualUser[0].quantBusd - value * quant;
          } else {
            // aumentando a quantidade de bitcoin
            actualUser[0].quantBitcoin = actualUser[0].quantBitcoin - quant;
            // diminuindo a quantidade de busd
            actualUser[0].quantBusd = actualUser[0].quantBusd + value * quant;
          }

          actualUser[0].extract.push({
            op: "credito",
            desc: `Compra de ${quant} bitcoin utilizando ${value * quant} Busd`,
            data: moment().format("DD/MM/YYYY HH:mm"),
            moeda: "bitcoin",
          });
          actualUser[0].extract.push({
            op: "debito",
            desc: `Compra de ${quant} bitcoin utilizando ${value * quant} Busd`,
            data: moment().format("DD/MM/YYYY HH:mm"),
            moeda: "busd",
          });
        } else {
          if (operation === "Compra") {
            // aumentando a quantidade de bitcoin
            actualUser[0].quantBusd = actualUser[0].quantBusd + quant;
            // diminuindo a quantidade de busd
            actualUser[0].quantBitcoin =
              actualUser[0].quantBitcoin - value * quant;
          } else {
            // aumentando a quantidade de bitcoin
            actualUser[0].quantBusd = actualUser[0].quantBusd - quant;
            // diminuindo a quantidade de busd
            actualUser[0].quantBitcoin =
              actualUser[0].quantBitcoin + value * quant;
          }
          actualUser[0].extract.push({
            op: "credito",
            desc: `Compra de ${quant} busd utilizando ${value * quant} bitcoin`,
            data: moment().format("DD/MM/YYYY HH:mm"),
            moeda: "busd",
          });
          actualUser[0].extract.push({
            op: "debito",
            desc: `Compra de ${quant} busd utilizando ${value * quant} bitcoin`,
            data: moment().format("DD/MM/YYYY HH:mm"),
            moeda: "bitcoin",
          });
        }

        // atualizando o array completo
        let dataBD = JSON.parse(dataUsers);
        dataBD[Object.keys(actualUser)[0]] = actualUser[0];

        // atualizando os dados no banco
        localStorage.setItem("usersData", JSON.stringify(dataBD));
        //atualizando os dados do usuário
        setUserLogged(actualUser[0] as User);
        toast.success(`${operation} realizada com sucesso!`);
      }
    } catch (error) {
      toast.error(`Erro ao realizar a ${operation} !`);
    }
  };

  const prepareExtract = (filter: string) => {
    if (userLogged !== undefined) {
      switch (filter) {
        case "real":
          return userLogged.extract.filter(
            (extract: any) => extract.moeda === "real"
          );
        case "bitcoin":
          return userLogged.extract.filter(
            (extract: any) => extract.moeda === "bitcoin"
          );
        case "busd":
          return userLogged.extract.filter(
            (extract: any) => extract.moeda === "busd"
          );
        default:
          return userLogged.extract;
      }
    }
  };
  useEffect(() => {
    setInterval(() => {
      const hydrate = async () => {
        await getBitcoinValue();
        await getBusdValue();
      };
      hydrate();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStore = (
    <WalletStoreContext.Provider
      value={{
        isLoading,
        setIsLoading,
        authUser,
        userLogged,
        lastBitcoinValue,
        currentBusdValue,
        getBitcoinValue,
        getBusdValue,
        newUser,
        // negociationBuyCripto,
        // negociationSellCripto,
        prepareExtract,
        transactionCripto,
        negociationCripto,
      }}
    >
      {children}
    </WalletStoreContext.Provider>
  );

  return renderStore;
};
