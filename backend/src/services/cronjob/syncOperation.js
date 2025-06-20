import { syncAllStudentsData } from '../../utils/codeforces.js';
import { sendGetbackToSolvingEmails } from '../email/sendEmails.js';
import Settings from '../../models/settings.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

export default async function syncDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        const now = new Date();
        console.log(`Cron job started at ${now.toISOString()}`);
        const settings = await Settings.findOneAndUpdate(
            {},
            { isCronRunning: true, totalTimeTaken: 0 },
            { new: true } // returns the updated document
        );

        await syncAllStudentsData(); // Sync all students' data

        if (settings.emailNotificationEnabled) {
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
    finally {
        await mongoose.disconnect(); // Ensure the connection is closed after the operation
        console.log('Disconnected from MongoDB');
    }
}

// await syncDatabase(); 
