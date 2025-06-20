import mongoose, {Schema} from "mongoose";

const settingsSchema = new Schema({
    cronExpression: {
        type: String,
        default: '0 0 * * *' // Default to daily at midnight
    },
    emailNotificationEnabled: {
        type: Boolean,
        default: true // Default to enabled
    },
    lastCronRun: {
        type: Date,
        default: null // Default to null, meaning it hasn't run yet
    },
    totalTimeTaken: {
        type: Number,
        default: 0 // Default to 0 seconds
    },
    isCronRunning: {
        type: Boolean,
        default: false // Default to not running
    }
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;