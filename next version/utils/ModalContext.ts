import { createContext } from 'react';

interface ContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ContextType>({} as ContextType);
