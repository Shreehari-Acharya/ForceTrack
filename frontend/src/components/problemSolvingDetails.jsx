import { useMemo, useState } from "react";
import { DayFilterProblemSelector } from "./customSelectors";
import ProblemSolvingStats from "./problemStats";
import { RatingBucketBarChart } from "./ratingBucketChart";
import ProblemHeatmap from "./heatmap";

export default function ProblemSolvingDetails({ problemDetails }) {
    const [filter , setFilter] = useState(7);

    // 1. Filter problems by date
    const filteredProblems = useMemo(() => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - filter);

        return problemDetails.filter((problem) => {
            const submissionDate = new Date(problem.solvedDate);
            return submissionDate >= cutoffDate;
        });
    }, [problemDetails, filter]);

    const stats = useMemo(() => {
    if (filteredProblems.length === 0) {
      return {
        total: 0,
        mostDifficult: null,
        avgRating: 0,
        avgPerDay: 0,
        ratingBuckets: {},
      };
    }

    const total = filteredProblems.length;

    const mostDifficult = filteredProblems.reduce((a, b) =>
      a.problemRating > b.problemRating ? a : b
    );

    const totalRating = filteredProblems.reduce(
      (sum, p) => sum + p.problemRating,
      0
    );

    const avgRating = Math.round(totalRating / total);

    const avgPerDay = (total / filter).toFixed(2);

    const minRating = 800;
    const maxRating = 3500;
    const bucketSize = 300;
    const buckets = new Map();

        for (const problem of filteredProblems) {
            const rating = problem.problemRating;
            if (!rating || rating < minRating || rating > maxRating) continue;

            const start = Math.floor((rating - minRating) / bucketSize) * bucketSize + minRating;
            const rangeKey = `${start}-${start + bucketSize - 1}`;

            buckets.set(rangeKey, (buckets.get(rangeKey) || 0) + 1);
        }

        // Fill empty buckets (optional)
        for (let r = minRating; r <= maxRating; r += bucketSize) {
            const key = `${r}-${r + bucketSize - 1}`;
            if (!buckets.has(key)) buckets.set(key, 0);
        }

        const ratingBuckets =  Array.from(buckets.entries()).map(([range, count]) => ({
            range,
            count,
        }));

    return {
      total,
      mostDifficult,
      avgRating,
      avgPerDay,
      ratingBuckets,
    };
  }, [filteredProblems]);

  return (
      <>
          <div className="w-full p-4 space-y-4">
              <h2 className="text-3xl font-bold">Problem Solving Details</h2>
              <DayFilterProblemSelector defaultFilter={filter} onSelect={(value) => setFilter(value)} />
          </div>
          <div className="p-4">
            <ProblemSolvingStats total={stats.total}
              averageRating={stats.avgRating}
              harderProblem={stats.mostDifficult}
              averageNumberOfProblems={stats.avgPerDay} 
            />
            <div className="w-full flex flex-col md:flex-row gap-10 mt-4 items-start">
                <div className="w-5/12">
                <RatingBucketBarChart data={stats.ratingBuckets} days={filter} />
            </div>
            <div className="w-auto h-5">
                <ProblemHeatmap problemDetails={filteredProblems} days={filter} />
            </div>
            </div>
          </div>
      </>
  );
}