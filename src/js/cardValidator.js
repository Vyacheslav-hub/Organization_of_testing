export default function isValidCardNumber(number) {
  const arr = number.split('').reverse().map((n) => parseInt(n, 10));
  const sum = arr.reduce((acc, val, idx) => {
    if (idx % 2 !== 0) {
      let double = val * 2;
      if (double > 9) double -= 9;
      return acc + double;
    }
    return acc + val;
  }, 0);
  return sum % 10 === 0;
}
