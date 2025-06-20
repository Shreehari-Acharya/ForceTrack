import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { useState } from "react"
import { MailX, MailCheck, User, Mail, Phone, Code, Trophy, Clock, Bell } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

export default function StudentInfoCard({ student }) {
  const [disableEmail, setDisableEmail] = useState(student.disableInactivityEmail)

  const toggleInactivityEmail = async () => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/students/emailConfig`, {
        studentId: student._id,
      })
      if (data.success) {
        setDisableEmail((prev) => !prev)
        toast.success(`Inactivity emails ${!disableEmail ? "disabled" : "enabled"} successfully`)
      } else {
        throw new Error("Update failed")
      }
    } catch (err) {
      console.error("Failed to toggle email reminders:", err)
      toast.error("Failed to update email setting.")
    }
  }

  const getRatingColor = (rating) => {
    if (rating >= 2100) return "text-red-600"
    if (rating >= 1900) return "text-purple-600"
    if (rating >= 1600) return "text-blue-600"
    if (rating >= 1400) return "text-cyan-600"
    if (rating >= 1200) return "text-green-600"
    return "text-gray-600"
  }

  return (
    <Card className="w-10/12 shadow-lg border-0 ">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">{student.name}</CardTitle>
              <p className="text-sm ">Student Profile</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Contact Information */}
          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide">Email</p>
              <p className="font-medium truncate">{student.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide">Phone</p>
              <p className="font-medium truncate">{student.phoneNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <Code className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide">Handle</p>
              <p className="font-medium  font-mono truncate">{student.codeforcesHandle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3  rounded-lg border ">
            <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs  uppercase tracking-wide">Rating</p>
              <div className="flex items-center gap-1">
                <span className={`font-bold ${getRatingColor(student.currentRating)}`}>{student.currentRating}</span>
                <span className="text-sm ">(max: {student.maxRating})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs  uppercase tracking-wide">Last Synced</p>
              <p className="font-medium text-sm">
                {formatDistanceToNow(new Date(student.lastSynced), { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <Bell className="w-4 h-4 text-red-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs  uppercase tracking-wide">Inactive Reminders</p>
              <div className="flex items-center gap-2">
                <span className="font-medium ">{student.inactivityReminderCount}</span>
                <Badge
                  variant={student.inactivityReminderCount > 0 ? "destructive" : "secondary"}
                  className="text-xs px-1.5 py-0.5"
                >
                  {student.inactivityReminderCount > 0 ? "Active" : "None"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${disableEmail ? "bg-red-400" : "bg-green-400"}`}></div>
            <span className="text-sm">Email notifications {disableEmail ? "disabled" : "enabled"}</span>
          </div>
          <Button
            onClick={toggleInactivityEmail}
            size="sm"
            variant={disableEmail ? "default" : "outline"}
            className={`flex items-center gap-2 transition-all duration-200 ${
              disableEmail
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "border-red-200 text-red-600 hover:bg-red-50"
            }`}
          >
            {disableEmail ? (
              <>
                <MailCheck className="w-3 h-3" />
                Enable
              </>
            ) : (
              <>
                <MailX className="w-3 h-3" />
                Disable
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}