export function formatTimestamp(input: string) {
  return new Date(input).toLocaleString('ru');
}
