import getCardSystem from '../cardSystem';

describe('Определение платёжной системы', () => {
  test('Visa', () => {
    expect(getCardSystem('4539578763621486')).toBe('visa');
  });

  test('Mastercard', () => {
    expect(getCardSystem('5312345678901234')).toBe('mastercard');
  });

  test('Mir', () => {
    expect(getCardSystem('2200123456789010')).toBe('mir');
  });

  test('Неизвестная', () => {
    expect(getCardSystem('9999999999999999')).toBe('unknown');
  });
});
