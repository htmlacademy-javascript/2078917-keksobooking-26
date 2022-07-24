import { initialLatLng, INITIAL_SCALE } from './utils.js';
import { loadPinsGroup } from './utils.js';

/**
 *
 * @param {Object} marker Сброс расположения главного маркера в исходное место
 */
const returnMainPin = (marker) => {
  marker.setLatLng(initialLatLng);
};

/**
 *
 * @param {Object} map Сброс масштаба карты в исходное
 */
const returnMapView = (map) => {
  map.setView(initialLatLng, INITIAL_SCALE);
};

/**
 * Закрывает все открытые всплывающие окна маркеров
 * @param {Object} pinsGroup
 */
const closeBaloons = (pinsGroup) => {
  pinsGroup.eachLayer((pin) => {
    if (pin.isPopupOpen()) {
      pin.closePopup();
    }
  });
};

/**
 * Сбрасывает состояние группы маркеров с исходное
 * @param {Object} pinsGroup Группа маркеров
 * @param {Array} adObjects JSON-объекты, полученные из серверной части
 */
export const resetPinsGroup = (pinsGroup, adObjects) => {
  if (pinsGroup) {
    closeBaloons(pinsGroup);
    pinsGroup.clearLayers();
    loadPinsGroup(pinsGroup, adObjects);
  }
};

/**
 * Сбрасывает состояние карты в исходное
 * @param {Object} map Карта
 * @param {Object} mainPin Главный маркер
 * @param {Object} pinsGroup Группа маркеров
 * @param {Array} adObjects JSON-объекты, полученные из серверной части
 */
export const resetMap = (map, mainPin, pinsGroup, adObjects) => {
  returnMainPin(mainPin);
  returnMapView(map);
  resetPinsGroup(pinsGroup, adObjects);
};
