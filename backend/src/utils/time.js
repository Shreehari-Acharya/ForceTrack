/**
 * A utility function to get the Unix timestamp for one year ago.
 * This is useful for filtering contests or events that are older than one year.
 * @returns {number} - The Unix timestamp for one year ago.
 */
export function getUnixTimestampOneYearAgo(){
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return Math.floor(oneYearAgo.getTime() / 1000); 
}