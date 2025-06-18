import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { toast } from "sonner";
export default function EditStudentDialog({ state, onStateChange, student }) {
    if (!student) {
        return;
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedDetails = {
            studentId: student._id,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        };

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/students/`, updatedDetails)

            if (data.success) {
                toast.success("Student details updated successfully!")
            }
            student.name = data.updatedData.name;
            student.email = data.updatedData.email;
            student.PhoneNumber = data.updatedData.phoneNumber;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error)
                toast.error(error.response.data.message)
            }

        }

    }
    return (
        <Dialog open={state} onOpenChange={onStateChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"text-4xl flex items-center gap-4"}>
                        <FiEdit className="w-8 h-8" />
                        Edit Student
                    </DialogTitle>
                    <DialogDescription className={"text-base"}>
                        Modifying {student.name}'s Details
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium mb-1">name</Label>
                        <Input
                            name="name"
                            type="text"
                            defaultValue={student.name}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium mb-1">email</Label>
                        <Input
                            name="email"
                            type="text"
                            defaultValue={student.email}
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</Label>
                        <Input
                            name="phone"
                            type="text"
                            defaultValue={student.phoneNumber}
                        />
                    </div>
                    <div className="flex gap-3">
                        <DialogClose asChild>
                            <Button variant="outline" className={"cursor-pointer"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="primary"
                            className={"bg-foreground text-background cursor-pointer"}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
