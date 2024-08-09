import { useState } from 'react';
import LoanChart from '@/components/LoanChart'
import LoanForm from '@/components/LoanForm'
import './App.css'

function App() {
  const [yearsList, setYearsList] = useState<any>([]);
  const [result, setResult] = useState('');

  return (
    <div className='h-full container my-2 lg:flex lg:space-x-4'>
      <div className='w-full lg:w-1/4 space-y-4'>
        <LoanForm setYearsList={setYearsList} setResult={setResult} />
        <div className='w-full text-justify'>
          {result}
        </div>
      </div>
      <div className='w-full h-full mt-4 lg:mt-0 lg:w-3/4'>
        {yearsList.length ? (
          <LoanChart yearsList={yearsList} />
        ) : (
          <div className='flex w-full h-full justify-center items-center'>Нажми "Расчитать"</div>
        )}
      </div>
    </div>
  )
}

export default App
