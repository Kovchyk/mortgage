import { FC } from 'react';
import { round } from '../utils'
import { IDataToDisplay } from '../types'

const LoanResult: FC<IDataToDisplay> = ({ data }) => {
  if (!data) {
    return null;
  }

  const {
    principal,
    annualInterestRate,
    months,
    monthlyPayment,
    additionalPayment,
    monthTaken,
    totalPaid,
  } = data;

  return (
    <p className='leading-7'>
      При сумме кредита {principal} под {annualInterestRate}% годовых на {months} месяцев обязательный ежемесячный платеж составит {monthlyPayment}.
      При дополнительном платеже на "тело" кредита {additionalPayment}, кредит будет выплачен примерно за {(monthTaken / 12).toFixed(1).split('.')[0]} лет/года 
      и {(monthTaken / 12).toFixed(1).split('.')[1]} месяца(ев).
      Общий ежемесячный платеж составит {monthlyPayment + additionalPayment}. Всего будет выплачено {totalPaid.toFixed(2)} c переплатой {round(round(totalPaid) - principal) }.
    </p>
  );
};

export default LoanResult;