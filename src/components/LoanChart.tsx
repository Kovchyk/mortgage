import { FC } from 'react';
import ReactECharts from './Chart';
import { ILoanChartProps } from '@/types';

const LoanChart: FC<ILoanChartProps>  = ({ yearsList }) => {
  const option = {
    title: {
      text: 'Выплата по ипотеке'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        params = params[0];
        const date = new Date(params.name);

        return (
          `<div>
            <div>${date.toLocaleString('ru-RU', { year: 'numeric', month: 'long' })}</div>
            <div>Остаток: ${params.value[1]}</div>
          </div>`
        );
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: true
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Years',
        type: 'line',
        showSymbol: true,
        data: yearsList,
      }
    ]
  };

  return (
    <div className='h-full'>
      <ReactECharts option={option} />
    </div>
  );
};

export default LoanChart;
