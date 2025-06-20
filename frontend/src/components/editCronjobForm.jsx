import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import parser from "cron-parser"
import axios from "axios"
import { toast } from "sonner"

export default function CronSettingsForm({ settings, onUpdate }) {
  const [cronExpression, setCronExpression] = useState(settings.cronExpression)
  const [isValidCron, setIsValidCron] = useState(true)
  const [emailNotificationEnabled, setEmailNotificationEnabled] = useState(
    settings.emailNotificationEnabled
  )

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const parsedSuccessfully = parser.parse(cronExpression);

            setIsValidCron(true);

            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/settings`, {
                cronExpression,
                emailNotificationEnabled,
            });

            if (data.success) {
                onUpdate({
                    lastCronRun: settings.lastCronRun,
                    isCronRunning: settings.isCronRunning,
                    totalTimeTaken: settings.totalTimeTaken,
                    cronExpression,
                    emailNotificationEnabled
                });
            }
            toast.success("Settings updated successfully!");
        } catch (error) {
            if (error) {

                console.error("Error updating settings:", error);
                toast.error("Failed to update settings. Please try again.");
            }
        }

    }

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className={"text-2xl"}>Update Cron & Email services</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Cron Expression Input */}
          <div className="space-y-2">
            <Label htmlFor="cronExpression" className={"text-lg"}>Cron Expression</Label>
            <Input
              id="cronExpression"
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              placeholder="e.g. 0 0 * * *"
            />
            <p className="text-red-500">{isValidCron ? "" : "Invalid cron"}</p>
          </div>

          {/* Email Notification Toggle */}
          <div className="flex items-center justify-start space-x-4 ">
            <Label htmlFor="emailNotificationEnabled" className={"text-lg"}>
              Email Notification Enabled
            </Label>
            <Switch
              id="emailNotificationEnabled"
              checked={emailNotificationEnabled}
              onCheckedChange={setEmailNotificationEnabled}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" variant="primary" className={"bg-foreground text-background"}>Save Settings</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
