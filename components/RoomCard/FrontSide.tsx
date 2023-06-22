'use client';

import _ from 'lodash';
import { FC, SetStateAction, useContext } from 'react';

import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import { FaHeartbeat, FaLungs, FaTemperatureHigh } from 'react-icons/fa';

interface Props {
  id: number;
  nama: string;
  beat: number[];
  spo2: number[];
  temp: number[];
  timestamp: number[];
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<SetStateAction<boolean>>;
  handleClick: () => void;
}

interface RangeObject {
  rangeBeat: boolean;
  rangeSpo2: boolean;
  rangeTemp: boolean;
}

const FrontSide: FC<Props> = ({
  id,
  nama,
  beat,
  spo2,
  temp,
  timestamp,
  isFlipped,
  setIsFlipped,
  handleClick
}) => {
  const range = () => {
    const rangeBeat = _.inRange(_.mean(_.compact(beat)), 60, 100);
    const rangeSpo2 = _.inRange(_.mean(_.compact(spo2)), 95, 100);
    const rangeTemp = _.inRange(_.mean(_.compact(temp)), 36.1, 37.2);

    return { rangeBeat, rangeSpo2, rangeTemp };
  };

  const paramRange = range();

  const colorCode = ({ rangeBeat, rangeSpo2, rangeTemp }: RangeObject) => {
    switch (true) {
      case !rangeBeat && !rangeSpo2 && !rangeTemp:
        return 'bg-merah';
      case !rangeBeat && rangeSpo2 && rangeTemp:
      case !rangeBeat && !rangeSpo2 && rangeTemp:
      case !rangeBeat && rangeSpo2 && !rangeTemp:
      case rangeBeat && !rangeSpo2 && !rangeTemp:
      case rangeBeat && rangeSpo2 && !rangeTemp:
      case rangeBeat && !rangeSpo2 && !rangeTemp:
      case rangeBeat && !rangeSpo2 && rangeTemp:
        return 'bg-kuning';
      case rangeBeat && rangeSpo2 && rangeTemp:
        return 'bg-hijauTerang';
      default:
        return 'bg-abu';
    }
  };
  return (
    <div onClick={handleClick} className='card-face card-face-front'>
      <section id='card-header' className={`${colorCode(paramRange)}`}>
        <CardHeader id={id} />
      </section>
      <section
        id='card-content-body'
        className='h-full w-full gap-1 rounded-b-xl'>
        <div className='flex h-1/4 items-center justify-center text-center text-lg'>
          <h3 className='capitalize'>{nama}</h3>
        </div>
        <div className='h-3/4'>
          <div className='grid grid-rows-3 items-center gap-4 px-3'>
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
      <section id='card-footer'>
        <CardFooter
          isFlipped={isFlipped}
          setIsFlipped={setIsFlipped}
          timestamp={timestamp}
        />
      </section>
    </div>
  );
};

export default FrontSide;
