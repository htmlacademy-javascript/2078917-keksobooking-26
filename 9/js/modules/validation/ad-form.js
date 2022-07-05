import { pristine } from './get-pristine-object.js';
import { showError, showSuccess } from './popup.js';

const form = document.querySelector('.notice').querySelector('.ad-form');

const LIVING_TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const priceElement = form.querySelector('#price');
const typeElement = form.querySelector('#type');
typeElement.addEventListener('change', () => {
  priceElement.placeholder = LIVING_TYPE_MIN_PRICE[typeElement.value];
  priceElement.min = LIVING_TYPE_MIN_PRICE[typeElement.value];
  pristine.validate(priceElement);
});

const roomNumberInput = form.querySelector('#room_number');
const capacityInput = form.querySelector('#capacity');
roomNumberInput.addEventListener('change', () => pristine.validate(capacityInput));

const timeinElement = form.querySelector('#timein');
const timeoutElement = form.querySelector('#timeout');
timeinElement.addEventListener('change', (evt) => {
  timeoutElement.value = evt.target.value;
});
timeoutElement.addEventListener('change', (evt) => {
  timeinElement.value = evt.target.value;
});

const reset = () => {
  //сброс фильтра
  const formMap = document.querySelector('.map__filters');
  formMap.reset();
  //Удаление всех изображений жилья
  const propertyPhotos = form.querySelector('.ad-form__photo');
  while (propertyPhotos.lastChild) {
    propertyPhotos.removeChild(propertyPhotos.lastChild);
  }
  //Сброс аватарки
  const avatarElement = form.querySelector('.ad-form-header__preview img');
  avatarElement.src = 'img/muffin-grey.svg';

  form.reset();
  typeElement.dispatchEvent(new Event('change', { 'bubbles': true }));
  pristine.validate();
};

form.addEventListener('submit', function (evt) {
  if (!pristine.validate()) {
    showError('Проверьте введенные данные');
    evt.preventDefault();
  }
  else {
    try {
      this.submit();
    }
    catch (err) {
      showError(err.name);
      return;
    }

    reset();
    showSuccess();
  }
});

form.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  reset();
});

priceElement.placeholder = LIVING_TYPE_MIN_PRICE[typeElement.value];
priceElement.min = LIVING_TYPE_MIN_PRICE[typeElement.value];
pristine.validate();
