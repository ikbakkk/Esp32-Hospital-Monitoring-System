import { FC } from 'react';
import { FaHeartbeat, FaLungs, FaTemperatureHigh } from 'react-icons/fa';
import BackSideBodyTable from './BackSideBodyTable';

interface BackSideBodyProps {
  nama: string;
  beat: number[];
  spo2: number[];
  temp: number[];
}

const BackSideBody: FC<BackSideBodyProps> = ({ nama, beat, spo2, temp }) => {
  const tableData = [
    {
      icon: <FaHeartbeat size={22} />,
      dataArr: beat,
      unit: 'bpm',
    },
    {
      icon: <FaLungs size={22} />,
      dataArr: spo2,
      unit: '%',
    },
    {
      icon: <FaTemperatureHigh size={22} />,
      dataArr: temp,
      unit: '°C',
    },
  ];

  const tableRows = tableData.map(({ icon, dataArr, unit }) => (
    <BackSideBodyTable key={unit} icon={icon} dataArr={dataArr} />
  ));

  return (
    <section id='card-content-body' className='h-full w-full gap-1 px-3'>
      <div className='line-clamp-2 flex h-1/4 items-center justify-center text-center text-lg'>
        <h3>{nama}</h3>
      </div>
      <table className='h-3/4 w-full'>
        <tbody className='h-full w-full'>
          <tr>
            <th></th>
            <th>Min</th>
            <th>Avrg</th>
            <th>Max</th>
          </tr>
          {tableRows}
        </tbody>
      </table>
    </section>
  );
};

export default BackSideBody;
