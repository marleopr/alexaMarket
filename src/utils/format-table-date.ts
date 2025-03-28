export const formatTableDate = (date: string | null): string => {
  if (!date) return "-";
  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");
  const hours = String(parsedDate.getUTCHours()).padStart(2, "0");
  const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(parsedDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};