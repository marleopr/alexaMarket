function removeTime(datetime: string): string {
  if (!datetime) return "";

  return datetime.split(/[ T]/)[0];
}

export default removeTime;
