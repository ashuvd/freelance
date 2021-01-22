export default function dateFilter(value) {
  const [day, month, year] = value.split('.');
  return `${year}-${month}-${day}`
}
