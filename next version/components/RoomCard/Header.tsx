import { FC } from 'react';
import { RiCloseCircleLine, RiEditLine } from 'react-icons/ri';

interface HeaderProps {
  colorCode: string;
  roomNumber: number;
  handleDelete: (e: React.MouseEvent<SVGElement>) => void;
  handleEditName: (e: React.MouseEvent<SVGElement>) => void;
}

const Header: FC<HeaderProps> = ({
  colorCode,
  roomNumber,
  handleDelete,
  handleEditName,
}) => {
  return (
    <header
      id='card-header'
      className={colorCode === 'bg-kuning' ? 'bg-kuning' : colorCode}
    >
      <RiEditLine
        onClick={(e) => handleEditName(e)}
        size={20}
        className='card-button'
      />
      <p className='text-xl'>Ruang {roomNumber}</p>
      <RiCloseCircleLine
        onClick={(e) => handleDelete(e)}
        size={20}
        className='card-button '
      />
    </header>
  );
};

export default Header;
