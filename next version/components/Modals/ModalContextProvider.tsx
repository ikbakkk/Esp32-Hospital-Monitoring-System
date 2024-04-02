import { FC, useState } from 'react';
import { ModalContext } from '@/utils/ModalContext';

interface ModalContextProviderProps {
  children: React.ReactNode;
}

const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const value = {
    isOpen,
    setIsOpen
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
