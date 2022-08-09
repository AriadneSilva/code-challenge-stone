export interface User {
  name: string;
  birthDate: string;
  cpf: string;
  email: string;
  login: string;
  pass: string;
  extract: string[];
  balanceTotal: number;
  balanceBitcoin: number;
  quantBitcoin: number;
  balanceBusd: number;
  quantBusd: number;
}

export interface LoginDataFormValues {
  login: string;
  password: string;
}

export interface ShopCriptoMoedaFormValues {
  value: number;
  quant: number;
  total: number;
}

export interface UserDataFormValues {
  name: string;
  birthDate: string;
  cpf: string;
  email: string;
  login: string;
  pass: string;
  extract: string[];
  balanceTotal: number;
  balanceBitcoin: number;
  quantBitcoin: number;
  balanceBusd: number;
  quantBusd: number;
}
