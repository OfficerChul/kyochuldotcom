const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

export function formatDiaryDate(dateStr: string): string {
  const [yy, mm, dd] = dateStr.split('-').map(Number);
  const date = new Date(2000 + yy, mm - 1, dd);
  return dateFormatter.format(date);
}

export function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
