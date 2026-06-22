import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({
  id,
  label,
  value,
  onChange,
  options = [],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Reset search filter when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.code === value) || {
    code: value,
    name: value,
    flag: "🌐",
    symbol: "",
  };

  const filteredOptions = options.filter(
    (opt) =>
      opt.code.toLowerCase().includes(search.toLowerCase()) ||
      opt.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex flex-col gap-2 relative ${className}`} ref={dropdownRef}>
      {label && (
        <span className="text-xs font-semibold tracking-wide uppercase text-slate-400">
          {label}
        </span>
      )}
      
      {/* Selected Value Box Trigger */}
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-full rounded-xl border border-slate-700/60 
          bg-slate-950/40 p-3.5 text-left outline-none transition-all duration-200 cursor-pointer
          hover:border-slate-550 focus:border-indigo-500 focus:bg-slate-950/60 focus:ring-4 focus:ring-indigo-500/10
          ${isOpen ? "border-indigo-500 bg-slate-950/60 ring-4 ring-indigo-500/10" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl select-none" role="img" aria-label={selectedOption.name}>
            {selectedOption.flag}
          </span>
          <div>
            <span className="text-white font-semibold text-lg">{selectedOption.code}</span>
            <span className="text-slate-400 text-xs block truncate max-w-[140px] md:max-w-[200px]">
              {selectedOption.name}
            </span>
          </div>
        </div>
        
        {/* Caret Icon */}
        <svg
          className={`h-5 w-5 text-slate-400 transition-transform duration-250 ${isOpen ? "rotate-180 text-indigo-400" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Options List Card */}
      {isOpen && (
        <div className="absolute top-[102%] left-0 w-full rounded-xl border border-slate-700 bg-slate-900 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Search Box */}
          <div className="p-3 border-b border-slate-800 flex items-center gap-2 bg-slate-950/30">
            <svg
              className="h-4 w-4 text-slate-500 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm font-medium text-white placeholder-slate-500 bg-transparent outline-none"
              autoFocus
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-slate-500 hover:text-slate-300 font-bold px-1"
              >
                ✕
              </button>
            )}
          </div>

          {/* Options Scroll Container */}
          <ul className="max-h-60 overflow-y-auto divide-y divide-slate-800/40 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li key={opt.code}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.code);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-150 cursor-pointer
                      ${opt.code === value ? "bg-indigo-600/35 text-indigo-200" : "text-slate-300 hover:bg-slate-800 hover:text-white"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl select-none" role="img" aria-label={opt.name}>
                        {opt.flag}
                      </span>
                      <div>
                        <span className="font-semibold text-white">{opt.code}</span>
                        <span className="text-xs text-slate-400 block truncate max-w-[180px]">
                          {opt.name}
                        </span>
                      </div>
                    </div>
                    {opt.symbol && (
                      <span className="text-xs font-mono font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        {opt.symbol}
                      </span>
                    )}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-6 text-center text-sm text-slate-500">
                No currencies found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
