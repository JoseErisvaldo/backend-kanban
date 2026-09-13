export function computeSla(
  createdAt: Date | string,
  due: Date | string | null | undefined,
): number | null {
  if (!due) return null;
  const createdMs = new Date(createdAt).getTime();
  const dueMs = new Date(due).getTime();
  if (isNaN(createdMs) || isNaN(dueMs)) return null;
  const days = (dueMs - createdMs) / (1000 * 60 * 60 * 24);
  const rounded = Math.round(days * 2) / 2;
  const capped = rounded > 5 ? 5 : rounded;
  return Number(capped.toFixed(1));
}

export default computeSla;
