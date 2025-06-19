import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import PaginationForStudentTable from "./pagination"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import EditStudentDialog from "./dialogs/editStudentDialog"
import DeleteStudentDialog from "./dialogs/deleteStudentDialog"


export default function StudentsTable({
  students,
  total,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) {
  const navigate = useNavigate()
  const [allStudents, setAllStudents] = useState(students)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [studentForEdit, setStudentForEdit] = useState(null)
  const [studentForDelete, setStudentForDelete] = useState(null)
  const [indexForDelete, setIndexForDelete] = useState(-1)

  const handleRowClick = (studentId) => {
    navigate(`/student/${studentId}`)
  }

  const handleEdit = (student, e) => {
    e.stopPropagation()
    setStudentForEdit(student);
    setEditDialogOpen(true)
  }

  const handleDelete = (student, e, index) => {
    e.stopPropagation()
    setIndexForDelete(index)
    setStudentForDelete(student)
    setDeleteDialogOpen(true)
  }

  const getRatingColor = (rating) => {
    if (rating >= 3000) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    if (rating >= 2400) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    if (rating >= 2100) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    if (rating >= 1900) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    if (rating >= 1600) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  if(allStudents.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No students found.
      </div>
    )
  }

  const startIndex = (currentPage - 1) * allStudents.length + 1
  const endIndex = startIndex + allStudents.length - 1

  return (
    <div className="w-full" {...props}>
      <div className="rounded-lg border">
        <EditStudentDialog state={editDialogOpen} onStateChange={setEditDialogOpen} student={studentForEdit}/>
        <DeleteStudentDialog index={indexForDelete} student={studentForDelete} state={deleteDialogOpen} onStateChange={setDeleteDialogOpen} setStudents={setAllStudents}/>
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
            {allStudents.map((student, index) => (
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
                      <DropdownMenuItem onClick={(e) => handleEdit(student, e)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => handleDelete(student, e, index)} className="text-red-600">
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
