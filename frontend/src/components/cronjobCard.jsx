import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Clock,
  MailCheck,
  PlayCircle,
  History,
  AlertTriangle,
  TimerIcon
} from "lucide-react"
import { formatDistanceToNowStrict, format } from "date-fns"
import { useEffect, useState } from "react"
import parser from "cron-parser"

export default function CronJobCard({ cronJob }) {
  const {
    cronExpression,
    emailNotificationEnabled,
    lastCronRun,
    isCronRunning,
    totalTimeTaken
  } = cronJob

  const [nextRun, setNextRun] = useState(null)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    try {

      const interval = parser.parse(cronExpression)
      const next = interval.next().toDate()
      setNextRun(next)
    } catch (err) {
      console.error("Invalid cron expression", err)
    }
  }, [cronExpression])

  useEffect(() => {
    if (!nextRun) return

    const timer = setInterval(() => {
      const now = new Date()
      const diff = nextRun - now

      if (diff <= 0) {
        setTimeLeft("Running now...")
        clearInterval(timer)
        return
      }

      const seconds = Math.floor((diff / 1000) % 60)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [nextRun])


  const getStatusColor = () => (isCronRunning ? "text-green-600" : "text-gray-500")

  return (
    <div className="flex flex-col gap-6">
    <Card className="w-full rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl">
          <Clock className="w-12 h-12 text-primary" />
          Cron Job Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-2xl text-muted-foreground">
        {/* Cron Expression */}
        <div className="flex items-center gap-3">
          <PlayCircle className="w-8 h-8 text-blue-600" />
          <span>
            <span className="font-medium text-foreground">Expression:</span>{" "}
            <code className="px-2 py-0.5 rounded">{cronExpression}</code>
          </span>
        </div>

        {/* Email Notification */}
        <div className="flex items-center gap-3">
          <MailCheck className="w-8 h-8 text-purple-600" />
          <span>
            <span className="font-medium text-foreground">Email Notifications:</span>{" "}
            {emailNotificationEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

        {/* Last Cron Run */}
        <div className="flex items-center gap-3">
          <History className="w-8 h-8 text-yellow-600" />
          <span>
            <span className="font-medium text-foreground">Last Run:</span>{" "}
            {lastCronRun
              ? formatDistanceToNowStrict(new Date(lastCronRun), { addSuffix: true })
              : "Never"}
          </span>
        </div>

        {/* Running Status */}
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-8 h-8 ${getStatusColor()}`} />
          <span>
            <span className="font-medium text-foreground">Status:</span>{" "}
            {isCronRunning ? "Running" : "Idle"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <TimerIcon className={`w-8 h-8 ${getStatusColor()}`} />
          <span>
            <span className="font-medium text-foreground">Time taken to Sync:</span>{" "}
            {totalTimeTaken ? (
              <span className="text-green-600 font-semibold">
                {totalTimeTaken} seconds
              </span>
            ) : (
              <span className="text-red-600">Not available</span>
            )}
          </span>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl">
          <Clock className="w-12 h-12 text-primary" />
          Next Run
        </CardTitle>
      </CardHeader>

      <CardContent className="text-2xl text-muted-foreground">
        {nextRun ? (
          <div className="flex flex-col text-2xl items-begin gap-3">
            <span>
              {format(nextRun, "PPpp")}
            </span>
            <div className="text-green-600 font-semibold">{timeLeft}</div>
          </div>
        ) : (
          <div className="text-red-600">Invalid cron expression</div>
        )}
      </CardContent>
    </Card>
    </div>
  )
}
