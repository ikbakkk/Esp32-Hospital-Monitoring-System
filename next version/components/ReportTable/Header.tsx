import { FC } from 'react';

interface HeaderProps {
  roomNumber: number;
  name: string;
}

const Header: FC<HeaderProps> = ({ name, roomNumber }) => {
  return (
    <div className='flex w-full flex-row justify-center p-2'>
      <div className='flex flex-col text-center'>
        <h2 className='text-2xl'>Ruang {roomNumber}</h2>
        <h3 className='text-xl'>{name}</h3>
      </div>
    </div>
  );
};

export default Header;
