import { getAdvertElement } from '../advert/get-advert-element.js';
import { getAdvertObjects } from '../advert/get-advert-objects.js';
import { showError } from '../validation/popup.js';

const TOKYO_LAT = 35.6895;
const TOKYO_LNG = 139.692;
const INITIAL_SCALE = 12;

export const getInitialLatLng = () => ({
  lat: TOKYO_LAT,
  lng: TOKYO_LNG
});

const PRICE_CATEGORIES = {
  'middle': [10000, 50000],
  'low': [0, 10000],
  'high': [50000, Infinity]
};

export const getInitialScale = () => INITIAL_SCALE;

export const isFiltered = (originValue, filterValue) => {
  if (!filterValue || filterValue === 'any') {
    return true;
  }
  return originValue === filterValue;
};

export const isIncluded = (array, subarray) => subarray.every((value) => array.includes(value));

export const getPriceCategory = (price) => {
  for (const category in PRICE_CATEGORIES) {
    if (price >= PRICE_CATEGORIES[category][0] && price < PRICE_CATEGORIES[category][1]) {
      return category;
    }
  }
};

export const getFiler = () => {
  const filterElement = document.querySelector('.map__filters');
  const typeElement = filterElement.querySelector('#housing-type');
  const priceElement = filterElement.querySelector('#housing-price');
  const roomsElement = filterElement.querySelector('#housing-rooms');
  const guestsElement = filterElement.querySelector('#housing-guests');
  const featureElements = filterElement
    .querySelector('#housing-features')
    .querySelectorAll('.map__checkbox');

  return {
    filterType: typeElement ? typeElement.options[typeElement.selectedIndex].value : null,
    filterPrice: priceElement ? priceElement.options[priceElement.selectedIndex].value : null,
    filterRooms: roomsElement ? +roomsElement.options[roomsElement.selectedIndex].value : null,
    filterGuests: guestsElement ? +guestsElement.options[guestsElement.selectedIndex].value : null,
    filterFeatures: Array.from(featureElements).filter((feature) => feature.checked).map((feature) => feature.value)
  };
};

export const filterObjects = (filter, objects) => {
  const { filterType, filterPrice, filterRooms, filterGuests, filterFeatures } = filter;
  const filteredElements = [];
  objects.forEach((element) => {
    const { type, price, rooms, guests, features } = element.offer;
    if (isFiltered(type, filterType) &&
      isFiltered(getPriceCategory(price), filterPrice) &&
      isFiltered(rooms, filterRooms) &&
      isFiltered(guests, filterGuests) &&
      isIncluded(features, filterFeatures)) {
      filteredElements.push(element);
    }
  });
  return filteredElements;
};

export const getPin = ({ location }, baloon) => {
  const pinIcon = L.icon({
    iconUrl: '../../../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [40, 20],
    popupAnchor: [-57, 10]
  });
  return L.marker(location,
    {
      icon: pinIcon
    })
    .bindPopup(baloon, { offset: [40, 20] });
};

export const loadPinsGroup = (pinsGroup) => {
  let adObjects = null;
  try {
    adObjects = getAdvertObjects(100);
    if (!Array.isArray(adObjects) || adObjects.length === 0) {throw new Error('Не удалось загрузить объявления поблизости');}
  }
  catch (err) {
    showError('error-Load',err.message);
    pinsGroup = null;
    return pinsGroup;
  }
  const filter = getFiler();
  const filteredAdObjects = filterObjects(filter, adObjects);
  for (let i = 0; i < Math.min(filteredAdObjects.length, 10); i++) {
    const pin = getPin(filteredAdObjects[i], getAdvertElement(filteredAdObjects[i]));
    pin.addTo(pinsGroup);
  }
  return pinsGroup;
};
