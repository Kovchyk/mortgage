import { useState } from 'react';
import LoanChart from '@/components/LoanChart'
import LoanForm from '@/components/LoanForm'
import LoanResult from '@/components/LoanResult'
import { IDataToCalculate, IDataCalculated } from './types'
import { calculate } from './utils'
import './App.css'

function App() {
  const [result, setResult] = useState<IDataCalculated | null>(null);

  const getFormData = (data: IDataToCalculate) => {
    setResult(calculate(data));
  };

  return (
    <div className='h-full container my-2 lg:flex lg:space-x-4'>
      <div className='w-full lg:w-1/4 space-y-4'>
        <LoanForm getFormData={getFormData} />
        <div className='w-full text-justify'>
          <LoanResult data={result} />
        </div>
      </div>
      <div className='w-full h-full mt-4 lg:mt-0 lg:w-3/4'>
        {result?.yearsList.length ? (
          <LoanChart yearsList={result.yearsList} />
        ) : (
          <div className='flex w-full h-full justify-center items-center'>Нажми "Расчитать"</div>
        )}
      </div>
    </div>
  )
}

export default App
