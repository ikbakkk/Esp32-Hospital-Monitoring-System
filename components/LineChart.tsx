import { FC } from 'react';
import { range } from 'lodash';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import timeFormatter from '@/utils/timeFormatter';
import { NilaiArr } from '@/type';

interface Props {
  data: NilaiArr[];
  dataKeyX: string;
  dataKeyY: string;
  customDomain?: [(dataMin: number) => number, number];
  fillColor: string;
  lineName: string;
  tickStep: number;
  rangeLimit?: [number, number];
  syncId: string;
  unit: string;
}

const LineSeriesChart: FC<Props> = ({
  data,
  dataKeyX,
  dataKeyY,
  syncId,
  fillColor,
  unit,
  lineName,
  customDomain,
  tickStep,
  rangeLimit
}) => {
  const calculateTicks = (
    tickStep: number,
    dataRange = rangeLimit || [0, Number.POSITIVE_INFINITY]
  ) => {
    const allData = data.map(d => d[dataKeyY]);
    const dataMin = Math.min(...allData);
    const dataMax = customDomain ? customDomain[1] : Math.max(...allData);
    const start = Math.max(
      dataRange[0],
      Math.floor(dataMin / tickStep) * tickStep
    );
    const end = Math.min(
      dataRange[1],
      Math.ceil(dataMax / tickStep) * tickStep
    );
    return range(start, end + 1, tickStep);
  };

  return (
    <ResponsiveContainer className='z-0 flex' width='100%' height='90%'>
      <LineChart
        className='z-0 flex'
        data={data}
        syncId={syncId}
        margin={{ top: 8, right: 25, left: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis
          allowDataOverflow={true}
          dataKey={dataKeyX}
          tickFormatter={timeStr => timeFormatter(timeStr, false).toString()}
          padding={'gap'}
          minTickGap={10}
        />
        <YAxis
          type='number'
          domain={customDomain || ['dataMin', 'dataMax']}
          axisLine={false}
          unit={unit}
          ticks={calculateTicks(tickStep)}
          stroke={fillColor}
        />
        <Tooltip
          labelFormatter={timeStr => timeFormatter(timeStr, true)}
          labelStyle={{ color: fillColor }}
          contentStyle={{
            background: '#fff',
            border: 'solid',
            borderColor: '#181C32',
            borderWidth: '1px',
            borderRadius: '8px'
          }}
        />
        <Line
          name={lineName}
          type='monotone'
          dataKey={dataKeyY}
          stroke={fillColor}
          fill={fillColor}
          dot={false}
          strokeWidth={2}
          isAnimationActive={false}
          unit={unit}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineSeriesChart;
