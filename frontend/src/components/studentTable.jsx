import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import PaginationForStudentTable from "./pagination"
import { useNavigate } from "react-router-dom"


// Mock data based on your structure
const mockStudents = [
  {
    _id: "684e5a7af4cd2c999120e930",
    name: "Riku Kawasaki",
    email: "shreehari.acharya.06@gmail.com",
    phoneNumber: "9999999999",
    codeforcesHandle: "maroonrk",
    currentRating: 3565,
    maxRating: 3650,
  },
  {
    _id: "684e5a7af4cd2c999120e931",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phoneNumber: "8888888888",
    codeforcesHandle: "alice_codes",
    currentRating: 2100,
    maxRating: 2250,
  },
  {
    _id: "684e5a7af4cd2c999120e932",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phoneNumber: "7777777777",
    codeforcesHandle: "bob_solver",
    currentRating: 1850,
    maxRating: 1900,
  },
  {
    _id: "684e5a7af4cd2c999120e933",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phoneNumber: "6666666666",
    codeforcesHandle: "carol_dev",
    currentRating: 1650,
    maxRating: 1750,
  },
  {
    _id: "684e5a7af4cd2c999120e934",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phoneNumber: "5555555555",
    codeforcesHandle: "david_algo",
    currentRating: 2300,
    maxRating: 2400,
  },
  {
    _id: "684e5a7af4cd2c999120e935",
    name: "Eva Brown",
    email: "eva.brown@example.com",
    phoneNumber: "4444444444",
    codeforcesHandle: "eva_competitive",
    currentRating: 1950,
    maxRating: 2050,
  },
]

export default function StudentsTable({
  students,
  total,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) {
  const navigate = useNavigate()
  const handleRowClick = (studentId) => {
    navigate(`/${studentId}`)
  }

  const handleEdit = (studentId, e) => {
    e.stopPropagation()
    console.log("Edit student:", studentId)
  }

  const handleDelete = (studentId, e) => {
    e.stopPropagation()
    console.log("Delete student:", studentId)
  }

  const getRatingColor = (rating) => {
    if (rating >= 3000) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    if (rating >= 2400) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    if (rating >= 2100) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    if (rating >= 1900) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    if (rating >= 1600) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const startIndex = (currentPage - 1) * students.length + 1
  const endIndex = startIndex + students.length - 1

  return (
    <div className="w-full" {...props}>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead>Handle</TableHead>
              <TableHead className="hidden lg:table-cell text-center py-1.5">Rating <br/>Current | Max</TableHead>
              <TableHead className="hidden lg:table-cell">Last sync</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student._id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(student._id)}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{student.email}</TableCell>
                <TableCell className="hidden md:table-cell">{student.phoneNumber}</TableCell>
                <TableCell>
                  <div className="font-medium">{student.codeforcesHandle}</div>
                  <div className="lg:hidden flex gap-1 mt-1">
                    <Badge variant="outline" className={getRatingColor(student.currentRating)}>
                      {student.currentRating}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Max: {student.maxRating}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-center">
                  <Badge className={getRatingColor(student.currentRating)}>{student.currentRating}</Badge>
                  <Badge variant="outline">{student.maxRating}</Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {student.lastSynced
                    ? new Date(student.lastSynced).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                    : "Not Available"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => handleEdit(student._id, e)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleDelete(student._id, e)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

          <PaginationForStudentTable total={total}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              startIndex={startIndex}
              endIndex={endIndex}
          />
    </div>
  )
}
