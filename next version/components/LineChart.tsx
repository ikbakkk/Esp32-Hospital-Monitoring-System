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

interface Props {
  [key: string]: any;
}

const LineSeriesChart: FC<Props> = ({
  data,
  dataKeyX,
  dataKeyY,
  syncId,
  fillColor,
  unit,
  lineName,
  valueFormatter,
  fixedDomain,
  fixedTicks,
  tickStep,
  rangeLimit
}) => {
  const calculateTicks = (
    step = 5,
    dataRange = rangeLimit || [0, Number.POSITIVE_INFINITY]
  ) => {
    const dataMin = Math.min.apply(Math, data);
    const dataMax = fixedDomain ? fixedDomain[1] : Math.max.apply(Math, data);
    let start = Math.max(dataRange[0], Math.floor(dataMin / step) * step);
    let end = Math.min(dataRange[1], Math.ceil(dataMax / step) * step);
    return range(start, end + 1, step);
  };

  const timeLabelFormatter = (value: any) => {
    if (isNaN(value)) {
      return value;
    }
    return timeFormatter(value, false);
  };

  const valueLabelFormatter = (value: any) => {
    return valueFormatter ? valueFormatter(value) : value;
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
          interval={'preserveStartEnd'}
          tickFormatter={timeStr => timeLabelFormatter(timeStr)}
          // domain={[0, 'dataMax']}
          // type='number'
        />
        <YAxis
          type='number'
          interval='preserveStartEnd'
          domain={fixedDomain || [(dataMin: any) => dataMin]}
          axisLine={false}
          unit={unit}
          ticks={fixedTicks || calculateTicks(tickStep)}
          tickFormatter={value => valueLabelFormatter(value)}
          minTickGap={2}
          stroke={fillColor}
        />
        <Tooltip
          labelFormatter={timeStr => timeLabelFormatter(timeStr)}
          formatter={value => valueLabelFormatter(value)}
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
          isAnimationActive={true}
          unit={unit}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineSeriesChart;
