'use client';

import React from 'react';
import { User } from '@/type';
import { useParams } from 'next/navigation';
import { dynamicPathRef } from '@/utils/firebase';
import { useDatabaseValue } from '@react-query-firebase/database';

import DetailHeader from '@/components/Detail/DetailHeader';
import DetailReading from '@/components/Detail/DetailReading';
import { FaHeartbeat, FaLungs, FaTemperatureHigh } from 'react-icons/fa';
import ReportTable from '@/components/ReportTable';

interface FilteredNilai {
  beat: number[];
  spo2: number[];
  temp: number[];
  timestamp: number[];
}

const DetailPage = () => {
  const slug = Number(useParams().slug);
  const dbRef = dynamicPathRef(slug);

  const { data, isLoading } = useDatabaseValue<User>(
    [`userId/${slug}`],
    dbRef,
    { subscribe: true }
  );

  const oneHourAgo = Date.now() - 3600000;

  const nilai = Object.values(data?.nilai ?? []);
  const filterredNilai = nilai.filter(
    n => n.timestamp >= oneHourAgo && n.timestamp <= Date.now()
  );
  const nilaiWithFixedTemp = filterredNilai.map(n => {
    return {
      ...n,
      temp: Number(n.temp.toFixed(2))
    };
  });

  const { beat, spo2, temp, timestamp } = filterredNilai.reduce(
    (
      { beat, spo2, temp, timestamp },
      { beat: b, spo2: s, temp: t, timestamp: ts }
    ) => {
      return {
        beat: [...beat, b],
        spo2: [...spo2, s],
        temp: [...temp, Number(t.toFixed(2))],
        timestamp: [...timestamp, ts]
      };
    },
    {
      beat: [],
      spo2: [],
      temp: [],
      timestamp: []
    } as FilteredNilai
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
            <DetailHeader name={data?.nama ?? ''} time={timestamp.pop() ?? 0} />
          </div>
          <div className='flex w-full flex-row justify-evenly p-6 lg:px-20'>
            <div className='flex w-full flex-col space-y-5'>
              <DetailReading
                title='Heart Rate'
                dataKeyY='beat'
                icon={<FaHeartbeat size={80} />}
                nilai={nilai}
                numberArr={beat}
                unit='bpm'
              />
              <DetailReading
                title='Spo2'
                dataKeyY='spo2'
                icon={<FaLungs size={80} />}
                nilai={nilai}
                numberArr={spo2}
                unit='%'
                customDomain={[(dataMin: number) => dataMin, 100]}
              />
              <DetailReading
                title='Temperature'
                dataKeyY='temp'
                icon={<FaTemperatureHigh size={80} />}
                nilai={nilai}
                numberArr={temp}
                unit='°C'
              />
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
