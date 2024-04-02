import { FC, useState, useMemo } from 'react';
import { CardContext } from '../../utils/CardContext';

interface RoomCardContextProviderProps {
  children: React.ReactNode;
  roomNumber: number;
}

const RoomCardContextProvider: FC<RoomCardContextProviderProps> = ({
  children,
  roomNumber
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [type, setType] = useState<'edit' | 'add' | 'delete' | null>(null);

  const value = useMemo(() => {
    return {
      type,
      setType,
      roomNumber,
      dialogTitle,
      setDialogTitle,
      isFlipped,
      setIsFlipped
    };
  }, [
    type,
    setType,
    roomNumber,
    dialogTitle,
    setDialogTitle,
    isFlipped,
    setIsFlipped
  ]);

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default RoomCardContextProvider;
