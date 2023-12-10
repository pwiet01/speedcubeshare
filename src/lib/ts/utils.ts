export function generateToken() {
  return randString() + randString() + randString() + randString();
}

export function getDatePlusDays(days: number, date = new Date()) {
  date.setDate(date.getDate() + days);
  return date;
}

function randString() {
  return Math.random().toString(36).substring(2);
}
