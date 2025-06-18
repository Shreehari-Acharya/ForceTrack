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
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export default function AddNewStudentDialog() {
    const [studentName, setStudentName] = useState("");
    const [handleError, setHandleError] = useState(false);

    async function fetchStudentName(handle) {
        console.log("Fetching student name for handle:", handle);
        try {
            const { data } = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
        if (data.status === "OK") {
            setStudentName(data.result[0].firstName + " " + data.result[0].lastName);
            setHandleError(false);
        }
        } catch (error) {
            console.error("Error fetching student name:", error);
          if(handle !== "") 
            setStudentName(""); 
            setHandleError(true);  
        }
    }

    const debouncedFetchStudentName = debounce(fetchStudentName, 1000);


    async function handleSubmit(event) {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const studentData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            handle: formData.get('handle')
        };
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/students`, studentData);
            if(response.data.success)
                toast.success(response.data.message);
        } catch (error) {
            console.error("Error adding new student:", error);
            if(error.response && error.response.data) {
                toast.error(error.response.data.message || "Failed to add new student. Please try again.");
            }
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
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
                        <div>
                            <Label htmlFor="handle" className="block text-sm font-medium">Codeforces Handle</Label>
                            <Input 
                                type="text"
                                id="handle"
                                name="handle"
                                required 
                                placeholder="Enter student's Codeforces handle"
                                className="mt-1 block w-full  rounded-md shadow-sm sm:text-sm"
                                onChange={(e) => debouncedFetchStudentName(e.target.value.trim())}
                            />
                            {handleError && (
                                <p className="text-red-500 text-sm mt-1">
                                    Invalid Codeforces handle. Please try again.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="name" className="block text-sm font-medium mt-2">Name</Label>
                            <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} type="text" id="name" name="name" required placeholder="Enter student's name" className="mt-1 block w-full rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="block text-sm font-medium">Email</Label>
                            <Input type="email" id="email" name="email" required placeholder="Enter student's email" className="mt-1 block w-full  rounded-md shadow-sm sm:text-sm" />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="phone" className="block text-sm font-medium">Phone Number</Label>
                            <Input type="tel" id="phone" name="phone" required placeholder="Enter student's phone number" className="mt-1 block w-full rounded-md shadow-sm  sm:text-sm" />
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