import { createContext } from 'react';

interface CardContext {
  type: 'edit' | 'add' | 'delete' | null;
  dialogTitle: string;
  roomNumber: number;
  isFlipped: boolean;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<
    React.SetStateAction<'edit' | 'add' | 'delete' | null>
  >;
}

export const CardContext = createContext<CardContext>({} as CardContext);
