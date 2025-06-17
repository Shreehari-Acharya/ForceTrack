import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FiPlusCircle } from "react-icons/fi";

export default function AddNewStudentDialog() {

    function handleSubmit(event) {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const studentData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            handle: formData.get('handle')
        };
        
        // Here you would typically send the data to your backend
        console.log("New Student Data:", studentData);
    }
    return (
        <Dialog>
            <DialogTrigger className="btn btn-primary">
                <Button variant="primary" className={"bg-foreground/95 hover:bg-foreground/90 text-background text-base items-center"}>
                <FiPlusCircle className="h-8 w-8" />
                    Add Student
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"text-3xl"}>Add New Student</DialogTitle>
                    <DialogDescription>
                        Fill in the details of the new student to add them to the system.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Label htmlFor="name" className="block text-sm font-medium mt-2">Name</Label>
                            <Input type="text" id="name" name="name" required placeholder="Enter student's name" className="mt-1 block w-full rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="block text-sm font-medium">Email</Label>
                            <Input type="email" id="email" name="email" required placeholder="Enter student's email" className="mt-1 block w-full  rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="phone" className="block text-sm font-medium">Phone Number</Label>
                            <Input type="tel" id="phone" name="phone" required placeholder="Enter student's phone number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm  sm:text-sm" />
                        </div>
                        <div>
                            <Label htmlFor="handle" className="block text-sm font-medium">Codeforces Handle</Label>
                            <Input type="text" id="handle" name="handle" required placeholder="Enter student's Codeforces handle" className="mt-1 block w-full  rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <Button type="submit" className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            Add Student
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}