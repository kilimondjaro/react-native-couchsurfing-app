export default function calculateDates() {
  const currentDate = new Date();
  const curMonth = currentDate.getMonth();
  const curYear = currentDate.getFullYear();
  const dates = [];

  for (let i = curMonth; i < curMonth + 12; i++) {
    const days = new Date(curYear, i + 1, 0).getDate();
    const month = [];
    let week = [null, null, null, null, null, null, null];

    for (let d = 1; d <= days; d++) {
      const dayOfWeek = new Date(curYear, i, d).getDay();
      if (dayOfWeek === 0) {
        month.push(week);
        week = [null, null, null, null, null, null, null];
      }
      week[dayOfWeek] = d;
    }

    if (week[0] !== null) {
      month.push(week);
    }

    dates.push(month);
  }
  return dates;
}
