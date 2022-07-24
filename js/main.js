import './modules/validation/ad-form.js';
import { initializeMap, getMainPin } from './modules/map/load-map.js';
import { resetMap } from './modules/map/reset-map.js';
import { activateAdform } from './modules/site-statements/activate-adform.js';
import { activateFilter } from './modules/site-statements/activate-filter.js';
import { getPinsGroup } from './modules/map/utils.js';
import { showPermanentError } from './modules/validation/show-popup.js';
import { downloadAdObjects } from './modules/map/utils.js';
import { resetPinsGroup } from './modules/map/reset-map.js';
import { debounce } from './modules/utils.js';

const filterElement = document.querySelector('.map__filters');
const resetButtonElement = document.querySelector('.ad-form__reset');
const isActive = true;
const isDisabled = false;
activateAdform(isDisabled);
activateFilter(isDisabled);

initializeMap(
  (map) => {//onSuccess
    const mainPin = getMainPin();
    mainPin.addTo(map);
    activateAdform(isActive);
    let adObjects = null;
    downloadAdObjects()
      .then((objects) => {
        adObjects = objects;
        return getPinsGroup(objects);
      })
      .then((pinsGroup) => {
        pinsGroup.addTo(map);
        activateFilter(isActive);
        filterElement.addEventListener('change', debounce(() => resetPinsGroup(pinsGroup, adObjects)));
        resetButtonElement.addEventListener('click', () => resetMap(map, mainPin, pinsGroup, adObjects));
        filterElement.addEventListener('reset', () => resetMap(map, mainPin, pinsGroup, adObjects));
      })
      .catch(() => {
        showPermanentError('Не удалось загрузить объявления');
        resetButtonElement.addEventListener('click', () => resetMap(map, mainPin, null, adObjects));
        filterElement.addEventListener('reset', () => resetMap(map, mainPin, null, adObjects));
      });
  },
  (map) => {//onError
    map.remove();
    showPermanentError('Не удалось подключить плиточную карту. Попробуйте обновить страницу.');
  });
