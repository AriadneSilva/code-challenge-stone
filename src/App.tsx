import React from "react";

import Routes from "../src/routes/Routes";
import { WalletStoreProvider } from "./stores/WalletStore";

export function App() {
  return (
    <div>
      <WalletStoreProvider>
        <Routes />
      </WalletStoreProvider>
    </div>
  );
}
