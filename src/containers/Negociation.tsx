import React, { useContext, useState } from "react";
import { WalletStoreContext } from "../stores/WalletStore";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import BusdLogo from "../assets/images/busd-logo.png";
import BitcoinLogo from "../assets/images/bitcoin-logo.png";
import { View } from "../components/View/View";

export const Negociation = () => {
  const { lastBitcoinValue, currentBusdValue, negociationCripto } =
    useContext(WalletStoreContext);

  const [quant, setQuant] = useState<number>(0);
  const [relation, setRelation] = useState<boolean>(true);

  const handleChangeQuant = (valor: number) => {
    setQuant(valor);
  };

  const onBuyCripto = () => {
    negociationCripto(
      quant,
      relation
        ? parseFloat((lastBitcoinValue / currentBusdValue).toFixed(2))
        : parseFloat((currentBusdValue / lastBitcoinValue).toFixed(8)),
      relation ? "bitcoin" : "busd",
      "Compra"
    );
  };

  const onSellCripto = () => {
    negociationCripto(
      quant,
      relation
        ? parseFloat((lastBitcoinValue / currentBusdValue).toFixed(2))
        : parseFloat((currentBusdValue / lastBitcoinValue).toFixed(8)),
      relation ? "bitcoin" : "busd",
      "Venda"
    );
  };

  const changeRelation = () => {
    setRelation(!relation);
    setQuant(0);
  };

  return (
    <View direction="flex-col">
      <p className="text-gray-700 text-base mb-4">
        Compra e venda criptomoedas, utilizando o saldo em criptomoedas da sua
        conta!
      </p>
      <View justifyItems="center" width="full">
        <View
          direction="flex-col"
          border="border-2"
          borderColor="gray-400"
          borderRadius="lg"
          padding="p-4"
          margin="m-2"
          width="3/5"
        >
          <View justifyItems="center">
            <View direction="flex-col">
              <img
                src={relation ? BitcoinLogo : BusdLogo}
                width="30px"
                height="30px"
                alt="Busd logo"
              />
            </View>
            <View direction="flex-col" margin="ml-2 mr-4">
              <h5 className="text-gray-900 text-lg font-bold">{`1 ${
                relation ? "Bitcoin" : "Busd"
              }`}</h5>
            </View>

            <View
              data-testid="changeRelationDiv"
              onClick={() => changeRelation()}
              direction="flex-col"
              margin="mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-green-600"
                fill="currentColor"
                viewBox="0 0 512 512"
                stroke="currentColor"
              >
                <path d="M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z" />
              </svg>
            </View>

            <View direction="flex-col">
              <img
                src={relation ? BusdLogo : BitcoinLogo}
                width="30px"
                height="30px"
                alt="Busd logo"
              />
            </View>

            <View direction="flex-col" margin="ml-2">
              <h5 className="text-gray-900 text-lg font-bold">
                {relation
                  ? (lastBitcoinValue / currentBusdValue).toFixed(2) + " Busd"
                  : (currentBusdValue / lastBitcoinValue).toFixed(8) +
                    " Bitcoin"}
              </h5>
            </View>
          </View>
          <View justifyItems="center">
            <h5 className="text-gray-900 text-base mt-3 mr-3 font-medium">
              Quantidade:
            </h5>
            <Input
              data-testid="quantNegociation"
              name="quant"
              type="number"
              min="0"
              value={quant}
              onChange={(event) =>
                handleChangeQuant(Number(event.target.value))
              }
            />
          </View>
          <View>
            <h5 className="text-gray-900 text-base mb-3 font-semibold">
              Valor total:{" "}
              {relation
                ? (
                    parseFloat(
                      (lastBitcoinValue / currentBusdValue).toFixed(2)
                    ) * quant
                  ).toFixed(2)
                : (
                    parseFloat(
                      (currentBusdValue / lastBitcoinValue).toFixed(8)
                    ) * quant
                  ).toFixed(8)}
            </h5>
          </View>
          <View justifyItems="center">
            <View direction="flex-col" margin="mr-4">
              <Button
                data-testid="buyNegociation"
                onClick={() => onBuyCripto()}
                disabled={quant === 0}
              >
                Comprar
              </Button>
            </View>

            <View direction="flex-col" margin="ml-4">
              <Button
                data-testid="sellNegociation"
                onClick={() => onSellCripto()}
                disabled={quant === 0}
              >
                Vender
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
