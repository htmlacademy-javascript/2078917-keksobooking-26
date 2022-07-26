/**
 *
 * @param {Boolean} toActive true - перевод формы заполнения в активный режим, false - в неактивный
 */
export const activateAdform = (toActive) => {
  const formAd = document.querySelector('.ad-form');
  if (toActive) {
    formAd.classList.remove('ad-form--disabled');
  }
  else {
    formAd.classList.add('ad-form--disabled');
  }

  const formHeader = formAd.querySelector('.ad-form-header');
  formHeader.querySelector('#avatar').disabled = !toActive;

  formAd.querySelector('#title').disabled = !toActive;
  formAd.querySelector('#address').disabled = !toActive;
  formAd.querySelector('#type').disabled = !toActive;
  formAd.querySelector('#price').disabled = !toActive;
  formAd.querySelector('.ad-form__slider').disabled = !toActive;
  formAd.querySelector('#timein').disabled = !toActive;
  formAd.querySelector('#timeout').disabled = !toActive;
  formAd.querySelector('#room_number').disabled = !toActive;
  formAd.querySelector('#capacity').disabled = !toActive;
  formAd.querySelectorAll('.features__checkbox').forEach((checkbox) => {checkbox.disabled = !toActive;});
  formAd.querySelector('#description').disabled = !toActive;
  formAd.querySelector('#images').disabled = !toActive;
  formAd.querySelector('.ad-form__submit').disabled = !toActive;
  formAd.querySelector('.ad-form__reset').disabled = !toActive;
};
