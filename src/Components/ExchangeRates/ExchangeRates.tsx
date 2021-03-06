import React, { useEffect, useState} from 'react'
import "./ExchangeRates.scss"
import {request} from "../../api/api";
import {Currency, Exchange} from "../../types";


const ExchangeRates: React.FC = () => {
  const [exchange, setExchange] = useState<Exchange>({ EUR: 0, USD: 0, UAH: 1})
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(1);

  const [fromCurrency, setFromCurrency] = useState<Currency>("UAH");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");



  const convertFromTo = () => {
    const fromRate = exchange[fromCurrency];
    const valueInUAH = fromValue / fromRate;
    const toRate = exchange[toCurrency];
    setToValue(valueInUAH * toRate);
  };

  const convertToFrom = () => {
    const toRate = exchange[toCurrency];
    const valueInUAH = toValue / toRate;
    const fromRate = exchange[fromCurrency];
    setFromValue(valueInUAH * fromRate);
  };

  useEffect(() => {
    (async () => {
      const currentExchange = await request();
      console.log()

      setExchange(currentExchange.conversion_rates)
    })();
  }, [])

  useEffect(() => {
    convertFromTo();
  }, [fromValue, toCurrency]);

  useEffect(() => {
    convertToFrom();
  }, [toValue, fromCurrency]);


  const handleFromCurrencyChange = (e: React.FormEvent<HTMLSelectElement>) => {
    // @ts-ignore
    setFromCurrency(e.currentTarget.value);
  };

  const handleToCurrencyChange = (e: React.FormEvent<HTMLSelectElement>) => {
    // @ts-ignore
    setToCurrency(e.currentTarget.value);
  };

  const handleFromValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFromValue(parseFloat(e.currentTarget.value));
  };

  const handleToValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setToValue(parseFloat(e.currentTarget.value));
  };

  return (
    <>
      <header className="header">
        <h1 className="title">
          Поточний курс гривні
        </h1>
        <div className="header__exchange">
          <div className='cell'>
            {`EUR ${+(exchange.UAH / exchange.EUR).toFixed(2)}`}
          </div>
          <div className='cell'>
            {`USD ${+(exchange.UAH / exchange.USD).toFixed(2)}`}
          </div>
        </div>
      </header>
      <main className="main">
        <form className="exchange">
          <div className="exchange__from">
            <input
              type="number"
              className="exchange__input"
              value={+fromValue.toFixed(2)}
              onChange={handleFromValueChange}
              min={0}
            />
            <select
              className="exchange__select"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
            >
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="exchange__to">
            <input
              className="exchange__input"
              type="number"
              value={+toValue.toFixed(2)}
              onChange={handleToValueChange}
              min={0}
            />
            <select
              className="exchange__select"
              value={toCurrency}
              onChange={handleToCurrencyChange}
            >
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </form>
      </main>
    </>
  )
}

export default ExchangeRates;
