'use client';

import _ from 'lodash';
import { useDatabaseValue } from '@react-query-firebase/database';
import { mainPathRef } from '../../utils/firebase';
import GenericBarChart from '@/components/BarChart';
import { User } from '../../type';

const Grafik = () => {
  const { data, isLoading } = useDatabaseValue<User[]>(['userId'], mainPathRef);

  const dataFormatter = (data: User[] | undefined) => {
    if (data === undefined) {
      return;
    }

    return data.map(({ nama, nilai }) => {
      const { beat, spo2 } = Object.values(nilai).slice(-1)[0];
      const temp = Number(Object.values(nilai).slice(-1)[0].temp.toFixed(2));

      return { nama, beat, spo2, temp };
    });
  };

  return (
    <>
      {isLoading ? (
        <div className='flex h-screen items-center justify-center'>
          <p>Loading...</p>
        </div>
      ) : (
        <div className='flex w-full flex-col items-center justify-evenly p-11'>
          <div className='my-3 flex h-64 w-full items-center rounded-xl outline outline-2'>
            <GenericBarChart
              data={dataFormatter(data) ?? []}
              dataKeyX='nama'
              dataKeyY='beat'
              barName='Heart Rate'
              unit=' bpm'
              fillColor='#181C32'
              bgcolor='#fff'
              labelColor='#fff'
              syncId='anyId'
            />
          </div>
          <div className='my-3 flex h-64 w-full items-center rounded-xl outline outline-2'>
            <GenericBarChart
              data={dataFormatter(data) ?? []}
              dataKeyX='nama'
              dataKeyY='spo2'
              barName='Spo2'
              unit=' %'
              fillColor='#181C32'
              bgcolor='#fff'
              labelColor='#fff'
              syncId='anyId'
            />
          </div>
          <div className='my-3 flex h-64 w-full items-center rounded-xl outline outline-2'>
            <GenericBarChart
              data={dataFormatter(data) ?? []}
              dataKeyX='nama'
              dataKeyY='temp'
              barName='Temperature'
              unit=' °C'
              fillColor='#181C32'
              bgcolor='#fff'
              labelColor='#fff'
              syncId='anyId'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Grafik;
