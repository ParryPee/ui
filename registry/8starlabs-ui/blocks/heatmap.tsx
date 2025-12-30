import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/registry/8starlabs-ui/ui/tooltip";
import { HTMLAttributes, ReactNode } from "react";

export type HeatmapValue = {
  date: string; // YYYY-MM-DD
  value: number;
};

export type HeatmapData = HeatmapValue[];

interface HeatmapProps extends HTMLAttributes<HTMLDivElement> {
  data: HeatmapData;
  startDate: Date;
  endDate: Date;
  cellSize?: number;
  gap?: number;
  daysOfTheWeek?: "all" | "MWF" | "none" | "single letter";
  daysOfTheWeekSize?: number;
  displayStyle?: "squares" | "bubbles";
  dateDisplayFunction?: (date: Date) => ReactNode;
  valueDisplayFunction?: (value: number) => ReactNode;
  customColorMap?: (value: number, max: number, colorCount: number) => number;
  colorScale?: string[];
  maxColor?: string;
  zeroValueColor?: string;
}

function getAllDays(start: Date, end: Date): Date[] {
  // Generate all dates between start and end, inclusive
  const days = [];
  const curr = new Date(start);
  while (curr <= end) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return days;
}

function padToWeekStart(days: Date[]): (Date | null)[] {
  // Pad the beginning of the array with nulls so that the first day starts on the correct weekday
  // eg. if the first day is a Wednesday, add three nulls for Sun, Mon, Tue
  const firstDay = days[0].getDay(); // 0 = Sunday
  const padding = new Array(firstDay).fill(null);
  return [...padding, ...days];
}

