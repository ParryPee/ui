import Heatmap, {
  type HeatmapData
} from "@/registry/8starlabs-ui/blocks/heatmap";

const sampleData: HeatmapData = [
  { date: "2025-11-24", value: 2 }, // monday
  { date: "2025-11-25", value: 4 },
  { date: "2025-11-26", value: 1 },
  { date: "2025-11-27", value: 3 },
  { date: "2025-11-28", value: 0 },
  { date: "2025-11-29", value: 5 },
  { date: "2025-11-30", value: 3 },

  { date: "2025-11-24", value: 2 }, // monday
  { date: "2025-11-25", value: 4 },
  { date: "2025-11-26", value: 1 },
  { date: "2025-11-27", value: 3 },
  { date: "2025-11-28", value: 0 },
  { date: "2025-11-29", value: 5 },
  { date: "2025-11-30", value: 3 },

  { date: "2025-12-01", value: 0 }, // monday
  { date: "2025-12-02", value: 2 },
  { date: "2025-12-03", value: 5 },
  { date: "2025-12-04", value: 1 },
  { date: "2025-12-05", value: 3 },
  { date: "2025-12-06", value: 0 },
  { date: "2025-12-07", value: 4 },

  { date: "2025-12-08", value: 2 },
  { date: "2025-12-09", value: 6 },
  { date: "2025-12-10", value: 1 },
  { date: "2025-12-11", value: 0 },
  { date: "2025-12-12", value: 5 },
  { date: "2025-12-13", value: 3 },
  { date: "2025-12-14", value: 4 },

  { date: "2025-12-15", value: 2 },
  { date: "2025-12-16", value: 1 },
  { date: "2025-12-17", value: 0 },
  { date: "2025-12-18", value: 3 },
  { date: "2025-12-19", value: 4 },
  { date: "2025-12-20", value: 2 },
  { date: "2025-12-21", value: 5 },

  { date: "2025-12-22", value: 0 },
  { date: "2025-12-23", value: 1 },
  { date: "2025-12-24", value: 2 },
  { date: "2025-12-25", value: 3 },
  { date: "2025-12-26", value: 4 },
  { date: "2025-12-27", value: 5 },
  { date: "2025-12-28", value: 6 }
];

export default function page() {
  return (
    <Heatmap
      data={sampleData}
      startDate={new Date("2025-12-01")}
      endDate={new Date("2025-12-28")}
      cellSize={15}
      gap={4}
      daysOfTheWeekSize={12}
      daysOfTheWeek={"single letter"}
    />
  );
}
