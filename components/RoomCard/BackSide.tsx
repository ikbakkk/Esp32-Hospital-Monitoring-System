'use client';

import _ from 'lodash';
import { FC, SetStateAction } from 'react';

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

const BackSide: FC<Props> = ({
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
  const statistics = (data: number[]) => {
    if (data === undefined) {
      return { maxData: '--', avgData: '--', minData: '--' };
    }
    const maxData = _.max(data);
    const minData = _.min(data);
    const avgData = Number(_.round(_.mean(data), 2).toFixed(1));

    return { maxData, avgData, minData };
  };

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
    <div onClick={handleClick} className='card-face card-face-back'>
      <section id='card-header' className={`${colorCode(paramRange)}`}>
        <CardHeader id={id} />
      </section>
      <section
        id='card-content-body'
        className='h-full w-full gap-1 rounded-b-xl'>
        <div className='flex h-1/4 items-center justify-center text-center text-lg'>
          <h3 className='capitalize'>{nama}</h3>
        </div>
        <table className='flex h-3/4 justify-center'>
          <tbody className='h-full'>
            <tr className='text-center'>
              <th></th>
              <th>Min</th>
              <th>Avrg</th>
              <th>Max</th>
            </tr>
            <tr className='py-2 text-center'>
              <td>
                <FaHeartbeat size={22} />
              </td>
              <td>{statistics(beat).minData}</td>
              <td>{statistics(beat).avgData}</td>
              <td>{statistics(beat).maxData}</td>
              <td className='text-right'>bpm</td>
            </tr>
            <tr className='py-2 text-center'>
              <td>
                <FaLungs size={22} />
              </td>
              <td>{statistics(spo2).minData}</td>
              <td>{statistics(spo2).avgData}</td>
              <td>{statistics(spo2).maxData}</td>
              <td className='text-right'>%</td>
            </tr>
            <tr className='py-2 text-center'>
              <td>
                <FaTemperatureHigh size={22} />
              </td>
              <td>{statistics(temp).minData}</td>
              <td>{statistics(temp).avgData}</td>
              <td>{statistics(temp).maxData}</td>
              <td className='text-right'>°C</td>
            </tr>
          </tbody>
        </table>
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

export default BackSide;
