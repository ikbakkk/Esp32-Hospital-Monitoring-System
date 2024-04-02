import { FC } from 'react';
import { User } from '@/type';

import Header from './Header';
import Table from './Table';
import DownloadButton from '../DownloadButton';

interface ReportTableProps {
  data: User;
  showName: boolean;
}

const ReportTable: FC<ReportTableProps> = ({ data, showName }) => {
  const { nama, noKamar, nilai } = data;
  const nilaiArr = Object.values(nilai);

  const header = showName ? (
    <Header name={nama} roomNumber={noKamar ?? 0} />
  ) : null;

  return (
    <div className='flex w-full flex-col items-center rounded-xl p-2 outline'>
      {header}
      <div className='flex w-full flex-col rounded-xl p-2'>
        <div className='flex w-full justify-center'>
          <DownloadButton
            name={nama}
            title='Download records in .xlsx'
            nilai={nilaiArr}
            roomNumber={noKamar ?? 0}
          />
        </div>
        <Table nilai={nilaiArr} />
      </div>
    </div>
  );
};

export default ReportTable;
