import { getInitialLatLng, getInitialScale } from './utils.js';
import { loadPinsGroup } from './utils.js';

const returnMainPin = (marker) => {
  marker.setLatLng(getInitialLatLng());
};

const returnMapView = (map) => {
  map.setView(getInitialLatLng(), getInitialScale());
};

const closeBaloons = (pinsGroup) => {
  pinsGroup.eachLayer((pin) => {
    if (pin.isPopupOpen()) {
      pin.closePopup();
    }
  });
};

export const resetPinsGroup = (pinsGroup, adObjects) => {
  if (pinsGroup) {
    closeBaloons(pinsGroup);
    pinsGroup.clearLayers();
    loadPinsGroup(pinsGroup, adObjects);
  }
};

export const resetMap = (map, mainPin, pinsGroup, adObjects) => {
  returnMainPin(mainPin);
  returnMapView(map);
  resetPinsGroup(pinsGroup, adObjects);
};
