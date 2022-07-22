import { getAdvertElement } from '../advert/get-advert-element.js';

const TOKYO_LAT = 35.6895;
const TOKYO_LNG = 139.692;
const INITIAL_SCALE = 12;

const priceCategories = {
  MIDDLE: [10000, 50000],
  LOW: [0, 10000],
  HIGH: [50000, Infinity]
};

const isFiltered = (originValue, filterValue) => {
  if (!filterValue || filterValue === 'any') {
    return true;
  }
  return String(originValue) === String(filterValue);
};

const isIncluded = (array, subarray) => {
  if (!array || !subarray || !Array.isArray(array) || !Array.isArray(subarray)) {
    return false;
  }
  return subarray.every((value) => array.includes(value));
};

const getPriceCategory = (price) => {
  for (const category in priceCategories) {
    if (price >= priceCategories[category][0] && price < priceCategories[category][1]) {
      return category.toLowerCase();
    }
  }
};

const getFilter = () => {
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
    filterRooms: roomsElement ? roomsElement.options[roomsElement.selectedIndex].value : null,
    filterGuests: guestsElement ? guestsElement.options[guestsElement.selectedIndex].value : null,
    filterFeatures: Array.from(featureElements).filter((feature) => feature.checked).map((feature) => feature.value)
  };
};

const filterObjects = (filter, objects) => {
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

export const getInitialLatLng = () => ({
  lat: TOKYO_LAT,
  lng: TOKYO_LNG
});

export const getInitialScale = () => INITIAL_SCALE;

export const getPin = ({ location }, baloon) => {
  const pin = L.marker(location);

  let pinIcon = null;
  fetch('./img/pin.svg')
    .then((result) => {
      if (result.ok) {
        pinIcon = L.icon({
          iconUrl: './img/pin.svg',
          iconSize: [40, 40]
        });
        pin.setIcon(pinIcon)
          .bindPopup(baloon, { offset: [1, 28] });
      }
      else {
        pin.bindPopup(baloon, { offset: [0, 42] });
      }
    });
  return pin;
};

const addToPinsGroup = (pinsGroup, filteredObjects) => {
  for (let i = 0; i < Math.min(filteredObjects.length, 10); i++) {
    const pin = getPin(filteredObjects[i], getAdvertElement(filteredObjects[i]));
    pin.addTo(pinsGroup);
  }
  return pinsGroup;
};

export const downloadAdObjects = () =>
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((answer) => answer.json());

export const loadPinsGroup = (pinsGroup, objects) => {
  const filteredObjects = filterObjects(getFilter(), objects);
  if (filteredObjects.length !== 0) {
    return addToPinsGroup(pinsGroup, filteredObjects);
  }
  return null;
};

export const getPinsGroup = (objects) =>
{
  const pinsGroup = L.layerGroup();
  loadPinsGroup(pinsGroup, objects);
  if (!pinsGroup) {
    throw new Error();
  }
  return pinsGroup;
};
