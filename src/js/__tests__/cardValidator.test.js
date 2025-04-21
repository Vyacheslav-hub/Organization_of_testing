import isValidCardNumber from '../cardValidator';

describe('Проверка номера карты (алгоритм Луна)', () => {
  test('валидный номер', () => {
    expect(isValidCardNumber('4539578763621486')).toBe(true); // Visa
  });

  test('невалидный номер', () => {
    expect(isValidCardNumber('4539578763621487')).toBe(false);
  });
});
