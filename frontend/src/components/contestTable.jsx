import { CalendarDays } from "lucide-react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ContestTable({ contests }) {
  if (contests.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No contests found.
      </div>
    );
  }

  return (
        <ScrollArea className="space-y-3 h-[500px] w-full p-2">
            {contests.map((contest) => (
                <div
                    key={contest._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 mb-2 border rounded-lg bg-card gap-4"
                >
                   
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-yellow-400">{contest.contestName}</h3>
                        <div className="flex flex-wrap items-center gap-4 mt-1 text-md text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                {new Date(contest.date).toLocaleDateString()}
                            </span>
                            <span>Rank: {contest.rank}</span>
                            <span>Unsolved: {contest.unsolvedCount}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 mt-2 sm:mt-0">
                        {contest.ratingChange > 0 ? (
                            <div className="flex items-center gap-1">
                                <FiArrowUp className="text-green-500" />
                                <span className="text-green-500 font-semibold">+{contest.ratingChange}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <FiArrowDown className="text-red-400" />
                                <span className="text-red-400 font-semibold">{contest.ratingChange}</span>
                            </div>
                        )}
                        <div className={`font-medium text-yellow-400`}>{contest.newRating}</div>
                        
                    </div>
                </div>
            ))}
        </ScrollArea>
    );
}