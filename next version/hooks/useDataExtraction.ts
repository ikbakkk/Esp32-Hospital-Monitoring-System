import { Nilai } from '@/type';
import { useState, useEffect } from 'react';

const useDataExtraction = (nilai: Nilai) => {
  const [beat, setBeat] = useState<number[]>([]);
  const [spo2, setSpo2] = useState<number[]>([]);
  const [temp, setTemp] = useState<number[]>([]);
  const [timestamp, setTimestamp] = useState<number[]>([]);

  useEffect(() => {
    const [beatData, spo2Data, tempData, timestampData] = Object.keys(
      nilai
    ).reduce(
      ([beatArr, spo2Arr, tempArr, timestampArr], key) => {
        const { beat: b, spo2: s, temp: t, timestamp: ts } = nilai[key];
        const floatTemp = parseFloat(t.toFixed(2));
        return [
          [...beatArr, b],
          [...spo2Arr, s],
          [...tempArr, floatTemp],
          [...timestampArr, ts]
        ];
      },
      [[], [], [], []] as [number[], number[], number[], number[]]
    );

    setBeat(beatData);
    setSpo2(spo2Data);
    setTemp(tempData);
    setTimestamp(timestampData);
  }, [nilai]);
  return { beat, spo2, temp, timestamp };
};

export default useDataExtraction;
