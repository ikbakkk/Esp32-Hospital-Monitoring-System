import { FC } from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import timeFormatter from '@/utils/timeFormatter';
import dateFormatter from '@/utils/dateFormatter';

import { HiOutlineDownload } from 'react-icons/hi';

interface Nilai {
  beat: number;
  spo2: number;
  temp: number;
  timestamp: number;
}

interface Props {
  nilai: Nilai[];
  name: string;
  title: string;
  roomNumber: number;
}

const DownloadButton: FC<Props> = ({ nilai, name, title, roomNumber }) => {
  const filename = (name: string) => {
    return `Ruang ${roomNumber} - ${name.toUpperCase()} - Report ${new Date().toUTCString()}.csv`;
  };

  const timestampFormatter = (time: number) => {
    return dateFormatter(time, true) + ' | ' + timeFormatter(time, true);
  };

  const remappedNilai = nilai.map(n => ({
    Beat: n.beat,
    Spo2: n.spo2,
    Temperature: n.temp,
    Timestamp: timestampFormatter(n.timestamp)
  }));

  const exportToXlsx = (nilai: Nilai[]) => {
    const worksheet = XLSX.utils.json_to_sheet(remappedNilai);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFileXLSX(workbook, `${filename(name)}.xlsx`);
  };

  return (
    <button
      className='flex flex-row items-center gap-3 rounded-lg p-2 font-semibold duration-200 hover:bg-title/20 active:scale-95'
      onClick={() => exportToXlsx(nilai)}>
      <HiOutlineDownload className='download-button' size={22} title={title} />
      <p>{title}</p>
    </button>
  );
};

export default DownloadButton;
