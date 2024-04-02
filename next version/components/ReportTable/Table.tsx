import { FC } from 'react';

import dateFormatter from '@/utils/dateFormatter';
import timeFormatter from '@/utils/timeFormatter';
import {
  FaHeartbeat,
  FaHistory,
  FaLungs,
  FaTemperatureHigh
} from 'react-icons/fa';

interface Nilai {
  beat: number;
  spo2: number;
  temp: number;
  timestamp: number;
}

interface TableProps {
  nilai: Nilai[];
}

const Table: FC<TableProps> = ({ nilai }) => {
  const tableIcons = [
    {
      icon: <FaHistory size={24} />,
      unit: null
    },
    {
      icon: <FaHeartbeat size={24} />,
      unit: 'bpm'
    },
    {
      icon: <FaLungs size={24} />,
      unit: '%'
    },
    {
      icon: <FaTemperatureHigh size={24} />,
      unit: '°C'
    }
  ];

  const tableHeadings = tableIcons.map((item, index) => (
    <th
      key={index}
      className='flex w-full flex-col items-center justify-center gap-1'>
      {item.icon}
      {item.unit && <p>{item.unit}</p>}
    </th>
  ));

  const tableData = nilai.slice(1).reverse();
  return (
    <table className='w-full text-center'>
      <tbody className='flex h-96 w-full flex-col overflow-y-scroll'>
        <tr className='sticky top-0 flex justify-evenly border-b-2 border-title bg-white py-2'>
          {tableHeadings}
        </tr>
        {tableData.map((nilai, index) => (
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
              {nilai.temp}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
