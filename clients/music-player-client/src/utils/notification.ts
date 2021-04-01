export const buildTopic = (url: string, params: Record<string, string> = {}): string => {
  const topic = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    topic.searchParams.append(key, value);
  }

  return topic.toString();
}
