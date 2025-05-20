export default function formatNumber(n) {
  if (n !== undefined && n !== null && n !== '') {
    const num = Number(n)
    return Number.isInteger(num) ? num : num.toFixed(2).replace(/\.?0+$/, '')
  }
  return ''
}
