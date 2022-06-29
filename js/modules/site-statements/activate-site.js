export const changeFormState = (toActive) => {
  const form = document.querySelector('.ad-form');
  if (toActive) {
    form.classList.remove('ad-form--disabled');
  }
  else {
    form.classList.add('ad-form--disabled');
  }

  const formHeader = form.querySelector('.ad-form-header');
  formHeader.querySelector('#avatar').disabled = !toActive;
  form.querySelector('#title').disabled = !toActive;
  form.querySelector('#address').disabled = !toActive;
  form.querySelector('#type').disabled = !toActive;
  form.querySelector('#price').disabled = !toActive;
  form.querySelector('.ad-form__slider').disabled = !toActive;
  form.querySelector('#timein').disabled = !toActive;
  form.querySelector('#timeout').disabled = !toActive;
  form.querySelector('#room_number').disabled = !toActive;
  form.querySelector('#capacity').disabled = !toActive;
  form.querySelectorAll('.features__checkbox').forEach((checkbox) => {checkbox.disabled = !toActive;});
  form.querySelector('#description').disabled = !toActive;
  form.querySelector('#images').disabled = !toActive;
  form.querySelector('.ad-form__submit').disabled = !toActive;
  form.querySelector('.ad-form__reset').disabled = !toActive;

  //или
  // formHeader.disabled = !toActive;
  // form.querySelectorAll('.ad-form__element').forEach((field) => {
  //   field.disabled = !toActive;
  // });
};
