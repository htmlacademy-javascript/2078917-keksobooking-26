import { pristine } from './get-pristine-object.js';
import { showError, showSuccess } from './popup.js';
import { isImage } from './utils.js';
import { getPriceFromType } from './utils.js';

const adForm = document.querySelector('.ad-form');
const avatarElement = adForm.querySelector('#avatar');
const addressElement = adForm.querySelector('#address');
const priceElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const timeinElement = adForm.querySelector('#timein');
const timeoutElement = adForm.querySelector('#timeout');
const MAX_HOUSING_PHOTOS = 10;
const photoContainerTemplateElement = adForm.querySelector('.ad-form__photo:last-of-type');
const addPhotoElement = adForm.querySelector('#images');
const resetElement = adForm.querySelector('.ad-form__reset');
const submitElement = adForm.querySelector('.ad-form__submit');
const sliderElement = adForm.querySelector('.ad-form__slider');

typeElement.addEventListener('change', () => {
  priceElement.placeholder = getPriceFromType(typeElement.value);
  priceElement.min = getPriceFromType(typeElement.value);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: +priceElement.min,
      max: +priceElement.max
    }
  });
  pristine.validate(priceElement);
});

addressElement.addEventListener('change', (evt) => {
  const addressLabelElement = adForm.querySelector('.ad-form__label');
  addressLabelElement.textContent = evt.target.value;
});

roomNumberElement.addEventListener('change', () => pristine.validate(capacityElement));

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
  typeElement.dispatchEvent(new Event('change', { 'bubbles': true }));
  pristine.validate();
};

adForm.addEventListener('submit', function (evt) {
  if (!pristine.validate()) {
    showError('error-form','Проверьте введенные данные');
    evt.preventDefault();
  }
  else {
    submitElement.disabled = true;
    try {
      this.submit();
    }
    catch (err) {
      showError('error-form',err.name);
      return;
    }
    reset();
    showSuccess();
    submitElement.disabled=false;
  }
});

resetElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  reset();
});

document.addEventListener('DOMContentLoaded', () => {
  priceElement.placeholder = getPriceFromType(typeElement.value);
  priceElement.min = getPriceFromType(typeElement.value);
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
  sliderElement.noUiSlider.on('update', () => {
    priceElement.value = sliderElement.noUiSlider.get();
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

adForm.addEventListener('reset', () => {

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


