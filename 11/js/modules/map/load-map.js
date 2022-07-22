import { getInitialLatLng, getInitialScale } from './utils.js';


export const initializeMap = (onSuccess, onError) => {
  const map = L.map('map-canvas');
  map
    .setView(getInitialLatLng(), getInitialScale());
  L
    .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .once('tileerror', () => {
      onError(map);
    })
    .once('tileload', () => {
      onSuccess(map);
    })
    .addTo(map);
};

export const getMainPin = () => {
  const onMovePin = (latlng) => {
    const coordsElement = document
      .querySelector('.ad-form')
      .querySelector('#address');
    const lat = latlng.lat.toFixed(5);
    const lng = latlng.lng.toFixed(5);
    coordsElement.value = `${lat} ${lng}`;
  };
  const mainPin = L.marker(
    getInitialLatLng(),
    {
      draggable: true
    }
  )
    .on('move', (evt) => {
      onMovePin(evt.target.getLatLng());
    })
    .once('add', (evt) => {
      onMovePin(evt.target.getLatLng());
    });
  let mainPinIcon = null;
  fetch('./img/main-pin.svg')
    .then((result) => {
      if (result.ok) {
        mainPinIcon = L.icon({
          iconUrl: './img/main-pin.svg',
          iconSize: [52, 52],
          iconAnchor: [52, 26]
        });
        mainPin.setIcon(mainPinIcon);
      }
    });
  return mainPin;
};
