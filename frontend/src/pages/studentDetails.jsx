import ContestHistory from '@/components/contestHistory';
import RatingTrendChart from '@/components/contestHistory';
import ContestTable from '@/components/contestTable';
import ProblemSolvingDetails from '@/components/problemSolvingDetails';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentDetails() {
      
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students/s/${id}`);
        console.log("Response data:", data);
        if (data.success) {
          setStudent(data.student);
          setLoading(false);
          console.log("Student details fetched successfully:", data.student);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Student not found");
        }
        else {
          console.error("Error fetching student details:", error);
        }
        setLoading(false);
      }
    }

    if(id) {
      fetchStudentDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="mt-8">
        <ContestHistory ContestHistory={student?.contestHistory || []} />
        <ProblemSolvingDetails problemDetails={student?.problemsSolved || []} />
      </main>
    </div>
  );
}