'use client';

import { useRouter } from 'next/navigation';
import { User } from '@/type';
import {
  FC,
  useState,
  createContext,
  memo,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import * as XLSX from 'xlsx';

import BackSide from './BackSide';
import FrontSide from './FrontSide';
import Modal from '../Modal';
import timeFormatter from '@/utils/timeFormatter';

interface CardContext {
  type: 'edit' | 'add' | 'delete' | null;
  setType: React.Dispatch<
    React.SetStateAction<'edit' | 'add' | 'delete' | null>
  >;
  dialogTitle: string;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  id: number;
}

interface Props {
  dataUser: User;
  isLoading: boolean;
  id: number;
  dataUpdatedAt: number;
}

export const CardContext = createContext<CardContext>({} as CardContext);

const RoomCard: FC<Props> = memo(
  ({ isLoading, dataUser, id, dataUpdatedAt }) => {
    const router = useRouter();
    const [isFlipped, setIsFlipped] = useState(false);
    const [type, setType] = useState<'edit' | 'add' | 'delete' | null>(null);
    const [dialogTitle, setDialogTitle] = useState('');

    const { nilai } = dataUser;
    const [beat, spo2, temp, timestamp] = Object.keys(nilai).reduce(
      ([beat, spo2, temp, timestamp], key) => {
        const { beat: b, spo2: s, temp: t, timestamp: ts } = nilai[key];
        return [
          [...beat, b],
          [...spo2, s],
          [...temp, Number(t.toFixed(1))],
          [...timestamp, ts]
        ];
      },
      [[], [], [], []] as [number[], number[], number[], number[]]
    );

    const flip = isFlipped
      ? '[transform:rotateY(180deg)]'
      : '[transform:rotateY(0deg)]';

    const handleClick = useCallback(() => {
      router.push(`detail/${id}`);
    }, [id, router]);

    const cardProps = useMemo(
      () => ({
        nama: dataUser.nama,
        id,
        beat,
        spo2,
        temp,
        timestamp,
        isFlipped,
        setIsFlipped,
        handleClick
      }),
      [beat, dataUser.nama, handleClick, id, isFlipped, spo2, temp, timestamp]
    );

    const contextValue = useMemo(
      () => ({
        type,
        setType,
        id,
        dialogTitle,
        setDialogTitle
      }),
      [dialogTitle, id, type]
    );

    // record functions
    interface RecordTime {
      sent: {
        timestamp: number;
        formatted: string;
      };
      received: {
        timestamp: number;
        formatted: string;
      };
      diff: number;
    }

    const [timer, setTimer] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [recording, setRecording] = useState(false);
    const [timeDelta, setTimeDelta] = useState<RecordTime[]>([]);

    const selisih = dataUpdatedAt - Number(timestamp.pop());

    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;
      if (timerOn && timer < 60) {
        intervalId = setInterval(() => {
          setTimer(prevTimer => prevTimer + 1);
        }, 1000);
        setRecording(true);
      } else if (intervalId === undefined) {
        setRecording(false);
        setTimerOn(false);
        setTimer(0);
      }

      return () => {
        clearInterval(intervalId);
      };
    }, [timer, timerOn]);

    useEffect(() => {
      if (recording) {
        setTimeDelta(prev => [
          ...prev,
          {
            sent: {
              timestamp: Number(timestamp.pop()),
              formatted: timeFormatter(Number(timestamp.pop()), true)
            },
            received: {
              timestamp: dataUpdatedAt,
              formatted: timeFormatter(dataUpdatedAt, true)
            },
            diff: selisih
          }
        ]);
        console.log(timeDelta);
      }
    }, [recording, dataUpdatedAt]);

    const recordDifference = timeDelta.map((time, index) => ({
      No: index + 1,
      'Terkirim (timestamp)': time.sent.timestamp,
      'Terima (timestamp)': time.received.timestamp,
      'Waktu Terkirim': time.sent.formatted,
      'Waktu Tampil': time.received.formatted,
      Selisih: time.diff
    }));

    const exportToXlsx = () => {
      const worksheet = XLSX.utils.json_to_sheet(recordDifference);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'record.xlsx');
    };

    return (
      <CardContext.Provider value={contextValue}>
        <div className='card-container mx-2 my-2'>
          <div className={`${flip} card-face-body`}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <FrontSide {...cardProps} />
                <BackSide {...cardProps} />
              </>
            )}
          </div>
          <button
            className='outline outline-1 rounded-md '
            onClick={() => setTimerOn(!timerOn)}>
            {timerOn ? 'stop' : 'start'}
          </button>
          <button
            className='outline outline-1 rounded-md '
            onClick={exportToXlsx}>
            Eksport hasil ukur
          </button>
          <p>{timer}</p>
        </div>
        <Modal dialogTitle={dialogTitle} />
      </CardContext.Provider>
    );
  }
);

export default RoomCard;
