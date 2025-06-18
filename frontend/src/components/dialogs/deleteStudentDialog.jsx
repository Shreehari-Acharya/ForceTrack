import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { FiTrash } from "react-icons/fi"
import { Button } from "../ui/button"
import axios from "axios"
import { toast } from "sonner"


export default function DeleteStudentDialog({index, student, setStudents, state, onStateChange }) {

    if(!student) {
        return;
    }

    async function handleDelete(){
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/students/`, {
                params: {studentId: student._id}
            })

            if(data.success){
                // Remove the student from the local state
                setStudents((prevStudents) => {
                    const updatedStudents = [...prevStudents];
                    updatedStudents.splice(index, 1);
                    return updatedStudents;
                });
                toast("Student deleted successfully!")
            }
            allStudents.splice(index, 1)
        } catch (error) {
            if(error.response && error.response.data){
                toast(error.response.data.message)
            }
        }
    }
    return (
        <AlertDialog open={state} onOpenChange={onStateChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={"text-3xl flex gap-4 text-destructive items-center mb-4"}>
                        <FiTrash className="w-8 h-8"/>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete <strong>{student.name}'s</strong> details
                        and remove all related related data from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={"border-none"}>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild >
                        <Button 
                            variant="primary" 
                            className={"bg-red-500/90 hover:bg-red-500 text-foreground/95"}
                            onClick={handleDelete}    
                        >
                            Delete
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}