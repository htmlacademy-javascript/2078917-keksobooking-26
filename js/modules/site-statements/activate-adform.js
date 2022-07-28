/**
 *
 * @param {Boolean} toActive true - перевод формы заполнения в активный режим, false - в неактивный
 */
export const activateAdform = (toActive) => {
  const formAd = document.querySelector('.ad-form');
  const sliderElement = formAd.querySelector('.ad-form__slider');

  if (toActive) {
    formAd.classList.remove('ad-form--disabled');
    sliderElement.removeAttribute('disabled');
  }
  else {
    formAd.classList.add('ad-form--disabled');
    sliderElement.setAttribute('disabled', toActive);
  }

  formAd.querySelectorAll('fieldset').forEach((field) => {
    field.disabled = !toActive;
  });

  sliderElement.querySelector('.noUi-origin > div').tabIndex = toActive ? '0' : '-1';

};
