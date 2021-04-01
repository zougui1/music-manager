export const tryParseJson = (data: any): any => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return data;
  }
}
