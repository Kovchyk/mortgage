import { FC, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LoanForm: FC<any> = ({ setYearsList, setResult }) => {
  const [data, setData] = useState({
    principal: 630000,
    annualInterestRate: 7.07,
    additionalPayment: 3150,
    years: 25,
  });

  const round = (number: number, sign=2) => {
    return parseFloat(number.toFixed(sign));
  };

  const changeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prevState) => {
      return {
        ...prevState,
        [name]: Number(value),
      };
    });
  };

  const countMounthlyPayment = (totalAmount: number, months: number, interest: number): number => {
    const rate = interest / 100 / 12;

    const ratePowerOfMonth = round(Math.pow(1 + rate, months));

    return round((totalAmount * rate * ratePowerOfMonth) / (ratePowerOfMonth - 1));
  };

  const calculate = (event?: React.FormEvent) => {
    event?.preventDefault();

    const principal = data.principal;
    const annualInterestRate = data.annualInterestRate;
    const additionalPayment = data.additionalPayment;
    const months = data.years * 12;

    let remainingPrincipal = principal;
    let totalPaid = 0;
    const monthlyPayment = countMounthlyPayment(principal, months, annualInterestRate); // Calculated initial monthly payment
    
    let result = '';
    const yearsSet: Set<any> = new Set();
    let now = new Date();

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
        result =
          `При сумме кредита ${principal} под ${annualInterestRate}% годовых на ${months} месяцев обязательный ежемесячный платеж составит ${monthlyPayment}.
          При дополнительном платеже на "тело" кредита ${additionalPayment}, кредит будет выплачен примерно за ${(month / 12).toFixed(1).split('.')[0]}
          лет/года и ${(month / 12).toFixed(1).split('.')[1]} месяца(ев).
          Общий ежемесячный платеж составит ${monthlyPayment + additionalPayment}. Всего будет выплачено ${totalPaid.toFixed(2)}
          c переплатой ${round(round(totalPaid) - principal) }.`;
        break;
      }
    }

    setResult(result);
    setYearsList(Array.from(yearsSet));
  };

  return (
    <form onSubmit={calculate}>
      <div className='mb-4'>
        <Label htmlFor='principal'>Сумма кредита</Label>
        <Input id='principal' name='principal' type='number' onChange={changeData} value={data.principal} />
      </div>
      <div className='mb-4'>
        <Label htmlFor='annualInterestRate'>Процентная ставка</Label>
        <Input id='annualInterestRate' name='annualInterestRate' type='number' onChange={changeData} value={data.annualInterestRate} />
      </div>
      <div className='mb-4'>
        <Label htmlFor='years'>Период в годах</Label>
        <Input id='years' name='years' type='number' onChange={changeData} value={data.years} />
      </div>
      <div className='mb-4'>
        <Label htmlFor='additionalPayment'>Буду платить сверх обязательного платежа</Label>
        <Input id='additionalPayment' name='additionalPayment' type='number' onChange={changeData} value={data.additionalPayment} />
      </div>
      <div className='flex justify-center'>
        <Button type='submit' variant='default' onClick={calculate}>Расчитать</Button>
      </div>
    </form>
  );
};

export default LoanForm;