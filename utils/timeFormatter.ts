const timeFormatter = (timestamp: number, withSeconds: boolean) => {
  const date = new Date(timestamp);

  const formatting = (time: number) => {
    return time >= 0 && time <= 9 ? '0' + time : time.toString();
  };

  const hour = formatting(date.getHours());
  const min = formatting(date.getMinutes());
  const sec = formatting(date.getSeconds());

  return withSeconds ? `${hour}:${min}:${sec}` : `${hour}:${min}`;
};

export default timeFormatter;
