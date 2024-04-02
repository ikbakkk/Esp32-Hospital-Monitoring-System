import { FC } from 'react';
import { FaHeartbeat, FaLungs, FaTemperatureHigh } from 'react-icons/fa';

interface FrontSideBodyProps {
  nama: string;
  beat: number[];
  spo2: number[];
  temp: number[];
}

const FrontSideBody: FC<FrontSideBodyProps> = ({ nama, beat, spo2, temp }) => {
  return (
    <section
      id='card-content-body'
      className='h-full w-full gap-1 rounded-b-xl px-3'
    >
      <div className='line-clamp-2 flex h-1/4 items-center justify-center text-center text-lg'>
        <h3>{nama}</h3>
      </div>
      <div className='h-3/4'>
        <div className='grid grid-rows-3 items-center gap-4'>
          <div className='flex flex-row items-center justify-between'>
            <FaHeartbeat size={24} />
            <p className='text-lg'>{beat[beat.length - 1]} bpm</p>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <FaLungs size={24} />
            <p className='text-lg'>{spo2[spo2.length - 1]} %</p>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <FaTemperatureHigh size={24} />
            <p className='text-lg'>{temp[temp.length - 1]} °C</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontSideBody;
