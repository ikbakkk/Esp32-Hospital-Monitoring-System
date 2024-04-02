const dateFormatter = (timestamp: number, withDaysName: boolean) => {
  const date = new Date(timestamp);
  const day = date.getDay();
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear().toString().slice(2);

  const dayFormat = (day: number) => {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu'
    ];
    return days[day];
  };

  return withDaysName
    ? `${dayFormat(day)}, ${dd}/${mm}/${yyyy}`
    : `${dd}/${mm}/${yyyy}`;
};

export default dateFormatter;
