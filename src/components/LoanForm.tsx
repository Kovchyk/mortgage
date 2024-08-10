import { FC, useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ILoanFormProps } from '../types'

const LoanForm: FC<ILoanFormProps> = ({ getFormData }) => {
  const [data, setData] = useState({
    principal: 630000,
    annualInterestRate: 7.07,
    additionalPayment: 3150,
    years: 25,
  });

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

  const handleGetFormData = (event: React.FormEvent) => {
    event.preventDefault();
    getFormData(data);
  };

  return (
    <form onSubmit={handleGetFormData}>
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
        <Button type='submit' variant='default' onClick={handleGetFormData}>Расчитать</Button>
      </div>
    </form>
  );
};

export default LoanForm;