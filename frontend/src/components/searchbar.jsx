import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function SearchBar({updateStudentListFunction}) {
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSearch() {
    searchTerm.toLocaleLowerCase();
    if(searchTerm.trim() === "") {
      return;
    }
    try {

      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students/search`, {
        params: { searchTerm: searchTerm }
      });

      if (data.success) {
        updateStudentListFunction(data.students);
        setSearchTerm(""); 
      }
    } catch (error) {
      if(error.response && error.response.status === 404) {
        updateStudentListFunction([]);
      }
      else{
        console.error("Error searching for students:", error);
        toast.error("An error occurred while searching for students. Please try again later.");
      }
    }
  }

  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search students by handle or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        className="pl-10"
      />
    </div>
  );
}