import { initializeForm } from './modules/validation/ad-form.js';
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
const isActive = true;
const isDisabled = false;

initializeForm();
activateAdform(isDisabled);
activateFilter(isDisabled);

initializeMap(
  (map) => {
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
        filterElement.addEventListener('reset', () => setTimeout(() => resetMap(map, mainPin, pinsGroup, adObjects), 1));
      })
      .catch(() => {
        showPermanentError('Не удалось загрузить объявления');
        filterElement.addEventListener('reset', () => resetMap(map, mainPin, null, null));
      });
  },
  (map) => {
    map.remove();
    showPermanentError('Не удалось подключить плиточную карту. Попробуйте обновить страницу.');
  });
