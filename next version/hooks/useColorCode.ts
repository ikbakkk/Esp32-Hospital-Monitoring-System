import { NormalRangeCheckerType } from '@/type';

const useColorCode = ({
  rangeBeat,
  rangeSpo2,
  rangeTemp,
}: NormalRangeCheckerType): string => {
  const bit = (rangeBeat ? 4 : 0) | (rangeSpo2 ? 2 : 0) | (rangeTemp ? 1 : 0);

  switch (bit) {
    case 0:
      return 'bg-merah';
    case 1:
      return 'bg-kuning';
    case 2:
      return 'bg-kuning';
    case 3:
      return 'bg-kuning';
    case 4:
      return 'bg-kuning';
    case 5:
      return 'bg-kuning';
    case 6:
      return 'bg-kuning';
    case 7:
      return 'bg-hijauTerang';
    default:
      return 'bg-abu';
  }
};

export default useColorCode;
