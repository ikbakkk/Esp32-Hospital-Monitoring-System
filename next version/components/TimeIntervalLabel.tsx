import { FC } from 'react';
import timeFormatter from '@/utils/timeFormatter';
import dateFormatter from '@/utils/dateFormatter';

interface Props {
  start: number;
  end: number;
  className?: string;
}

const TimeIntervalLabel: FC<Props> = ({ start, end, className }) => {
  if (isNaN(start)) {
    return <span>No Data</span>;
  }

  return (
    <div className={className}>
      <div className='flex items-center text-xs'>
        <p>
          ({dateFormatter(start, false)}) {timeFormatter(start, false)} - (
          {dateFormatter(end, false)}) {timeFormatter(end, false)}
        </p>
      </div>
    </div>
  );
};

export default TimeIntervalLabel;
