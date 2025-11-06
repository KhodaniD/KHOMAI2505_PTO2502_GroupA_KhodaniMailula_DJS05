/**
 * Formats a date string into a more readable format.
 * e.g., "2023-01-15T14:30:00.000Z" -> "January 15, 2023"
 *
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} The formatted date.
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};