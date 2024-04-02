import { useMemo } from 'react';
import { User } from '@/type';

const useDataMap = (data: User | undefined) => {
  const nilai = useMemo(() => Object.values(data?.nilai ?? []), [data?.nilai]);
  const beat = useMemo(
    () => (data?.nilai ? nilai.map(n => n.beat) : [0]),
    [data?.nilai]
  );
  const spo2 = useMemo(
    () => (data?.nilai ? nilai.map(n => n.spo2) : [0]),
    [data?.nilai]
  );
  const temp = useMemo(
    () => (data?.nilai ? nilai.map(n => parseFloat(n.temp.toFixed(2))) : [0]),
    [data?.nilai]
  );
  const timestamp = useMemo(
    () => (data?.nilai ? nilai.map(n => n.timestamp) : [0]),
    [data?.nilai]
  );

  return { beat, spo2, temp, timestamp };
};

export default useDataMap;
