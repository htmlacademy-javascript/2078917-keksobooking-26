import { HOUSING_TYPES_EN_RU} from '../dictionary.js';
import { getEnding } from '../utils.js';

const form = document.querySelector('.notice').querySelector('.ad-form');
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  sucessClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

const LIVING_TYPE_MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const ROOMS_GUESTS = {
  '1' : ['1'],
  '2' : ['1','2'],
  '3' : ['1','2','3'],
  '100' : ['0']
};

const priceElement = form.querySelector('#price');
const typeElement = form.querySelector('#type');
pristine.addValidator(
  priceElement,
  (value) => !(parseInt(value, 10) < parseInt(priceElement.min,10)),
  () => `Минимальная цена за жилье типа '${HOUSING_TYPES_EN_RU[typeElement.value]}' должна быть ${priceElement.min} рублей за ночь`
);
typeElement.addEventListener('change', () => {
  priceElement.placeholder = LIVING_TYPE_MIN_PRICE[typeElement.value];
  priceElement.min = LIVING_TYPE_MIN_PRICE[typeElement.value];
  pristine.validate(priceElement);
});

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
roomNumberInput.addEventListener('change', () => pristine.validate(capacityInput));

const timeinElement = form.querySelector('#timein');
const timeoutElement = form.querySelector('#timeout');
timeinElement.addEventListener('change', (evt) => {
  timeoutElement.value = evt.target.value;
});
timeoutElement.addEventListener('change', (evt) => {
  timeinElement.value = evt.target.value;
});

export function ExecuteValidation() {
  priceElement.placeholder = LIVING_TYPE_MIN_PRICE[typeElement.value];
  priceElement.min = LIVING_TYPE_MIN_PRICE[typeElement.value];
  pristine.validate();
}

ExecuteValidation();

const initializeErrorElement = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.classList.add('visually-hidden');
  const errorMessageElement = errorElement.querySelector('.error__message');
  const errorInfoElement = document.createElement('p');
  errorInfoElement.classList.add('error__info');
  errorMessageElement.append(errorInfoElement);

  const errorButtonElement = errorElement.querySelector('.error__button');
  errorButtonElement.addEventListener('click', () => {
    errorElement.classList.add('visually-hidden');
  });
  document.body.append(errorElement);
  return errorElement;
};

const showError = (text) => {
  let errorElement = document.querySelector('.error');
  if (!errorElement) {
    errorElement = initializeErrorElement();
  }
  errorElement.querySelector('.error__info').textContent = text;

  const OnEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      errorElement.classList.add('visually-hidden');
    }
  };
  document.body.addEventListener('keydown', OnEscKeydown, { once: true });

  const OnDocumentClick = (evt) => {
    for (const node of errorElement.children) {
      if (node === evt.target) {
        return;
      }
    }
    errorElement.classList.add('visually-hidden');
    document.removeEventListener('click', OnDocumentClick);
  };
  document.addEventListener('click', OnDocumentClick);

  errorElement.classList.remove('visually-hidden');

};

const initializeSuccessElement = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.classList.add('visually-hidden');
  document.body.append(successElement);
  return successElement;
};

const showSuccess = () => {
  let successElement = document.querySelector('.success');
  if (!successElement) {
    successElement = initializeSuccessElement();
  }

  const OnEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      successElement.classList.add('visually-hidden');
    }
  };
  document.body.addEventListener('keydown', OnEscKeydown, { once: true });

  const OnDocumentClick = (evt) => {
    for (const node of successElement.children) {
      if (node === evt.target) {
        return;
      }
    }
    successElement.classList.add('visually-hidden');
    document.removeEventListener('click', OnDocumentClick);
  };
  document.addEventListener('click', OnDocumentClick);

  successElement.classList.remove('visually-hidden');

};

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
