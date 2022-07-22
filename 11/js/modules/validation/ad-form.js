import { pristine } from './get-pristine-object.js';
import { showError, showSuccess } from './show-popup.js';
import { isImage } from './utils.js';
import { getHousingTypePrice } from './utils.js';

const MAX_HOUSING_PHOTOS = 10;
const adForm = document.querySelector('.ad-form');
const avatarElement = adForm.querySelector('#avatar');
const priceElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const timeinElement = adForm.querySelector('#timein');
const timeoutElement = adForm.querySelector('#timeout');
const photoContainerTemplateElement = adForm.querySelector('.ad-form__photo:last-of-type');
const addPhotoElement = adForm.querySelector('#images');
const resetElement = adForm.querySelector('.ad-form__reset');
const submitElement = adForm.querySelector('.ad-form__submit');
const sliderElement = adForm.querySelector('.ad-form__slider');

const onFormReset = () => {
  //Удаление всех изображений жилья
  const photosContainerElement = document
    .querySelector('.ad-form')
    .querySelector('.ad-form__photo-container');
  const photoContainerElements = photosContainerElement.querySelectorAll('.ad-form__photo--added');
  const photosNumber = photoContainerElements.length;
  photoContainerElements.forEach((photoContainer) => {
    photoContainer.parentNode.removeChild(photoContainer);
  });
  if (photosNumber === MAX_HOUSING_PHOTOS) {
    photosContainerElement.append(photoContainerTemplateElement);
  }
  //const propertyPhotos = adForm.querySelector('.ad-form__photo');
  //while (propertyPhotos.lastChild) {
  //  propertyPhotos.removeChild(propertyPhotos.lastChild);
  //}
  //Сброс аватарки
  const avatarImageElement = adForm.querySelector('.ad-form-header__preview img');
  avatarImageElement.src = 'img/muffin-grey.svg';

  adForm.reset();

  //сброс фильтра
  const formMap = document.querySelector('.map__filters');
  formMap.reset();

  typeElement.dispatchEvent(new Event('change', { 'bubbles': true }));
  sliderElement.noUiSlider.reset();
  pristine.validate();
};

priceElement.addEventListener('input', (evt) => {
  if (evt.target.value > sliderElement.noUiSlider.options.range.max) {
    sliderElement.noUiSlider.set(sliderElement.noUiSlider.options.range.max);
    return;
  }
  if (evt.target.value < sliderElement.noUiSlider.min || !evt.target.value) {
    sliderElement.noUiSlider.set(sliderElement.noUiSlider.options.range.min);
    return;
  }
  sliderElement.noUiSlider.set(evt.target.value);
});

typeElement.addEventListener('change', () => {
  priceElement.placeholder = getHousingTypePrice(typeElement.value);
  priceElement.min = getHousingTypePrice(typeElement.value);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: parseInt(priceElement.min,10),
      max: parseInt(priceElement.max,10)
    }
  });
  priceElement.dispatchEvent(new Event('input', { 'bubbles': true }));
  pristine.validate(priceElement);
});

roomNumberElement.addEventListener('change', () => {
  pristine.validate(capacityElement);
});

timeinElement.addEventListener('change', (evt) => {
  timeoutElement.value = evt.target.value;
});

timeoutElement.addEventListener('change', (evt) => {
  timeinElement.value = evt.target.value;
});

const onInvalidForm = (cb) => {
  adForm.querySelectorAll('.ad-form__error').forEach((element) => {
    (async () => {
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            element.style.color = 'tomato';
            resolve();
          }, 300);
        });
        await new Promise((resolve) => {
          setTimeout(() => {
            element.style.color = 'black';
            resolve();
          }, 300);
        });
      }
      cb();
    })();
  });
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    submitElement.disabled = true;
    onInvalidForm(() => {submitElement.disabled = false;});
  }
  else {
    submitElement.disabled = true;
    fetch('https://26.javascript.pages.academy/keksobooking', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data'
      },
      body: new FormData(adForm)
    })
      .then(()=>{
        onFormReset();
        showSuccess();
      })
      .catch(()=>{
        showError('error-form', 'Ошибка отправки формы');
      })
      .finally(() => {
        submitElement.disabled = false;
      });
  }
});

resetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  onFormReset();
});

document.addEventListener('DOMContentLoaded', () => {
  priceElement.placeholder = getHousingTypePrice(typeElement.value);
  priceElement.min = getHousingTypePrice(typeElement.value);
  noUiSlider.create(sliderElement, {
    range: {
      min: +priceElement.min,
      max: +priceElement.max
    },
    start: +priceElement.min,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) { return value.toFixed(0); },
      from: function (value) { return parseInt(value, 10); }
    }
  });
  sliderElement.noUiSlider.on('slide', () => {
    priceElement.value = sliderElement.noUiSlider.get();
    pristine.validate(priceElement);
  });
  pristine.validate();
});

addPhotoElement.addEventListener('change', (evt) => {
  const photoContainersElement = document
    .querySelector('.ad-form')
    .querySelector('.ad-form__photo-container');
  const newPhotos = evt.target.files;
  const previousPhotos = photoContainersElement.querySelectorAll('.ad-form__photo--added');
  if ((newPhotos.length + previousPhotos.length) > MAX_HOUSING_PHOTOS) {
    evt.target.value = '';
    showError('error-image',`Разрешено добавлять не более ${MAX_HOUSING_PHOTOS} изображений`);
    return;
  }
  for (const photo of newPhotos) {
    if (!isImage(photo)) {
      evt.target.value = '';
      showError('error-image','Разрешено добавлять только изображения');
      return;
    }
  }
  for (const photo of newPhotos) {
    const photoContainerElement = photoContainerTemplateElement.cloneNode(false);
    photoContainerElement.classList.add('ad-form__photo--added');
    const housingPhoto = document.createElement('img');
    housingPhoto.style.width = '70px';
    housingPhoto.style.height = '70px';
    housingPhoto.alt = 'Фото жилья';
    housingPhoto.src = window.URL.createObjectURL(photo);
    photoContainerElement.append(housingPhoto);
    photoContainersElement.insertBefore(photoContainerElement, photoContainerTemplateElement);
    //const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
    //avatarPreviewElement.src = window.URL.createObjectURL(avatarImage[0]);
  }
  if (newPhotos.length === (MAX_HOUSING_PHOTOS - previousPhotos.length)) {
    photoContainerTemplateElement.remove();
  }
});

avatarElement.addEventListener('change', (evt) => {
  const avatarImage = evt.target.files;
  if (avatarImage.lenth !== 0 && isImage(avatarImage[0])) {
    const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
    avatarPreviewElement.src = window.URL.createObjectURL(avatarImage[0]);
  }
  else {
    evt.target.value = '';
    // alert('Некорректный тип файла');
  }
});
