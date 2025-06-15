import cron from 'node-cron';
import { syncAllStudentsData } from '../../utils/codeforces.js';
import { sendGetbackToSolvingEmails } from '../email/sendEmails.js';

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
            await syncAllStudentsData(); // Sync all students' data
            await sendGetbackToSolvingEmails(); // Send emails to inactive students
        } catch (error) {
            console.error('Error in cronJob', error);
        }
    });

    console.log(`Cron job updated with expression: ${cronExpression}`);
    return;
}