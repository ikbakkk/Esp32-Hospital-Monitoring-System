'use client';

import _ from 'lodash';
import { useDatabaseValue } from '@react-query-firebase/database';
import { mainPathRef } from '../../utils/firebase';
import GenericBarChart from '@/components/BarChart';
import { User } from '../../type';

type GrafikPageProps = {
  initialData: User[];
};

const GrafikPage = ({ initialData }: GrafikPageProps) => {
  const { data } = useDatabaseValue<User[]>(
    ['userId'],
    mainPathRef,
    {},
    { initialData }
  );

  const dataFormatter = (data: User[] | undefined) => {
    let result;
    if (data !== undefined) {
      result = data.map((data) => {
        const nama = data.nama;
        const beatArr = Object.values(data.nilai).map((nilai) => nilai.beat);
        const spo2Arr = Object.values(data.nilai).map((nilai) => nilai.spo2);
        const tempArr = Object.values(data.nilai).map((nilai) => nilai.temp);

        return {
          nama: nama,
          beat: beatArr[beatArr.length - 1],
          spo2: spo2Arr[spo2Arr.length - 1],
          temp: tempArr[tempArr.length - 1],
        };
      });
    }
    return result;
  };
  return (
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
  );
};

export default GrafikPage;
