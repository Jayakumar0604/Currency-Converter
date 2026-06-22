import React from "react";

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder = "0.00",
  icon,
  min = 0,
  className = "",
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-semibold tracking-wide uppercase text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-4 text-slate-500 font-medium text-lg pointer-events-none select-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type="number"
          value={value === 0 ? "" : value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          className={`
            w-full rounded-xl border border-slate-700/60 bg-slate-950/40 py-3.5 outline-none
            text-white font-medium text-lg placeholder-slate-600 transition-all duration-200
            focus:border-indigo-500 focus:bg-slate-950/60 focus:ring-4 focus:ring-indigo-500/10
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            ${icon ? "pl-11 pr-4" : "px-4"}
          `}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;
