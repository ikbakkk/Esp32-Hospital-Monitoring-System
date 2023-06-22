import { FC } from 'react';
import LineSeriesChart from '../LineChart';
import { NilaiArr } from '@/type';

interface Props {
  title: string;
  icon: React.ReactNode;
  numberArr: number[];
  unit: string;
  nilai: NilaiArr[];
  dataKeyY: string;
  customDomain?: [(dataMin: number) => number, number];
}

const DetailReading: FC<Props> = ({
  title,
  icon,
  numberArr,
  unit,
  nilai,
  dataKeyY,
  customDomain
}) => {
  return (
    <div className='flex h-64 flex-row gap-x-4'>
      <div className='flex h-full w-[30%] flex-col items-center justify-center gap-y-4 rounded-xl text-center text-3xl outline outline-title'>
        <h1>{title}</h1>
        <>{icon}</>
        <p>
          {numberArr.pop()} {unit}
        </p>
      </div>
      <div className='flex h-full w-[70%] items-center rounded-xl outline outline-title'>
        <LineSeriesChart
          data={nilai}
          dataKeyX='timestamp'
          dataKeyY={dataKeyY}
          syncId='anyId'
          fillColor='#41444B'
          unit={` ${unit}`}
          lineName={title}
          tickStep={title === 'Temperature' ? 0.5 : 5}
          customDomain={customDomain}
        />
      </div>
    </div>
  );
};

export default DetailReading;
