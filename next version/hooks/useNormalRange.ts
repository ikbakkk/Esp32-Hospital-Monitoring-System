import _ from 'lodash';
import { useState, useEffect } from 'react';
import { Nilai, NormalRangeCheckerType } from '@/type';
import useDataExtraction from './useDataExtraction';

const useNormalRange = (
  nilai: Nilai,
): NormalRangeCheckerType => {
  const {beat, spo2, temp} = useDataExtraction(nilai)
  const [normalRangeCheck, setNormalRangeCheck] =
    useState<NormalRangeCheckerType>({} as NormalRangeCheckerType);

  useEffect(() => {
    const calculateRange = () => {
      const rangeBeat = _.inRange(_.mean(_.compact(beat)), 60, 100);
      const rangeSpo2 = _.inRange(_.mean(_.compact(spo2)), 95, 100);
      const rangeTemp = _.inRange(_.mean(_.compact(temp)), 36.1, 37.2);

      setNormalRangeCheck({ rangeBeat, rangeSpo2, rangeTemp });
    };

    calculateRange();
  }, [beat, spo2, temp]);

  return normalRangeCheck;
};

export default useNormalRange;
