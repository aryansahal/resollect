/* Formats currency */
export function formatCurrency(
  value: string | number | null | undefined
): string {
  if (value === null || value === undefined || value === "") return "—";

  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return "Invalid amount";

  return "₹" + numValue.toLocaleString("en-IN");
}

/* Truncates text to a specified length */
export function truncateText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
