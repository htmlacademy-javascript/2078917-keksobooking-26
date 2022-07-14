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

//вып-ся после обноволения filter
export const resetMap = (map, mainPin, pinsGroup) => {
  pinsGroup.clearLayers();
  returnMainPin(mainPin);
  returnMapView(map);
  loadPinsGroup(pinsGroup);
  closeBaloons(pinsGroup);
};
