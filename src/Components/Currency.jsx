import React, { useEffect, useState } from "react";
import Back from "../assets/Currency.png";
import axios from "axios";

const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [fromc, setFromC] = useState("USD");
  const [toc, setToC] = useState("INR");
  const [cAmount, setCAmount] = useState(83.29);
  const [eRate, setERate] = useState(null);

  useEffect(() => {
    const getEx = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromc}`;
        const res = await axios.get(url);
        setERate(res.data.rates[toc])
      } catch (error) {
        console.log("Can't find it:", error);
      }
    };
    getEx()
  }, [fromc, toc]);

  useEffect(()=>{
    if(eRate !== null){
        setCAmount((amount * eRate).toFixed(2));
    }
  }, [amount, eRate])

  const changeA = (e)=>{
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : val);
  }

  const changeFC = (e) => {
    setFromC(e.target.value);
  }
  const changeTC = (e) => {
    setToC(e.target.value);
  }
  return (
    <div>
      <div className="bg-white w-80 p-3 rounded-md">
        <div
          style={{ backgroundImage: `url(${Back})` }}
          className="w-full h-[150px] bg-cover bg-center"
        ></div>
        <h1 className="text-[20px] font-bold mt-[10px] mb-[20px] text-center py-[10px] text-blue-600 border-y-2 border-stone-300 border-dashed">
          Currency Converter
        </h1>
        <div className="mb-1">
          <label htmlFor="amt" className="block mb-1 text-zinc-500">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={amount}
            id="amt"
            className="w-full p-[10px] border rounded-md mb-[10px] font-[18px] focus:border-sky-500 outline-none"
            onChange={changeA}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="from" className="block mb-1 text-zinc-500">
            From Currency:
          </label>
          <select
            id="from"
            value={fromc}
            onChange={changeFC}
            className="w-full p-[10px] border rounded-md mb-[10px] font-[18px] focus:border-sky-500 outline-none"
          >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="mb-1">
          <label htmlFor="to" className="block mb-1 text-zinc-500">
            To Currency:
          </label>
          <select
            id="to"
            value={toc}
            onChange={changeTC}
            className="w-full p-[10px] border rounded-md mb-[10px] font-[18px] focus:border-sky-500 outline-none"
          >
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>
        <div className="text-center border border-dashed my-[10px] border-sky-400">
          <p className="text-[15px] py-[10px] text-blue-500 font-bold">
            {amount} {fromc} is equal to {cAmount} {toc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Currency;
