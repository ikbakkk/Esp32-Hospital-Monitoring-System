import { User } from '@/type';
import { useContext } from 'react';
import { CardContext } from '@/utils/CardContext';

import CardFace from './CardFace';
import Link from 'next/link';

interface RoomCardContainerProps {
  data: User;
}

const RoomCard = ({ data }: RoomCardContainerProps) => {
  const { nama, nilai, noKamar } = data;
  const { isFlipped } = useContext(CardContext);

  const cardRotationClassName = isFlipped
    ? '[transform:rotateY(180deg)]'
    : '[transform:rotateY(0deg)]';

  const cardCurrentState = (
    <>
      <CardFace
        nama={nama}
        nilai={nilai}
        roomNumber={noKamar ?? 0}
        side='front'
      />
      <CardFace
        nama={nama}
        nilai={nilai}
        roomNumber={noKamar ?? 0}
        side='back'
      />
    </>
  );

  return (
    <Link href={`/detail/${noKamar - 1}`} className='card-container mx-2 my-2'>
      <div className={`${cardRotationClassName} card-face-body`}>
        {cardCurrentState}
      </div>
    </Link>
  );
};

export default RoomCard;
