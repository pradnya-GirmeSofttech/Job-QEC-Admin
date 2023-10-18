export const formattedDate = (isoDate) => {
  const date = new Date(isoDate);

  // Extract the day, month, and year components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1
  const year = date.getFullYear().toString();

  // Create the formatted date string
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const formattedEditDate = (isoDate) => {
  const date = new Date(isoDate);

  // Extract the year, month, and day components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = date.getDate().toString().padStart(2, "0");

  // Create the formatted date string in "year-month-day" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
