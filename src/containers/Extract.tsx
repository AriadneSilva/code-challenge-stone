import React, { useContext, useState, useEffect } from "react";
import { WalletStoreContext } from "../stores/WalletStore";
import BitcoinLogo from "../assets/images/bitcoin-logo.png";
import BusdLogo from "../assets/images/busd-logo.png";
import RealLogo from "../assets/images/real-logo.png";
import { View } from "../components/View/View";

export const Extract = () => {
  const { userLogged, prepareExtract } = useContext(WalletStoreContext);
  const [dataExtract, setDataExtract] = useState<string[]>([]);
  const [selectedCripto, setSelectedCripto] = useState<string>("real");

  const renderExtract = (moeda: string) => {
    let returnData = prepareExtract(moeda);
    if (returnData !== undefined) {
      setDataExtract(returnData);
      setSelectedCripto(moeda);
    }
  };

  useEffect(() => {
    renderExtract("real");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View direction="flex-col">
      <p className="text-gray-700 text-base mb-4">
        Consulte as informações detalhadas do seu extrato, clicando sobre a
        moeda desejada!
      </p>
      <View direction="flex-col">
        <View justifyItems="between">
          <View
            data-testid="extratoReal"
            border="border-2"
            borderColor={selectedCripto === "real" ? `green-700` : `gray-400`}
            borderRadius="lg"
            padding="p-4"
            margin="m-2"
            cursor="cursor-pointer"
            onClick={() => renderExtract("real")}
          >
            <View direction="flex-col">
              <img src={RealLogo} width="35px" height="30px" alt="Busd logo" />
            </View>
            <View direction="flex-col" margin="ml-2">
              <h5
                className={
                  userLogged?.balanceTotal.toFixed(2).startsWith("-")
                    ? `text-red-600 text-base mt-2 font-semibold`
                    : `text-gray-900 text-base mt-2 font-semibold`
                }
              >
                Saldo: {userLogged?.balanceTotal.toFixed(2)}
              </h5>
            </View>
          </View>
          <View
            data-testid="extratoBitcoin"
            border="border-2"
            borderColor={
              selectedCripto === "bitcoin" ? `green-700` : `gray-400`
            }
            borderRadius="lg"
            padding="p-4"
            margin="m-2"
            cursor="cursor-pointer"
            onClick={() => renderExtract("bitcoin")}
          >
            <View direction="flex-col">
              <img
                src={BitcoinLogo}
                width="35px"
                height="30px"
                alt="Bitcoin logo"
              />
            </View>
            <View direction="flex-col" margin="ml-2">
              <h5
                className={
                  userLogged?.quantBitcoin.toString().startsWith("-")
                    ? `text-red-600 text-base mt-2 font-semibold`
                    : `text-gray-900 text-base mt-2 font-semibold`
                }
              >
                Quantidade: {userLogged?.quantBitcoin}
              </h5>
            </View>
          </View>
          <View
            data-testid="extratoBusd"
            border="border-2"
            borderColor={selectedCripto === "busd" ? `green-700` : `gray-400`}
            borderRadius="lg"
            padding="p-4"
            margin="m-2"
            cursor="cursor-pointer"
            onClick={() => renderExtract("busd")}
          >
            <View direction="flex-col">
              <img src={BusdLogo} width="35px" height="30px" alt="Busd logo" />
            </View>
            <View direction="flex-col" margin="ml-2">
              <h5
                className={
                  userLogged?.quantBusd.toString().startsWith("-")
                    ? `text-red-600 text-base mt-2 font-semibold`
                    : `text-gray-900 text-base mt-2 font-semibold`
                }
              >
                Quantidade: {userLogged?.quantBusd}
              </h5>
            </View>
          </View>
        </View>
      </View>
      <>
        {dataExtract.length === 0 && (
          <View justifyItems="center">
            <h5 className="text-gray-900 text-lg m-4  font-semibold">
              Não há dados para a exibição.
            </h5>
          </View>
        )}
        <View
          direction="flex-col"
          height="h-64"
          width="full"
          overflow="overflow-auto"
        >
          {dataExtract.map((item, i) => {
            return (
              <View
                direction="flex-col"
                justifyItems="between"
                border="border-b"
                padding="p-3"
              >
                <View>
                  <h5 className="text-gray-900 text-base mr-1 ml-2 font-semibold">
                    Data:
                  </h5>
                  <h1 className="text-gray-900 text-sm mt-0.5">
                    {Object.values(item)[2]}
                  </h1>
                  <h5 className="text-gray-900 text-base mr-1 ml-2 font-semibold">
                    Operação:
                  </h5>
                  <h1 className="text-gray-900 text-sm mt-0.5">
                    {Object.values(item)[0]}
                  </h1>
                  <h5 className="text-gray-900 text-base mr-1 ml-2 font-semibold">
                    Descrição:
                  </h5>
                  <h1 className="text-gray-900 text-sm mt-0.5">
                    {Object.values(item)[1]}
                  </h1>
                </View>
              </View>
            );
          })}
        </View>
      </>
    </View>
  );
};
