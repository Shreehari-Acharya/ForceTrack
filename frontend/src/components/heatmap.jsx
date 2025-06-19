import { useMemo } from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";
import clsx from "clsx";

const getColor = (count) => {
    if (count === 0) return "bg-gray-600";
    if (count < 2) return "bg-green-200";
    if (count < 3) return "bg-green-300";
    if (count < 4) return "bg-green-400";
    if (count < 5) return "bg-green-500";
    return "bg-green-600";
};

export default function ProblemHeatmap({ problemDetails, days }) {
  const activityMap = useMemo(() => {
    const map = new Map();
    problemDetails.forEach(({ solvedDate }) => {
      const dateStr = format(new Date(solvedDate), "yyyy-MM-dd");
      map.set(dateStr, (map.get(dateStr) || 0) + 1);
    });
    return map;
  }, [problemDetails]);

  const today = new Date();
  const startDate = subDays(today, days - 1);
  const allDays = eachDayOfInterval({ start: startDate, end: today });

  return (
        <>
            <div className="text-3xl font-bold mb-4">
                Heatmap
            </div>
            <div className="w-[540px] grid grid-cols-7 gap-px">
                {allDays.map((date, idx) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const count = activityMap.get(dateStr) || 0;

                    return (
                        <div className="flex flex-col justify-center items-center" key={dateStr}>
                            <p className="">{idx < 7 ? format(date, 'EEE') : ""}</p>
                            <div
                                key={dateStr}
                                title={`${dateStr} — ${count} solved`}
                                className={clsx("w-[70px] h-[70px] rounded mb-[7px]", getColor(count))}
                            ></div>
                        
                        </div>
                    );
                })}
            </div>
        </>
    );
}
