import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} 

export function RatingChart({data, days}) {
    if (!data || data.length === 0) {
        return (
        <Card>
            <CardHeader>
            <CardTitle>Rating graph</CardTitle>
            <CardDescription>No data available</CardDescription>
            </CardHeader>
        </Card>
        )
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-green-500 text-lg"}>Rating graph</CardTitle>
        <CardDescription className={"text-yellow-400 mt-1"}>Last {days} days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <YAxis 
                domain={["dataMin - 50", "dataMax + 50"]}
                axisLine={false}
                tickLine={false}
                tickMargin={20}
            />
            <XAxis
              dataKey="date"
              tick={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="rating"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
