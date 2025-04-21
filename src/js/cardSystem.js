// eslint-disable-next-line import/prefer-default-export
export function getCardSystem(number) {
  if (/^4/.test(number)) {
    return 'visa';
  }
  if (/^5[1-5]/.test(number)) {
    return 'mastercard';
  }
  if (/^220[0-4]/.test(number)) {
    return 'mir';
  }
  return 'unknown';
}
