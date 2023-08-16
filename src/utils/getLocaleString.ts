export default function getLocaleString(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(date).toLocaleString('en-AU', options);
}
