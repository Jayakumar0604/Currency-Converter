import React from "react";

const Card = ({ children, className = "", title, hoverEffect = false }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border border-slate-700/50 
        bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 text-white shadow-2xl
        transition-all duration-300 ease-out
        ${hoverEffect ? "hover:border-indigo-500/50 hover:shadow-indigo-500/10 hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {/* Dynamic background glowing blob */}
      <div className="absolute -right-16 -top-16 -z-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-300" />
      <div className="absolute -left-16 -bottom-16 -z-10 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl transition-all duration-300" />

      {title && (
        <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
