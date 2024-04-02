'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState
} from 'react';

interface ContextType {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

export const CardContext = createContext<ContextType>({} as ContextType);

export const CardContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const contextValue = {
    isOpen,
    setIsOpen
  };

  return (
    <CardContext.Provider value={contextValue}>{children}</CardContext.Provider>
  );
};
