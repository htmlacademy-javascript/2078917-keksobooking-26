import './modules/validation/ad-form.js';
import './modules/advert/get-advert-element.js';
import '../pristine/pristine.min.js';
import './modules/map/load-map.js';
import './modules/site-statements/activate-adform.js';
import './modules/site-statements/adctivate-filter.js';

import { initializeMap, initializeMainPin, initializePinsGroup} from './modules/map/load-map.js';
import { resetMap } from './modules/map/reset-map.js';
import { activateAdform } from './modules/site-statements/activate-adform.js';
import { activateFilter } from './modules/site-statements/adctivate-filter.js';

activateAdform(false);
activateFilter(false);

const map = initializeMap();
const mainPin = initializeMainPin(map);
if (map && mainPin) {
  activateAdform(true);

  const pinsGroup = initializePinsGroup(map);
  if (pinsGroup) {
    activateFilter(true);

    const filterElement = document.querySelector('.map__filters');
    const resetButtonElement = document.querySelector('.ad-form__reset');
    resetButtonElement.addEventListener('click', () => {
      resetMap(map, mainPin, pinsGroup);
    });

    filterElement.addEventListener('change', () => {
      resetMap(map, mainPin, pinsGroup);
    });

  //   const filterFeatureElements = document.querySelector('.map__features');
  //   filterFeatureElements.addEventListener('change', (evt) => {
  //     //if (evt.target.className === 'map__checkbox') {
  //       resetMap(map, mainPin, pinsGroup);
  //     //}
    //});
  }
}
