import { HOUSING_TYPES_EN_RU } from '../dictionary.js';
import { getEnding } from '../utils.js';

const ROOMS_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const form = document.querySelector('.notice').querySelector('.ad-form');
export const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  sucessClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const priceElement = form.querySelector('#price');
const typeElement = form.querySelector('#type');
pristine.addValidator(
  priceElement,
  (value) => !(parseInt(value, 10) < parseInt(priceElement.min, 10)),
  () => `Минимальная цена за жилье типа '${HOUSING_TYPES_EN_RU[typeElement.value]}' должна быть ${priceElement.min} рублей за ночь`
);

const roomNumberInput = form.querySelector('#room_number');
const capacityInput = form.querySelector('#capacity');
pristine.addValidator(
  capacityInput,
  (value) => ROOMS_GUESTS[roomNumberInput.value].includes(value),
  () => {
    const maxGuests = Math.max(...ROOMS_GUESTS[roomNumberInput.value]);
    for (const option of capacityInput.options) {
      if (option.value === maxGuests.toString()) {
        return `${roomNumberInput.value} ${getEnding(roomNumberInput.value, ['комната', 'комнаты', 'комнат'])} ${option.text}`;
      }
    }
  }
);
