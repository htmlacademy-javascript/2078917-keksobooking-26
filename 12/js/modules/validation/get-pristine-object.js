import { HousingTypeTranslation } from '../dictionary.js';
import { getEnding } from '../utils.js';

/**
 * Перечисление соотношений: количество комнат - разрешенное количество гостей
 */
const guestsForRooms = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const form = document.querySelector('.notice').querySelector('.ad-form');
const priceElement = form.querySelector('#price');
const typeElement = form.querySelector('#type');
const roomNumberElement = form.querySelector('#room_number');
const capacityElement = form.querySelector('#capacity');

export const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  sucessClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

pristine.addValidator(
  priceElement,
  (value) => !(parseInt(value, 10) < parseInt(priceElement.min, 10)),
  () => `Минимальная цена за жилье типа '${HousingTypeTranslation[(typeElement.value).toUpperCase()]}' должна быть ${priceElement.min} рублей за ночь`
);

pristine.addValidator(
  capacityElement,
  (value) => guestsForRooms[roomNumberElement.value].includes(value),
  () => {
    const maxGuests = Math.max(...guestsForRooms[roomNumberElement.value]);
    for (const option of capacityElement.options) {
      if (option.value === maxGuests.toString()) {
        return `${roomNumberElement.value} ${getEnding(roomNumberElement.value, ['комната', 'комнаты', 'комнат'])} ${option.text}`;
      }
    }
  }
);
