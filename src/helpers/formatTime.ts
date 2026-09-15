export function formatTime(s: number) {
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
