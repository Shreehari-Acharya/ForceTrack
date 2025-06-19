import AddNewStudentDialog from "@/components/dialogs/addNewStudentDialog";
import SearchBar from "@/components/searchbar";
import StudentsTable from "@/components/studentTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import RowSelector from "@/components/customSelectors";
import Loader from "@/components/loadingCircle";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [StudentDetails, setStudentDetails] = useState(null);

  const handleDownloadCSV = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students/download`, {
        responseType: 'blob', // Important for downloading files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link
        .href = url;
      link.setAttribute('download', 'students.csv'); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const handleStudentListUpdate = (students) => {
    setStudentDetails({
      data: students,
      total: students.length,
      totalPages: Math.ceil(students.length / rowsPerPage),
      page: 1
    });
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students?page=${page}&limit=${rowsPerPage}`);
        setStudentDetails(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setStudentDetails(null);
      }
    };

    fetchStudentDetails();
  }, [page, rowsPerPage]);


  return (
    <div className="min-h-screen flex flex-col space-y-8 p-8">
      <header className="flex justify-between items-center">
        <SearchBar className="w-1/3" updateStudentListFunction={handleStudentListUpdate} />
        <div className="flex items-center space-x-2">
          <RowSelector defaultNumberOfRows={rowsPerPage} onSelect={setRowsPerPage} />
          
          <Button 
            variant={"primary"}
            className={"bg-blue-500 hover:bg-blue-600 text-white text-base items-center"}
            onClick={handleDownloadCSV}
          >
            <FiDownload className="h-4 w-4" />
            Download CSV
          </Button>
          <AddNewStudentDialog/>
        </div>
      </header>
      {StudentDetails ? (<StudentsTable className="space-y-8"
        students={StudentDetails.data} 
        total={StudentDetails.total}
        totalPages={StudentDetails.totalPages}
        currentPage={StudentDetails.page}
        onPageChange={handlePageChange} />) : (
          <Loader message={"Fetching student details"}/>
      )}
    </div>
  );
}