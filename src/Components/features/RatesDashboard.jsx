import React from "react";
import Card from "../common/Card";
import { currenciesList, getCurrencyMetadata } from "../../utils/currencyData";

const RatesDashboard = ({ fromCurrency, amount, rates, loading }) => {
  // List of major reference currencies we want to show on the dashboard
  const referenceCurrencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CNY", "ZAR", "BRL"];
  
  // Filter out the active "from" currency to prevent redundant 1:1 display
  const displayCurrencies = referenceCurrencies.filter((code) => code !== fromCurrency);

  return (
    <Card title="Rates Dashboard" className="w-full">
      <p className="text-slate-400 text-xs -mt-3 mb-6">
        Equivalent values of <span className="font-semibold text-slate-200">{amount} {fromCurrency}</span> in other major currencies.
      </p>

      {loading || !rates || Object.keys(rates).length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayCurrencies.map((code) => (
            <div
              key={code}
              className="h-20 animate-pulse rounded-xl bg-slate-800/40 border border-slate-700/30 p-4"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayCurrencies.map((code) => {
            const meta = getCurrencyMetadata(code);
            const rate = rates[code];
            const converted = rate !== undefined ? amount * rate : null;

            return (
              <div
                key={code}
                className="group relative overflow-hidden rounded-xl border border-slate-850 bg-slate-950/20 p-4 transition-all duration-200 hover:border-slate-700/60 hover:bg-slate-950/40"
              >
                {/* Visual hover background subtle indicator */}
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500/0 transition-all group-hover:bg-indigo-500/80" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl select-none" role="img" aria-label={meta.name}>
                      {meta.flag}
                    </span>
                    <div>
                      <span className="font-bold text-white text-sm">{meta.code}</span>
                      <span className="text-slate-500 text-[10px] block truncate max-w-[100px]">
                        {meta.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {converted !== null ? (
                      <>
                        <span className="font-bold text-slate-200 block text-sm">
                          {meta.symbol}
                          {converted.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-slate-500 text-[10px] font-mono block">
                          Rate: {rate.toFixed(4)}
                        </span>
                      </>
                    ) : (
                      <span className="text-slate-500 text-xs font-semibold">Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default RatesDashboard;
