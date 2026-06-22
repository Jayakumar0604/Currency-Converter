import React, { useState } from "react";
import Card from "../common/Card";
import InputField from "../common/InputField";
import Dropdown from "../common/Dropdown";
import IconButton from "../common/IconButton";
import { currenciesList, getCurrencyMetadata } from "../../utils/currencyData";

const ConverterCard = ({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  loading,
  currentRate,
  setFromCurrency,
  setToCurrency,
  changeAmount,
  swapCurrencies,
}) => {
  const [spin, setSpin] = useState(false);

  const handleSwap = () => {
    setSpin(true);
    swapCurrencies();
    setTimeout(() => setSpin(false), 300);
  };

  const fromMeta = getCurrencyMetadata(fromCurrency);
  const toMeta = getCurrencyMetadata(toCurrency);

  // Quick selectors
  const popularCurrencies = ["USD", "EUR", "GBP", "INR", "JPY"];

  return (
    <Card className="w-full flex-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white shadow-lg shadow-indigo-500/20">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Convert Currency</h1>
          <p className="text-slate-400 text-xs mt-0.5">Real-time precise rates</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Amount Input */}
        <InputField
          id="amount"
          label="Amount to Convert"
          value={amount}
          onChange={(e) => changeAmount(e.target.value)}
          placeholder="Enter amount..."
          icon={fromMeta.symbol || "$"}
        />

        {/* Selectors Row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Dropdown
            id="from-currency"
            label="From"
            value={fromCurrency}
            onChange={setFromCurrency}
            options={currenciesList}
          />

          {/* Swap Button */}
          <div className="flex justify-center md:pt-6">
            <IconButton
              onClick={handleSwap}
              title="Swap Currencies"
              className={`rounded-full h-11 w-11 shadow-md shadow-slate-950/20 ${spin ? "rotate-180" : ""}`}
            >
              <svg
                className="h-5 w-5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </IconButton>
          </div>

          <Dropdown
            id="to-currency"
            label="To"
            value={toCurrency}
            onChange={setToCurrency}
            options={currenciesList}
          />
        </div>

        {/* Quick select buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mr-1">
            Quick Select Base:
          </span>
          {popularCurrencies.map((code) => {
            const meta = getCurrencyMetadata(code);
            const isSelected = fromCurrency === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setFromCurrency(code)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer
                  ${isSelected 
                    ? "bg-indigo-600/30 border-indigo-500 text-indigo-200" 
                    : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-650 hover:text-slate-200"
                  }
                `}
              >
                <span>{meta.flag}</span>
                <span>{code}</span>
              </button>
            );
          })}
        </div>

        {/* Result Area */}
        <div className="mt-8 p-5 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 backdrop-blur-md relative overflow-hidden">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none" />

          {loading ? (
            <div className="flex flex-col items-center py-4 space-y-2">
              <svg className="animate-spin h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-slate-400 text-sm">Fetching exchange rate...</span>
            </div>
          ) : (
            <div className="text-center md:text-left space-y-1">
              <p className="text-sm font-medium text-slate-400">
                {amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })} {fromMeta.name} =
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight break-all">
                {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 4 })} {toMeta.code}
              </h2>
              {currentRate && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-800/65 text-xs text-slate-400 font-mono">
                  <span>
                    1 {fromMeta.code} = {currentRate.toFixed(4)} {toMeta.code}
                  </span>
                  <span className="text-slate-500">
                    1 {toMeta.code} = {(1 / currentRate).toFixed(4)} {fromMeta.code}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ConverterCard;
