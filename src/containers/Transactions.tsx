import React, { useContext, useState } from "react";
import { WalletStoreContext } from "../stores/WalletStore";
import { Input } from "../components/Input/Input";
import { Button } from "../components/Button/Button";
import BusdLogo from "../assets/images/busd-logo.png";
import BitcoinLogo from "../assets/images/bitcoin-logo.png";
import { View } from "../components/View/View";

export const Transactions = () => {
  const { lastBitcoinValue, currentBusdValue, transactionCripto } =
    useContext(WalletStoreContext);

  const [quantBitcoin, setQuantBitcoin] = useState<number>(0);
  const [quantBusd, setQuantBusd] = useState<number>(0);
  const [selectedCripto, setSelectedCripto] = useState<string>("");

  const handleChangeQuantBitcoin = (valor: number) => {
    setQuantBitcoin(valor);
  };

  const handleChangeQuantBusd = (valor: number) => {
    setQuantBusd(valor);
  };

  const handleClick = (moeda: string) => {
    setSelectedCripto(moeda);
  };

  const onBuyCripto = async (
    quantBuy: number,
    criptoValue: number,
    criptoName: string
  ) => {
    await transactionCripto(quantBuy, criptoValue, criptoName, "Compra");
  };

  const onSellCripto = (
    quantBuy: number,
    criptoValue: number,
    criptoName: string
  ) => {
    transactionCripto(quantBuy, criptoValue, criptoName, "Venda");
  };

  return (
    <View direction="flex-col">
      <p className="text-gray-700 text-base mb-4">
        Compra e venda criptomoedas, utilizando o saldo em reais da sua conta!
      </p>
      <View justifyItems="center">
        <View
          data-testid="tranBitcoin"
          direction="flex-col"
          border="border-2"
          borderColor={selectedCripto === "bitcoin" ? `green-700` : `gray-400`}
          borderRadius="lg"
          padding="p-4"
          margin="m-2"
          onClick={() => {
            handleClick("bitcoin");
          }}
        >
          <View>
            <View direction="flex-col">
              <img
                src={BitcoinLogo}
                width="35px"
                height="30px"
                alt="Bitcoin logo"
              />
            </View>
            <View direction="flex-col" margin="ml-2">
              <h5 className="text-gray-900 text-base mt-2 font-semibold">
                Valor atual : {lastBitcoinValue}
              </h5>
            </View>
          </View>
          <View>
            <View direction="flex-col" margin="mt-3">
              <h5 className="text-gray-900 text-base font-medium">
                Quantidade:
              </h5>
              <Input
                data-testid="quantBitcoin"
                min="0"
                name="quant"
                type="number"
                value={quantBitcoin}
                onChange={(event) =>
                  handleChangeQuantBitcoin(Number(event.target.value))
                }
              />
            </View>
          </View>
          <View>
            <h5 className="text-gray-900 text-base mb-3 font-semibold">
              Valor total: {(lastBitcoinValue * quantBitcoin).toFixed(2)}
            </h5>
          </View>
          <View justifyItems="between">
            <View direction="flex-col">
              <Button
                data-testid="buyBitcoin"
                onClick={() =>
                  onBuyCripto(quantBitcoin, lastBitcoinValue, "bitcoin")
                }
                disabled={quantBitcoin === 0}
              >
                Comprar
              </Button>
            </View>
            <View direction="flex-col">
              <Button
                data-testid="sellBitcoin"
                onClick={() =>
                  onSellCripto(quantBitcoin, lastBitcoinValue, "bitcoin")
                }
                disabled={quantBitcoin === 0}
              >
                Vender
              </Button>
            </View>
          </View>
        </View>

        <View
          data-testid="tranBusd"
          direction="flex-col"
          border="border-2"
          borderColor={selectedCripto === "busd" ? `green-700` : `gray-400`}
          borderRadius="lg"
          padding="p-4"
          margin="m-2"
          onClick={() => {
            handleClick("busd");
          }}
        >
          <View>
            <View direction="flex-col">
              <img
                src={BusdLogo}
                width="35px"
                height="30px"
                alt="Bitcoin logo"
              />
            </View>
            <View direction="flex-col" margin="ml-2">
              <h5 className="text-gray-900 text-base mt-2 font-semibold">
                Valor atual : {currentBusdValue}
              </h5>
            </View>
          </View>
          <View>
            <View direction="flex-col" margin="mt-3">
              <h5 className="text-gray-900 text-base font-medium">
                Quantidade:
              </h5>
              <Input
                data-testid="quantBusd"
                min="0"
                name="quant"
                type="number"
                value={quantBusd}
                onChange={(event) =>
                  handleChangeQuantBusd(Number(event.target.value))
                }
              />
            </View>
          </View>
          <View>
            <h5 className="text-gray-900 text-base mb-3 font-semibold">
              Valor total: {(currentBusdValue * quantBusd).toFixed(2)}
            </h5>
          </View>
          <View justifyItems="between">
            <View direction="flex-col">
              <Button
                data-testid="buyBusd"
                onClick={() => onBuyCripto(quantBusd, currentBusdValue, "busd")}
                disabled={quantBusd === 0}
              >
                Comprar
              </Button>
            </View>
            <View direction="flex-col">
              <Button
                data-testid="sellBusd"
                onClick={() =>
                  onSellCripto(quantBusd, currentBusdValue, "busd")
                }
                disabled={quantBusd === 0}
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
