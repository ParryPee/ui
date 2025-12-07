"use client";

import React, {
  createContext,
  useContext,
  Children,
  cloneElement,
  type ReactElement
} from "react";
import type { TimelineContextType, TimelineItem } from "./timelineTypes";

const TimelineContext = createContext<TimelineContextType | null>(null);

function useTimelineContext() {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error(
      "useTimelineContext must be used within a TimelineProvider"
    );
  }
  return context;
}

export function TimelineClient({
  config,
  children
}: {
  config: TimelineContextType;
  children: ReactElement<TimelineItem>[];
}) {
  const { title, titleColor, titleSize, itemSpacing, itemGap, itemWidth } =
    config;

  return (
    <div id="timeline">
      <div
        id="timeline-title"
        className={`font-bold text-center`}
        style={{
          fontSize: `${titleSize}px`,
          color: titleColor
        }}
      >
        {title}
      </div>

      <div className="overflow-x-auto w-screen">
        <div className="px-10 inline-block py-6">
          <div
            id="timeline-grid"
            className="grid relative"
            style={{
              gridAutoFlow: "column",
              gridAutoColumns: `${itemWidth! + itemSpacing!}px`,
              gridTemplateRows: "auto auto auto",
              rowGap: `${itemGap}px`
            }}
          >
            <TimelineContext.Provider value={config}>
              {Children.map(children, (child, index) =>
                cloneElement(child, { index })
              )}

              {Children.map(children, (_, index) => (
                <TimelineDotWithLine key={`dot-${index}`} index={index} />
              ))}
            </TimelineContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimelineItem(props: TimelineItem & { index?: number }) {
  const { index, title, description, date, highlight } = props;

  const {
    dateDisplayFormat,
    itemFillColor,
    itemBorderThickness,
    itemBorderColor,
    shadow,
    itemTextAlignment,
    itemWidth,
    alignment,
    alternating
  } = useTimelineContext();

  const isAbove = alternating ? index! % 2 === 0 : alignment === "top";

  return (
    <div
      id="timeline-item-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        gridRow: isAbove ? "1" : "3",
        gridColumn: `${index! + 1}`,
        textAlign: itemTextAlignment
      }}
      data-timeline-card={isAbove ? "top" : "bottom"}
    >
      <div
        id="timeline-item"
        className="p-2 rounded-sm gap-2 flex flex-col items-start"
        style={{
          width: `${itemWidth}px`,
          marginTop: isAbove ? "auto" : "0",
          marginBottom: isAbove ? "0" : "auto",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: itemFillColor,
          borderWidth: `${itemBorderThickness}px`,
          borderColor: highlight ? "red" : itemBorderColor,
          boxShadow: shadow ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none"
        }}
      >
        <div className="text-xs text-gray-500 w-full">
          {getDateString(date, dateDisplayFormat || "day")}
        </div>
        <div className="font-semibold w-full">{title}</div>
        <div className="text-sm w-full">{description}</div>
      </div>
    </div>
  );
}

function TimelineDotWithLine({ index }: { index: number }) {
  const {
    circleSize,
    circleColor,
    circleBorderColor,
    circleThickness,
    shadow,
    lineColor,
    lineThickness,
    numElements,
    toHighlight
  } = useTimelineContext();

  const isFirst = index === 0;
  const isLast = index === numElements - 1;
  const isHighlighted = toHighlight.includes(index);

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        gridRow: "2"
      }}
    >
      <div
        className="rounded-full z-10"
        data-timeline-dot
        style={{
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          backgroundColor: circleColor,
          borderColor: isHighlighted ? "red" : circleBorderColor,
          borderWidth: `${circleThickness}px`,
          boxShadow: shadow ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${circleSize! / 2 - lineThickness! / 2}px`,
          width: `100%`,
          height: `${lineThickness}px`,
          backgroundColor: lineColor,
          zIndex: 0,
          borderTopLeftRadius: isFirst ? `${lineThickness! / 2}px` : "0",
          borderBottomLeftRadius: isFirst ? `${lineThickness! / 2}px` : "0",
          borderTopRightRadius: isLast ? `${lineThickness! / 2}px` : "0",
          borderBottomRightRadius: isLast ? `${lineThickness! / 2}px` : "0"
        }}
      />
    </div>
  );
}

function getDateString(date: Date, format: "day" | "month" | "year") {
  let dateStr = "";
  switch (format) {
    case "day":
      let day = date.getDate().toString().padStart(2, "0");
      let month = date.toLocaleString("default", { month: "short" });
      let year = date.getFullYear();
      dateStr = `${day} ${month} ${year}`;
      break;
    case "month":
      dateStr = date.toLocaleString("default", {
        month: "short",
        year: "numeric"
      });
      break;
    case "year":
      dateStr = date.getFullYear().toString();
      break;
  }
  return dateStr;
}
