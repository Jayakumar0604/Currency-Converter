import React from 'react'
import { useCurrency } from './hooks/useCurrency'
import ConverterCard from './components/features/ConverterCard'
import RatesDashboard from './components/features/RatesDashboard'
import TrendChart from './components/features/TrendChart'

const App = () => {
  const {
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    rates,
    loading,
    error,
    currentRate,
    setFromCurrency,
    setToCurrency,
    changeAmount,
    swapCurrencies,
  } = useCurrency(1, "USD", "INR");

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-x-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <main className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center space-y-8 relative z-10">
        {/* App Branding */}
        <header className="text-center space-y-2 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-950/30 text-indigo-300 text-[10px] font-semibold uppercase tracking-wider mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Market Rates
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Globex<span className="text-indigo-400">Exchange</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto">
            Convert currencies instantly with client-cached rates, custom selects, and interactive rate trend graphs.
          </p>
        </header>

        {error && (
          <div className="w-full max-w-3xl mx-auto rounded-xl border border-rose-500/20 bg-rose-950/20 p-4 text-center text-xs font-semibold text-rose-300">
            ⚠️ {error}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <ConverterCard
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            convertedAmount={convertedAmount}
            loading={loading}
            currentRate={currentRate}
            setFromCurrency={setFromCurrency}
            setToCurrency={setToCurrency}
            changeAmount={changeAmount}
            swapCurrencies={swapCurrencies}
          />

          <TrendChart
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currentRate={currentRate}
            loading={loading}
          />
        </div>

        {/* Rates Reference Grid */}
        <RatesDashboard
          fromCurrency={fromCurrency}
          amount={amount}
          rates={rates}
          loading={loading}
        />
      </main>

      {/* Styled Footer */}
      <footer className="mt-16 text-center text-[10px] text-slate-600 border-t border-slate-900/60 pt-6">
        <p>GlobexExchange © {new Date().getFullYear()} — High performance React dashboard</p>
      </footer>
    </div>
  )
}

export default App