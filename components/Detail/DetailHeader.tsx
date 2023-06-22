import dateFormatter from '@/utils/dateFormatter';
import timeFormatter from '@/utils/timeFormatter';
import { FC } from 'react';

interface Props {
  name: string;
  time: number;
}

const DetailHeader: FC<Props> = ({ name, time }) => {
  return (
    <div className='z-50 mt-7 flex w-full flex-col items-center justify-center rounded-lg bg-white p-5 outline outline-title'>
      <h3 className='text-lg font-bold md:text-2xl capitalize'>{name}</h3>
      <p>
        <strong>Last Updated:</strong> {dateFormatter(time, true)} |{' '}
        {timeFormatter(time, true)}
      </p>
    </div>
  );
};

export default DetailHeader;
