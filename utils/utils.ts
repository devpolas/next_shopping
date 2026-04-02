export function namePerfect(name: string) {
  const correctName = name.charAt(0).toUpperCase() + name.slice(1);
  return correctName;
}

export function formatDate(date: Date) {
  const d = new Date(date);
  const result = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);

  return result;
}
