'use client';

import { FC, ReactNode } from 'react';
import useStatistics from '@/hooks/useStatistics';

interface BackSideBodyTableProps {
  icon: ReactNode;
  dataArr: number[];
}

const BackSideBodyTable: FC<BackSideBodyTableProps> = ({ icon, dataArr }) => {
  return (
    <tr className='px-4 py-2 text-center'>
      <td>{icon}</td>
      <td>{useStatistics(dataArr).minData.toString()}</td>
      <td>{useStatistics(dataArr).avgData.toString()}</td>
      <td>{useStatistics(dataArr).maxData.toString()}</td>
    </tr>
  );
};

export default BackSideBodyTable;
