import React from "react";

const IconButton = ({
  children,
  onClick,
  className = "",
  title = "",
  disabled = false,
  loading = false,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      aria-label={title}
      className={`
        flex items-center justify-center rounded-xl p-3 text-slate-300 bg-slate-800/80 
        border border-slate-700/60 transition-all duration-200 cursor-pointer
        hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-slate-800
        active:scale-95 disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default IconButton;
