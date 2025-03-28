export function formatToBRL(value: number | null): string {
  if (!value) return "0,00";
  const numberValue = parseFloat(value.toString()).toFixed(2);
  return numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(".", ",");
}
