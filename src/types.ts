export type Exchange = {
  EUR: {
    code: string;
    value: number
  };
  USD: {
    code: string;
    value: number
  };
  UAH: {
    code: string;
    value: number
  };
}

export type Currency = 'UAH' | 'USD' | 'EUR'
