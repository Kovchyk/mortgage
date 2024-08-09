import { FC } from 'react';
import ReactECharts from './Chart';

const LoanChart: FC<any>  = ({ yearsList }) => {
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

  // const countRemainingPrincipal = (
  //   totalAmount: number,
  //   months: number,
  //   interest: number,
  //   monthsIntendToPay: number,
  // ) => {
  //   const rate = interest / 100 / 12;

  //   return round(
  //     totalAmount *
  //       ((Math.pow(1 + rate, months) - Math.pow(1 + rate, monthsIntendToPay)) / (Math.pow(1 + rate, months) - 1)),
  //   );
  // };

  return (
    <div className='h-full'>
      <ReactECharts option={option} style={{
        height: '100%',
      }}
    />
    </div>
  );
};

export default LoanChart;
