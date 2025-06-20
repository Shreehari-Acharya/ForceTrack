// import { useMemo } from "react";
// import { format, subDays, eachDayOfInterval } from "date-fns";
// import clsx from "clsx";

// const getColor = (count) => {
//     if (count === 0) return "bg-gray-600";
//     if (count < 2) return "bg-green-200";
//     if (count < 3) return "bg-green-300";
//     if (count < 4) return "bg-green-400";
//     if (count < 5) return "bg-green-500";
//     return "bg-green-600";
// };

// export default function ProblemHeatmap({ problemDetails, days }) {
//   const activityMap = useMemo(() => {
//     const map = new Map();
//     problemDetails.forEach(({ solvedDate }) => {
//       const dateStr = format(new Date(solvedDate), "yyyy-MM-dd");
//       map.set(dateStr, (map.get(dateStr) || 0) + 1);
//     });
//     return map;
//   }, [problemDetails]);

//   const today = new Date();
//   const startDate = subDays(today, days - 1);
//   const allDays = eachDayOfInterval({ start: startDate, end: today });

//   return (
//         <>
//             <div className="text-3xl font-bold mb-4">
//                 Heatmap
//             </div>
//             <div className="w-[540px] grid grid-cols-7 gap-px">
//                 {allDays.map((date, idx) => {
//                     const dateStr = format(date, "yyyy-MM-dd");
//                     const count = activityMap.get(dateStr) || 0;

//                     return (
//                         <div className="flex flex-col justify-center items-center" key={dateStr}>
//                             <p className="">{idx < 7 ? format(date, 'EEE') : ""}</p>
//                             <div
//                                 key={dateStr}
//                                 title={`${dateStr} — ${count} solved`}
//                                 className={clsx("w-[70px] h-[70px] rounded mb-[7px]", getColor(count))}
//                             ></div>
                        
//                         </div>
//                     );
//                 })}
//             </div>
//         </>
//     );
// }

import { useMemo } from "react"
import { format, subDays, eachDayOfInterval, endOfWeek, eachWeekOfInterval, getDay } from "date-fns"
import clsx from "clsx"

const getColor = (count) => {
  if (count === 0) return "bg-card/50 border border-ring/50 "
  if (count < 2) return "bg-green-200"
  if (count < 3) return "bg-green-300"
  if (count < 4) return "bg-green-400"
  if (count < 5) return "bg-green-500"
  return "bg-green-600"
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function ProblemHeatmap({ problemDetails, days = 365 }) {
  const { activityMap, weeks, monthLabels } = useMemo(() => {
    // Create activity map
    const map = new Map()
    problemDetails.forEach(({ solvedDate }) => {
      const dateStr = format(new Date(solvedDate), "yyyy-MM-dd")
      map.set(dateStr, (map.get(dateStr) || 0) + 1)
    })

    // Calculate date range
    const today = new Date()
    const startDate = subDays(today, days - 1)

    // Get all weeks in the range
    const weekStarts = eachWeekOfInterval(
      { start: startDate, end: today },
      { weekStartsOn: 0 }, // Sunday
    )

    // Create weeks array with days
    const weeksData = weekStarts.map((weekStart) => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 })
      const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

      return daysInWeek.map((date) => {
        const dateStr = format(date, "yyyy-MM-dd")
        const count = map.get(dateStr) || 0
        const isInRange = date >= startDate && date <= today

        return {
          date,
          dateStr,
          count: isInRange ? count : null,
          dayOfWeek: getDay(date),
        }
      })
    })

    // Create month labels
    const monthLabels = []
    let currentMonth = ""
    weeksData.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0].date
      const monthName = format(firstDayOfWeek, "MMM")

      if (monthName !== currentMonth) {
        monthLabels.push({
          month: monthName,
          weekIndex,
        })
        currentMonth = monthName
      }
    })

    return {
      activityMap: map,
      weeks: weeksData,
      monthLabels,
    }
  }, [problemDetails, days])

  const totalSolved = Array.from(activityMap.values()).reduce((sum, count) => sum + count, 0)

  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold">Heatmap</div>

      <div className="text-base text-gray-300">
        {totalSolved} problems solved in the last {days} days
      </div>

      <div className="inline-block">


        {/* Heatmap grid */}
        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col justify-between py-1 pr-2">
            {DAYS.map((day, index) => (
              <div
                key={day}
                className={clsx(
                  "text-base/30 text-gray-400 h-3 flex items-center"
                )}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Heatmap cells */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map(({ dateStr, count }) => (
                  <div
                    key={dateStr}
                    title={count !== null ? `${dateStr} — ${count} solved` : ""}
                    className={clsx("w-10 h-10 rounded-sm", count !== null ? getColor(count) : "bg-transparent")}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
