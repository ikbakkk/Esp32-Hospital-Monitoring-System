'use client';

import { useDatabaseValue } from '@react-query-firebase/database';
import { mainPathRef } from '../../utils/firebase';
import { User } from '../../type';
import ReportTable from '@/components/ReportTable';

type ReportProps = {
  initialData: User[];
};

const Report = ({ initialData }: ReportProps) => {
  const { data } = useDatabaseValue<User[]>(
    ['userId'],
    mainPathRef,
    { subscribe: true },
    { initialData }
  );

  return (
    <div className='w-full py-16'>
      <div className='flex w-full flex-row flex-wrap justify-evenly gap-y-10'>
        {data?.map((data) => (
          <div key={data.nama.toLowerCase()} className='mx-2 my-2 w-80'>
            <ReportTable data={data} showName />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
