import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/registry/8starlabs-ui/ui/tooltip";

export type HeatmapValue = {
  date: string; // YYYY-MM-DD
  value: number;
};

export type HeatmapData = HeatmapValue[];

interface HeatmapProps {
  data: HeatmapData;
  startDate: Date;
  endDate: Date;
  maxValue?: number; // optional override
  cellSize?: number;
  gap?: number;
  daysOfTheWeek?: "all" | "MWF" | "none" | "single letter";
  daysOfTheWeekSize?: number;
}

function getAllDays(start: Date, end: Date): Date[] {
  const days = [];
  const curr = new Date(start);
  while (curr <= end) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }
  return days;
}

function padToWeekStart(days: Date[]): (Date | null)[] {
  const firstDay = days[0].getDay(); // 0 = Sunday
  const padding = new Array(firstDay).fill(null);
  return [...padding, ...days];
}

function chunkByWeek(days: (Date | null)[]): (Date | null)[][] {
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function getIntensity(value: number, max: number) {
  if (value === 0) return 0;
  if (value < max * 0.25) return 1;
  if (value < max * 0.5) return 2;
  if (value < max * 0.75) return 3;
  return 4;
}

const intensityClass = [
  "bg-muted",
  "bg-green-200",
  "bg-green-300",
  "bg-green-500",
  "bg-green-700"
];

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function DaysIndicator({
  daysOfTheWeekOption,
  daysOfTheWeekSize,
  cellSize,
  gap
}: {
  daysOfTheWeekOption: "all" | "MWF" | "none" | "single letter";
  daysOfTheWeekSize: number;
  cellSize: number;
  gap: number;
}) {
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
    <div className="flex flex-col" style={{ gap }}>
      {indicators}
    </div>
  );
}

export default function Heatmap({
  data,
  startDate,
  endDate,
  maxValue,
  cellSize = 20,
  daysOfTheWeek = "MWF",
  daysOfTheWeekSize = 20,
  gap = 2
}: HeatmapProps) {
  const valueByDate = new Map<string, number>(
    data.map(({ date, value }) => [date, value])
  );

  const days = getAllDays(startDate, endDate);
  const paddedDays = padToWeekStart(days);
  const weeks = chunkByWeek(paddedDays);

  const computedMax = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <TooltipProvider>
      <div className="flex" style={{ gap }}>
        <DaysIndicator
          daysOfTheWeekOption={daysOfTheWeek}
          daysOfTheWeekSize={daysOfTheWeekSize}
          cellSize={cellSize}
          gap={gap}
        />

        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col" style={{ gap }}>
            {week.map((day, j) => {
              if (!day)
                return (
                  <div key={j} style={{ width: cellSize, height: cellSize }} />
                );

              const dateKey = day.toISOString().slice(0, 10);
              const value = valueByDate.get(dateKey) ?? 0;
              const level = getIntensity(value, computedMax);

              return (
                <Tooltip key={j}>
                  <TooltipTrigger asChild>
                    <div
                      className={`transition-colors ${intensityClass[level]}`}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: 4
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      <div>{day.toDateString()}</div>
                      <div className="text-muted-foreground">
                        {value} contributions
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
}
