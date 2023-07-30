'use client';

import { User } from '@/type';
import { useMemo } from 'react';
import useDataMap from '@/hooks/useDataMap';
import { useParams } from 'next/navigation';
import { dynamicPathRef } from '@/utils/firebase';
import { useDatabaseValue } from '@react-query-firebase/database';

import DetailHeader from '@/components/Detail/DetailHeader';
import DetailReading from '@/components/Detail/DetailReading';
import ReportTable from '@/components/ReportTable';
import { FaHeartbeat, FaLungs, FaTemperatureHigh } from 'react-icons/fa';

const DetailPage = () => {
  const slug = Number(useParams().slug);
  const dbRef = dynamicPathRef(slug);

  const { data, isLoading } = useDatabaseValue<User>(
    [`userId/${slug}`],
    dbRef,
    { subscribe: true }
  );
  const nilai = useMemo(() => {
    const nilai = Object.values(data?.nilai ?? []);
    const newNilai = nilai.map(nilai => ({
      ...nilai,
      temp: parseFloat(nilai.temp.toFixed(2))
    }));

    return newNilai;
  }, [data?.nilai]);
  const { beat, spo2, temp, timestamp } = useDataMap(data);

  const readings = [
    {
      title: 'Heart Rate',
      dataKeyY: 'beat',
      icon: <FaHeartbeat size={80} />,
      nilai,
      numberArr: beat,
      unit: 'bpm'
    },
    {
      title: 'Spo2',
      dataKeyY: 'spo2',
      icon: <FaLungs size={80} />,
      nilai,
      numberArr: spo2,
      unit: '%'
    },
    {
      title: 'Temperature',
      dataKeyY: 'temp',
      icon: <FaTemperatureHigh size={80} />,
      nilai,
      numberArr: temp,
      unit: '°C'
    }
  ];

  const detailReadings = readings.map(
    ({ title, dataKeyY, icon, nilai, numberArr, unit }) => (
      <DetailReading
        key={title}
        title={title}
        dataKeyY={dataKeyY}
        icon={icon}
        nilai={nilai}
        numberArr={numberArr}
        unit={unit}
      />
    )
  );

  return (
    <>
      {isLoading ? (
        <div className='flex h-screen items-center justify-center'>
          <p>Loading...</p>
        </div>
      ) : (
        <div className='flex w-full flex-col pt-12'>
          <div className='sticky top-0 z-30 justify-center p-6 lg:px-20'>
            <DetailHeader
              name={data?.nama ?? ''}
              time={timestamp[timestamp.length - 1]}
            />
          </div>
          <div className='flex w-full flex-row justify-evenly p-6 lg:px-20'>
            <div className='flex w-full flex-col space-y-5'>
              <>{detailReadings}</>
              <ReportTable
                name={data?.nama ?? ''}
                nilai={nilai}
                sensorId={slug}
                showName={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailPage;
