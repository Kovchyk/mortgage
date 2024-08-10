export interface IDataToCalculate {
  principal: number;
  annualInterestRate: number;
  additionalPayment: number;
  years: number;
}

export interface ILoanFormProps {
  getFormData: (data: IDataToCalculate) => void;
};

export interface ILoanChartProps {
  yearsList: IYearsListItem[];
};

export interface IYearsListItem {
  name: string;
  value: [string, number];
}

export interface IDataCalculated {
  principal: number;
  annualInterestRate: number;
  months: number;
  monthTaken: number;
  monthlyPayment: number;
  additionalPayment: number;
  totalPaid: number;
  yearsList: IYearsListItem[];
}

export type IDataToDisplay = {
  data: {
    principal: number;
    annualInterestRate: number;
    months: number;
    monthTaken: number;
    monthlyPayment: number;
    additionalPayment: number;
    totalPaid: number;
  } | null;
}