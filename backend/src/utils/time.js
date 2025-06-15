/**
 * Returns the Unix timestamp for a given time ago (e.g., "1y", "3mo", "90d").
 * Supports years (y), months (mo), and days (d).
 * @param {string} period - A string representing the time period ago (e.g., "1y", "3mo", "90d").
 * @returns {number} - The Unix timestamp (in seconds) for the given time ago.
 */
export function getUnixTimestampAgo(period) {
  const now = new Date();
  const date = new Date(now); // clone

  const regex = /^(\d+)(y|mo|d)$/;
  const match = period.match(regex);

  if (!match) {
    throw new Error('Invalid format. Use like "1y", "3mo", or "90d"');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "y":
      date.setFullYear(date.getFullYear() - value);
      break;
    case "mo":
      date.setMonth(date.getMonth() - value);
      break;
    case "d":
      date.setDate(date.getDate() - value);
      break;
    default:
      throw new Error("Unsupported time unit. Use y, mo, or d.");
  }

  return Math.floor(date.getTime() / 1000);
}