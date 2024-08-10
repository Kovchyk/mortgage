import { IDataToCalculate, IDataCalculated } from './types'

export const round = (number: number, sign = 2) => {
  return parseFloat(number.toFixed(sign));
};

const countMounthlyPayment = (totalAmount: number, months: number, interest: number): number => {
  const rate = interest / 100 / 12;

  const ratePowerOfMonth = round(Math.pow(1 + rate, months));

  return round((totalAmount * rate * ratePowerOfMonth) / (ratePowerOfMonth - 1));
};

export const calculate = (data: IDataToCalculate): IDataCalculated | null => {
  const principal = data.principal;
  const annualInterestRate = data.annualInterestRate;
  const additionalPayment = data.additionalPayment;
  const months = data.years * 12;

  let remainingPrincipal = principal;
  let totalPaid = 0;
  const monthlyPayment = countMounthlyPayment(principal, months, annualInterestRate); // Calculated initial monthly payment
  
  const yearsSet: Set<any> = new Set();
  let now = new Date();

  let result = null;

  for (let month = 1; month <= months; month++) {
    const monthlyInterest = remainingPrincipal * (annualInterestRate / 100 / 12);
    const principalPayment = monthlyPayment - monthlyInterest;

    remainingPrincipal -= principalPayment + additionalPayment;
    totalPaid += monthlyPayment + additionalPayment;

    now.setMonth(now.getMonth() + 1);
    now.setDate(1);
    now = new Date(now);

    if (remainingPrincipal > 0) {
      yearsSet.add({ name: now.toString(), value: [[now.getFullYear(), now.getMonth() + 1, 1].join('/'), round(remainingPrincipal)] });
    }

    if (remainingPrincipal <= 0) {  
      result = {
        principal,
        annualInterestRate,
        months,
        monthTaken: month,
        monthlyPayment,
        additionalPayment,
        totalPaid,
        yearsList: Array.from(yearsSet),
      };

      break;
    }
  }

  return result;
};