function chunkByWeek(days: (Date | null)[]): (Date | null)[][] {
  // Chunk the days into weeks (arrays of 7 days)
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function getMonthLabel(week: (Date | null)[]) {
  // Get the month label for the week (based on the LAST day)
  const lastDay = week.slice().reverse().find(Boolean);
  return lastDay ? lastDay.toLocaleString("default", { month: "short" }) : null;
}

function defaultColourMap(value: number, max: number, colorCount: number) {
  // Map value to color index
  // default: we do a linear scale from 0 to max
  if (colorCount <= 0) return 0; // safeguard
  if (max <= 0 || value <= 0) return 0; // all zero values
  const index = Math.ceil((value / max) * (colorCount - 1));
  return Math.min(Math.max(index, 0), colorCount - 1);
}

function interpolateColor(
  value: number,
  max: number,
  maxColor: string,
  zeroValueColor: string
): string {
  // Interpolate color from transparent to maxColor based on value/max
  if (value <= 0) return zeroValueColor;
  const ratio = Math.min(value / max, 1);

  // Convert hex maxColor to RGB
  const r = parseInt(maxColor.slice(1, 3), 16);
  const g = parseInt(maxColor.slice(3, 5), 16);
  const b = parseInt(maxColor.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${ratio})`;
}

const defaultIntensityColours = [
  "#f0fdf4", // green-50
  "#bbf7d0", // green-200
  "#86efac", // green-300
  "#22c55e", // green-500
  "#166534" // green-700
];

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DaysOfTheWeekIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  daysOfTheWeekOption: "all" | "MWF" | "none" | "single letter";
  daysOfTheWeekSize: number;
  cellSize: number;
  gap: number;
}

function DaysOfTheWeekIndicator({
  daysOfTheWeekOption,
  daysOfTheWeekSize,
  cellSize,
  gap,
  style
}: DaysOfTheWeekIndicatorProps) {
  if (daysOfTheWeekOption === "none") return null;
  const indicators = daysOfTheWeek.map((day, i) => {
    if (daysOfTheWeekOption === "MWF" && ![1, 3, 5].includes(i)) {
      return <div key={i} style={{ height: cellSize }} />;
    }
    return (
      <div
        key={i}
        className="flex items-center text-muted-foreground"
        style={{
          height: cellSize,
          fontSize: daysOfTheWeekSize,
          lineHeight: `${cellSize}px`
        }}
      >
        {daysOfTheWeekOption === "single letter" ? day.charAt(0) : day}
      </div>
    );
  });
  return (
    <div className="flex flex-col" style={{ ...style, gap }}>
      {indicators}
    </div>
  );
}

function ValueIndicator({
  cellSize,
  displayStyle,
  value,
  maxValue,
  color
}: {
  cellSize: number;
  displayStyle: "squares" | "bubbles";
  value: number; // current cell value
  maxValue: number; // maximum possible value out of all cells
  color: string;
}) {
  let finalSize = cellSize;

  if (displayStyle === "bubbles") {
    // Min bubble size = 0.3 * size, Max bubble size = size
    const minScale = 0.3;
    const scale = value / maxValue;
    finalSize = cellSize * (minScale + (1 - minScale) * scale);
  }

  return displayStyle === "bubbles" ? (
    <div
      className="flex items-center justify-center"
      style={{ width: cellSize, height: cellSize }}
    >
      <div
        className="transition-colors rounded-full"
        style={{ width: finalSize, height: finalSize, backgroundColor: color }}
      />
    </div>
  ) : (
    <div
      className="transition-colors rounded-md"
      style={{
        width: cellSize,
        height: cellSize,
        borderRadius: 4,
        backgroundColor: color
      }}
    />
  );
}

export default function Heatmap({
  data,
  startDate,
  endDate,
  cellSize = 20,
  daysOfTheWeek = "MWF",
  daysOfTheWeekSize = 20,
  gap = 2,
  displayStyle = "squares",
  valueDisplayFunction,
  dateDisplayFunction,
  customColorMap,
  className,
  colorScale,
  maxColor,
  zeroValueColor = "#a6a6a6",
  ...props
}: HeatmapProps) {
  const valueByDate = new Map<string, number>(
    data.map(({ date, value }) => [date, value])
  );

  const days = getAllDays(startDate, endDate);
  const paddedDays = padToWeekStart(days);
  const weeks = chunkByWeek(paddedDays);

  const computedMax = Math.max(...data.map((d) => d.value), 1);

  const monthLabels = weeks.map((week, i) => {
    const label = getMonthLabel(week);
    const prevLabel = i > 0 ? getMonthLabel(weeks[i - 1]) : null;
    return label !== prevLabel ? label : null;
  });

  // if the user specified a maxColor, we use interpolate mode.
  // this means we interpolate from transparent to maxColor based on value/max
  // otherwise we use discrete mode with the colorScale or default colors
  // so if the user specified both maxColor and colorScale, maxColor takes precedence
  const mode = maxColor ? "interpolate" : "discrete";

  const colorArray = colorScale ?? defaultIntensityColours;

  const colorMap = customColorMap || defaultColourMap;

  return (
    <div className={cn("flex", className)} style={{ gap }} {...props}>
      <DaysOfTheWeekIndicator
        style={{ paddingTop: `${gap + 16}px` }}
        daysOfTheWeekOption={daysOfTheWeek}
        daysOfTheWeekSize={daysOfTheWeekSize}
        cellSize={cellSize}
        gap={gap}
      />

      <div className="flex flex-col" style={{ gap }}>
        <div className="flex" style={{ gap }}>
          {weeks.map((_, i) => (
            <div
              key={i}
              style={{ width: cellSize }}
              className="text-xs text-muted-foreground"
            >
              {monthLabels[i]}
            </div>
          ))}
        </div>

        <div className="flex" style={{ gap }}>
          <TooltipProvider>
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col" style={{ gap }}>
                {week.map((day, j) => {
                  if (!day)
                    return (
                      <div
                        key={j}
                        style={{ width: cellSize, height: cellSize }}
                      />
                    );

                  const dateKey = day.toISOString().slice(0, 10);
                  const thisDateValue = valueByDate.get(dateKey) ?? 0;

                  let thisColor: string;
                  if (mode === "interpolate" && maxColor) {
                    thisColor = interpolateColor(
                      thisDateValue,
                      computedMax,
                      maxColor,
                      zeroValueColor
                    );
                  } else {
                    const thisColorLevel = colorMap(
                      thisDateValue,
                      computedMax,
                      colorArray.length
                    );
                    thisColor = colorArray[thisColorLevel];
                  }

                  return (
                    <Tooltip key={j}>
                      <TooltipTrigger asChild>
                        <ValueIndicator
                          cellSize={cellSize}
                          displayStyle={displayStyle}
                          value={thisDateValue}
                          maxValue={computedMax}
                          color={thisColor}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <div>
                            {dateDisplayFunction
                              ? dateDisplayFunction(day)
                              : day.toDateString()}
                          </div>
                          <div className="text-muted-foreground">
                            {valueDisplayFunction
                              ? valueDisplayFunction(thisDateValue)
                              : `${thisDateValue} event${thisDateValue !== 1 ? "s" : ""}`}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
