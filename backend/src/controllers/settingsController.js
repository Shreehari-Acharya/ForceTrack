import Settings from "../models/settings.js";
import { updateCronJobTimings } from "../services/cronjob/sync.js";

export async function getSettings(req, res) {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }
        res.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateSettings(req, res) {
    const { cronExpression, emailNotificationEnabled } = req.body;

    if (!cronExpression && !emailNotificationEnabled) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const settings = await Settings.findOneAndUpdate(
            {},
            { cronExpression, emailNotificationEnabled },
            { new: true, upsert: true }
        );

        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }

        updateCronJobTimings(settings.cronExpression);

        res.json({
            success: true,
            message: "Settings updated successfully",
        });
        
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}