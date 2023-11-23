import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  ReactElement,
} from "react";

type CurrencyType = "IRR" | "TRY" | "USDT" | "TRX";

type ExchangeContextType = {
  source: {
    amount: number | string;
    currency: CurrencyType;
    stock: number | string;
  };
  destination: {
    amount: number | string;
    currency: CurrencyType;
    stock: number | string;
  };
  commission: {
    sourceFee: number | string;
    destinationFee: number | string;
    sourceFeePercent: number;
    destinationFeePercent: number;
    destinationAmount: number | string;
    currencyReference: "destination" | "source";
  };
  rate: string;
};

type ContextValue = {
  exchangeContext: ExchangeContextType;
  setExchangeContext: Dispatch<SetStateAction<ExchangeContextType>>;
};

const ExchangeContext = createContext<ContextValue | undefined>(undefined);

export const initExchangeContext: ExchangeContextType = {
  source: {
    amount: 0,
    currency: "IRR",
    stock: 0,
  },
  destination: {
    amount: 0,
    currency: "TRY",
    stock: 0,
  },
  commission: {
    sourceFee: 0,
    destinationFee: 0,
    sourceFeePercent: 0,
    destinationFeePercent: 0,
    destinationAmount: 0,
    currencyReference: "source",
  },
  rate: "0",
};

const ExchangeContextProvider = ({ children }: { children: ReactElement }) => {
  const [exchangeContext, setExchangeContext] = useState(initExchangeContext);

  return (
    <ExchangeContext.Provider value={{ exchangeContext, setExchangeContext }}>
      {children}
    </ExchangeContext.Provider>
  );
};

export default ExchangeContextProvider;

export const useExchangeContext = () => {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error(
      "useFormContext must be used inside the FormContextProvider"
    );
  }
  return context;
};
