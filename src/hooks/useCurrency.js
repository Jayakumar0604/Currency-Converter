import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useCurrency = (initialAmount = 1, initialFrom = "USD", initialTo = "INR") => {
  const [amount, setAmount] = useState(initialAmount);
  const [fromCurrency, setFromCurrency] = useState(initialFrom);
  const [toCurrency, setToCurrency] = useState(initialTo);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In-memory cache to save exchange rates for each base currency
  // Format: { [baseCurrency]: { [targetCurrency]: rate, ... } }
  const ratesCache = useRef({});

  // Fetch rates whenever the base currency (fromCurrency) changes
  useEffect(() => {
    const fetchRates = async () => {
      // If we already have rates for this base currency in our cache, use them
      if (ratesCache.current[fromCurrency]) {
        setRates(ratesCache.current[fromCurrency]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const res = await axios.get(url);
        
        if (res.data && res.data.rates) {
          // Store in cache
          ratesCache.current[fromCurrency] = res.data.rates;
          setRates(res.data.rates);
        } else {
          throw new Error("Invalid response format from API");
        }
      } catch (err) {
        console.error(`Error fetching exchange rates for ${fromCurrency}:`, err);
        setError("Failed to fetch current exchange rates. Please check your network connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  // Recalculate converted amount when amount, target currency, or rates change
  useEffect(() => {
    if (rates && rates[toCurrency] !== undefined) {
      const rate = rates[toCurrency];
      setConvertedAmount(Number((amount * rate).toFixed(4)));
    } else if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
    } else {
      setConvertedAmount(0);
    }
  }, [amount, toCurrency, rates, fromCurrency]);

  const changeAmount = (newAmount) => {
    const parsed = parseFloat(newAmount);
    setAmount(isNaN(parsed) || parsed < 0 ? 0 : parsed);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Get exchange rate between active pair
  const currentRate = rates ? rates[toCurrency] || null : null;

  return {
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
  };
};
