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
}

export interface NilaiArr {
  beat: number;
  spo2: number;
  temp: number;
  timestamp: number;
  [key: string]: number;
}
