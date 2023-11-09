'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  defaults,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
);

type Props =  {
  options: ChartOptions<'bar'>,
  data: ChartData<'bar'>, 
  height?: number,
}

function ChartBar({
  options,
  data,
  height,
}:Props ) {
  const defaultOptions = {
    height: 200,
    responsive: true,
    barThickness: 5,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const innerOptions = Object.assign({}, defaultOptions, options)
  defaults.scale.display = false

  return (
    <div>
      <Bar 
        height={height}
        options={innerOptions}
        data={data}
      />
    </div>
  )
}

export default ChartBar
