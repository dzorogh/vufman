export function FormatTimestamp(input: string) {
  return new Date(input).toLocaleString('ru');
}
