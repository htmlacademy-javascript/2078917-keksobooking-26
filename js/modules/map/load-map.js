import { getInitialLatLng, getInitialScale, loadPinsGroup } from './utils.js';
import { showError } from '../validation/popup.js';

export const initializeMap = () => {
  let map = L.map('map-canvas');//что если передать 'dacsfvwsevs'
  map
    // .once('tileload', () => changeFilterState(true))
    .setView(getInitialLatLng(), getInitialScale());
  L
    .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .once('tileerror', () => {
      map.remove();
      map = null;
      showError('error-load','Не удалось подключить плиточную карту');

    })
    .addTo(map);
  return map;
};

export const initializeMainPin = (map) => {
  const mainPinIcon = L.icon({
    iconUrl: '../../../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [52, 26]
  });
  const onMoveendPin = (latlng) => {
    const coordsElement = document
      .querySelector('.ad-form')
      .querySelector('#address');
    const lat = latlng.lat.toFixed(5);
    const lng = latlng.lng.toFixed(5);
    coordsElement.value = `${lat} ${lng}`;
  };
  return L.marker(
    getInitialLatLng(),
    {
      draggable: true,
      icon: mainPinIcon///////////////////что если передать несуществующий путь
    }
  )
    .on('move', (evt) => {
      onMoveendPin(evt.target.getLatLng());
    })
    .once('add', (evt) => {
      onMoveendPin(evt.target.getLatLng());
    })
    .addTo(map);
};

export const initializePinsGroup = (map) => {
  let pinsGroup = L.layerGroup().addTo(map);
  pinsGroup = loadPinsGroup(pinsGroup);
  return pinsGroup;
};

// export const loadMap = (map) => {
//   const pinsGroup = initializePinsGroup(map);
//   return pinsGroup;
// };
