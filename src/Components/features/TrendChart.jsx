import React, { useState, useMemo } from "react";
import Card from "../common/Card";
import { getCurrencyMetadata } from "../../utils/currencyData";

const TrendChart = ({ fromCurrency, toCurrency, currentRate, loading }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Generate 7 days of deterministic rate fluctuations based on active currency pair and current rate
  const chartData = useMemo(() => {
    if (!currentRate) return [];

    const seedString = `${fromCurrency}-${toCurrency}-${new Date().toDateString()}`;
    
    // Hash function to get a seed from currency codes and date
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const pseudoRandom = (index) => {
      const x = Math.sin(hash + index) * 10000;
      return x - Math.floor(x);
    };

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const points = [];

    for (let i = 0; i < 7; i++) {
      const rand = pseudoRandom(i); // 0 to 1
      // Fluctuation ranges from -1.8% to +1.8% to simulate realistic trends
      const fluctuation = (rand - 0.5) * 0.036;
      const rateVal = currentRate * (1 + fluctuation);
      points.push({
        day: days[i],
        rate: Number(rateVal.toFixed(4)),
      });
    }
    return points;
  }, [fromCurrency, toCurrency, currentRate]);

  const fromMeta = getCurrencyMetadata(fromCurrency);
  const toMeta = getCurrencyMetadata(toCurrency);

  // Calculate SVG layout dimensions
  const svgWidth = 600;
  const svgHeight = 240;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  // Calculate points coordinates
  const svgPoints = useMemo(() => {
    if (chartData.length === 0) return [];

    const rates = chartData.map((d) => d.rate);
    const minRate = Math.min(...rates);
    const maxRate = Math.max(...rates);
    const range = maxRate - minRate || 1;

    // Add padding to chart Y-bounds so the line has spacing at top/bottom
    const minBound = minRate - range * 0.15;
    const maxBound = maxRate + range * 0.15;
    const boundRange = maxBound - minBound;

    return chartData.map((data, index) => {
      const x = paddingLeft + (index / 6) * chartWidth;
      const y = paddingTop + chartHeight - ((data.rate - minBound) / boundRange) * chartHeight;
      return { x, y, ...data };
    });
  }, [chartData, chartWidth, chartHeight]);

  // Construct SVG Path strings
  const { linePath, areaPath } = useMemo(() => {
    if (svgPoints.length === 0) return { linePath: "", areaPath: "" };

    // Create line path points
    const lineCoords = svgPoints.map((pt) => `${pt.x},${pt.y}`).join(" L ");
    const linePath = `M ${lineCoords}`;

    // Create gradient fill area path by closing the path to the bottom boundary
    const firstPt = svgPoints[0];
    const lastPt = svgPoints[svgPoints.length - 1];
    const bottomY = svgHeight - paddingBottom;
    const areaPath = `M ${firstPt.x},${bottomY} L ${firstPt.x},${firstPt.y} L ${lineCoords} L ${lastPt.x},${bottomY} Z`;

    return { linePath, areaPath };
  }, [svgPoints, svgHeight, paddingBottom]);

  // High/Low statistics
  const stats = useMemo(() => {
    if (chartData.length === 0) return { min: 0, max: 0, avg: 0 };
    const rates = chartData.map((d) => d.rate);
    const min = Math.min(...rates);
    const max = Math.max(...rates);
    const avg = rates.reduce((sum, r) => sum + r, 0) / rates.length;
    return { min, max, avg };
  }, [chartData]);

  if (loading || !currentRate || svgPoints.length === 0) {
    return (
      <Card title="7-Day Rate Trend" className="w-full flex-1 min-h-[350px] flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center space-y-3 py-16">
          <svg className="animate-spin h-7 w-7 text-indigo-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-slate-400 text-sm">Formatting trend metrics...</span>
        </div>
      </Card>
    );
  }

  const activeHoverPoint = hoveredIndex !== null ? svgPoints[hoveredIndex] : null;

  return (
    <Card title={`7-Day Exchange Trend: ${fromCurrency} / ${toCurrency}`} className="w-full flex-1 flex flex-col justify-between">
      <div className="text-slate-400 text-xs -mt-3 mb-4 flex flex-wrap gap-x-6 gap-y-1">
        <span>Base rate: <span className="font-semibold text-slate-200">1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}</span></span>
        <span>Deterministic daily deviation</span>
      </div>

      {/* SVG Plot Wrapper */}
      <div className="relative w-full flex-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          {/* Definitions for Gradients and Animations */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal helper grid) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = paddingTop + ratio * chartHeight;
            return (
              <line
                key={index}
                x1={paddingLeft}
                y1={y}
                x2={svgWidth - paddingRight}
                y2={y}
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="opacity-50"
              />
            );
          })}

          {/* X-Axis labels (Days of week) */}
          {svgPoints.map((pt, idx) => (
            <text
              key={idx}
              x={pt.x}
              y={svgHeight - paddingBottom + 20}
              textAnchor="middle"
              className="fill-slate-500 font-mono text-[10px]"
            >
              {pt.day}
            </text>
          ))}

          {/* Y-Axis scale indicators */}
          {[0, 0.5, 1].map((ratio, idx) => {
            const y = paddingTop + ratio * chartHeight;
            const rates = chartData.map((d) => d.rate);
            const minBound = stats.min - (stats.max - stats.min) * 0.15;
            const maxBound = stats.max + (stats.max - stats.min) * 0.15;
            const val = maxBound - ratio * (maxBound - minBound);
            return (
              <text
                key={idx}
                x={paddingLeft - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-500 font-mono text-[10px]"
              >
                {val.toFixed(4)}
              </text>
            );
          })}

          {/* Shaded Area fill under the line path */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Solid line path (stroke-dash-drawn animation triggers on paint) */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            className="stroke-indigo-500 animate-draw-line"
          />

          {/* Interactive Hover guideline */}
          {activeHoverPoint && (
            <line
              x1={activeHoverPoint.x}
              y1={paddingTop}
              x2={activeHoverPoint.x}
              y2={svgHeight - paddingBottom}
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
          )}

          {/* Chart Nodes (Interactive circles) */}
          {svgPoints.map((pt, idx) => (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r={hoveredIndex === idx ? "7" : "4.5"}
              className={`
                transition-all duration-150 cursor-pointer
                ${hoveredIndex === idx ? "fill-white stroke-indigo-500 stroke-[3]" : "fill-slate-900 stroke-indigo-400 stroke-[2]"}
              `}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </svg>

        {/* Floating Tooltip Component */}
        {activeHoverPoint && (
          <div
            className="absolute bg-slate-950 border border-slate-700/60 p-2.5 rounded-lg shadow-xl pointer-events-none z-10 transition-all duration-75 text-xs text-left"
            style={{
              left: `${(activeHoverPoint.x / svgWidth) * 100}%`,
              top: `${(activeHoverPoint.y / svgHeight) * 100 - 30}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="font-semibold text-slate-300 font-mono">{activeHoverPoint.day}</p>
            <p className="font-bold text-white mt-0.5">
              1 {fromCurrency} = <span className="text-indigo-400">{activeHoverPoint.rate.toFixed(4)}</span> {toCurrency}
            </p>
          </div>
        )}
      </div>

      {/* Statistics dashboard summary row */}
      <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800 text-center font-mono">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-semibold">Low Rate</span>
          <span className="text-xs text-rose-400 font-bold mt-0.5 block">{stats.min.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-semibold">Average Rate</span>
          <span className="text-xs text-slate-300 font-bold mt-0.5 block">{stats.avg.toFixed(4)}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-semibold">High Rate</span>
          <span className="text-xs text-emerald-400 font-bold mt-0.5 block">{stats.max.toFixed(4)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TrendChart;
