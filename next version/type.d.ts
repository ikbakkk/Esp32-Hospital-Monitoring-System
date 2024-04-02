export interface Nilai {
  [key: string]: {
    beat: number;
    spo2: number;
    temp: number;
    timestamp: number;
  };
}

export interface User {
  nama: string;
  nilai: Nilai;
  noKamar: number;
}

export interface NilaiArr {
  [key: number]: {
    beat: number;
    spo2: number;
    temp: number;
    timestamp: number;
  };
}

export interface NormalRangeCheckerType {
  rangeBeat: boolean;
  rangeSpo2: boolean;
  rangeTemp: boolean;
}
