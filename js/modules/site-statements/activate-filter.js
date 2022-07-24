/**
 *
 * @param {Boolean} toActive true - перевод панели фильтров в активный режим, false - в неактивный
 */
export const activateFilter = (toActive) => {
  const formMap = document.querySelector('.map__filters');
  if (toActive) {
    formMap.classList.remove('map__filters--disabled');
  }
  else {
    formMap.classList.add('map__filters--disabled');
  }

  formMap.querySelectorAll('.map__filter').forEach((element) => {
    element.disabled = !toActive;
  });
  formMap.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = !toActive;
  });
  //или
  //formMap.querySelector('#housing-type').disabled = !toActive;
  //formMap.querySelector('#housing-price').disabled = !toActive;
  //formMap.querySelector('#housing-rooms').disabled = !toActive;
  //formMap.querySelector('#housing-guests').disabled = !toActive;
  //formMap.querySelector('#housing-features').disabled = !toActive;
};
