import {
  FaHeartbeat,
  FaLungs,
  FaTemperatureHigh,
  FaHistory
} from 'react-icons/fa';

import timeFormatter from '@/utils/timeFormatter';
import dateFormatter from '@/utils/dateFormatter';

import { FC } from 'react';
import DownloadButton from './DownloadButton';

interface Nilai {
  beat: number;
  spo2: number;
  temp: number;
  timestamp: number;
}

interface ReportTableProps {
  name: string;
  nilai: Nilai[];
  sensorId: number;
  showName: boolean;
}

const ReportTable: FC<ReportTableProps> = ({
  name,
  nilai,
  sensorId,
  showName
}) => {
  return (
    <div className='flex w-full flex-col items-center rounded-xl p-2 outline'>
      {showName ? (
        <div className='flex w-full flex-row justify-center p-2'>
          <div className='flex flex-col text-center'>
            <h2 className='text-2xl'>Ruang {sensorId + 1}</h2>
            <h3 className='text-xl'>{name}</h3>
          </div>
        </div>
      ) : null}
      <div className='flex w-full flex-col rounded-xl p-2'>
        <div className='flex w-full justify-center'>
          <DownloadButton
            name={name}
            title='Download records in .xlsx'
            nilai={nilai}
            roomNumber={sensorId + 1}
          />
        </div>
        <table className='w-full text-center'>
          <tbody className='flex h-96 w-full flex-col overflow-y-scroll'>
            <tr className='sticky top-0 flex justify-evenly border-b-2 border-title bg-white py-2'>
              <th className='flex w-full flex-col items-center justify-center gap-1'>
                <FaHistory size={24} />
              </th>
              <th className='flex w-full flex-col items-center justify-center gap-1'>
                <FaHeartbeat size={24} />
                <p>(bpm)</p>
              </th>
              <th className='flex w-full flex-col items-center justify-center gap-1'>
                <FaLungs size={24} />
                <p>(%)</p>
              </th>
              <th className='flex w-full flex-col items-center justify-center gap-1'>
                <FaTemperatureHigh size={24} />
                <p>(°C)</p>
              </th>
            </tr>
            {nilai
              .slice(1)
              .reverse()
              .map((nilai, index) => (
                <tr
                  key={index}
                  className='flex justify-evenly rounded-lg px-2 text-title odd:bg-title/20 '>
                  <td className='flex w-full flex-col items-center justify-center'>
                    <p>{dateFormatter(nilai.timestamp, true)}</p>
                    <p>{timeFormatter(nilai.timestamp, true)}</p>
                  </td>
                  <td className='flex w-full items-center justify-center'>
                    {nilai.beat}
                  </td>
                  <td className='flex w-full items-center justify-center'>
                    {nilai.spo2}
                  </td>
                  <td className='flex w-full items-center justify-center'>
                    {Number(nilai.temp.toFixed(2))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
