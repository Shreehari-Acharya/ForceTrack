import cron from 'node-cron';
import { syncAllStudentsData } from '../../utils/codeforces.js';
import { sendGetbackToSolvingEmails } from '../email/sendEmails.js';
import Settings from '../../models/settings.js';

let currentRunningCronJob = null;

/**
 * Updates the cron job with a new cron expression.
 * If a cron job is already running, it stops it before starting a new one.
 * 
 * @param {string} cronExpression - The cron expression to set for the job.
 */
export function updateCronJobTimings(cronExpression) {

    // Stop the existing cron job if it exists
    if (currentRunningCronJob) {
        currentRunningCronJob.stop();
    }

    currentRunningCronJob = cron.schedule(cronExpression, async () => {
        try {
            const now = new Date();
            console.log(`Cron job started at ${now.toISOString()}`);
            const settings = await Settings.findOneAndUpdate(
                {},
                { isCronRunning: true, totalTimeTaken: 0 }, 
                { new: true } // returns the updated document
            ); 

            await syncAllStudentsData(); // Sync all students' data

            if(settings.emailNotificationEnabled){
                await sendGetbackToSolvingEmails(); // Send emails to inactive students
            }
            
            const end = new Date();
            console.log(`Cron job completed at ${end.toISOString()}`);

            await Settings.updateOne({}, { 
                lastCronRun: end,
                totalTimeTaken: (end - now) / 1000, // Store time taken in seconds
                isCronRunning: false // Update cron running status
            }); // Update last run time in settings

        } catch (error) {
            console.error('Error in cronJob', error);
        }
    });

    console.log(`Cron job updated with expression: ${cronExpression}`);
    return;
}