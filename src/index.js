import './css/style.css';
import visaImg from './img/visa.png';
import mastercardImg from './img/mastercard.png';
import mirImg from './img/mir.png';
import isValidCardNumber from './js/cardValidator';
import getCardSystem from './js/cardSystem';

const form = document.querySelector('.card-form');
const input = document.querySelector('.card-input');
const result = document.querySelector('.result');
const cardIcons = document.querySelectorAll('.card-icon');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const number = input.value.trim();
  if (!number) return;

  const isValid = isValidCardNumber(number);
  const system = getCardSystem(number);

  result.textContent = isValid ? `Карта действительна (${system.toUpperCase()})` : 'Карта недействительна';

  cardIcons.forEach((icon) => {
    if (icon.classList.contains(system)) {
      icon.classList.add('active');
    } else {
      icon.classList.remove('active');
    }
  });
});

// Иконки
document.querySelector('.visa-icon').src = visaImg;
document.querySelector('.mastercard-icon').src = mastercardImg;
document.querySelector('.mir-icon').src = mirImg;
