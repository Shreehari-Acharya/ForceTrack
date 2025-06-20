import CronJobCard from "@/components/cronjobCard";
import EditCronjobForm from "@/components/editCronjobForm";
import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react";

export default function Settings() {
    const [cronDetails, setCronDetails] = useState({});
    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/settings`);
                console.log("Settings fetched successfully:", data);
                setCronDetails(data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error("Settings not found");
                } else {
                    console.error("Error fetching settings:", error);
                }
            }
        }
        fetchSettings();
    }, []);

    if (!cronDetails || Object.keys(cronDetails).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl font-bold">Loading...</div>
            </div>
        );
    }
  return (
    <div className="min-h-screen">
      <main className="w-full mt-8 flex">
        <div className="w-7/12 border p-4">
             <CronJobCard cronJob={cronDetails} />
        </div>
        <div className="w-5/12 border p-4">
            <EditCronjobForm settings={cronDetails} onUpdate={(updatedSettings) => setCronDetails(updatedSettings)} />
        </div>
      </main>
    </div>
  );
}