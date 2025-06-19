import { useState, useMemo } from "react";
import { RatingChart } from "./ratingCharts";
import { format } from "date-fns";
import ContestTable from "./contestTable";
import { DayFilterContestSelector } from "./customSelectors";

export default function ContestHistory({ContestHistory}) {
    const [filter, setFilter] = useState(30);

    const filteredContests = useMemo(() => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - filter);

        return ContestHistory.filter(
            (contest) => new Date(contest.date) >= cutoffDate
        );
    }, [ContestHistory, filter]);

    const ratingData = useMemo(() => {
        return [...filteredContests]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((contest) => ({
                date: format(new Date(contest.date), "d MMM yyyy"),
                rating: contest.newRating,
                rank: contest.rank,
            }));
    }, [filteredContests]);

    return (
        <>
            <div className="flex justify-between p-4">
                <h1 className="text-3xl font-bold">Contest History</h1>
                <DayFilterContestSelector defaultFilter={filter} onSelect={(value) => setFilter(value)} />
            </div>
            <div className="flex gap-4 p-4 w-full h-full items-center">
            <div className="w-5/12">
                <RatingChart data={ratingData} days={filter} />
            </div>
            <div className="w-7/12 h-full">
                <ContestTable contests={filteredContests} />
            </div>
        </div>
        </>
        
        
    )
}
