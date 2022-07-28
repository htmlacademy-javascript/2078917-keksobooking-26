import { getAdvertElement } from '../advert/get-ad-element.js';

/**
 * Изначальная позиция главного маркера
 */
export const initialLatLng = {
  lat: 35.6895,
  lng: 139.692
};

/**
 * Изначальный масштаб карты
 */
export const INITIAL_SCALE = 12;

/**
 * Перечисление групп цен: группа - полуинтервал [минимальная цена, максимальная цена)
 */
const PriceCategories = {
  MIDDLE: [10000, 50000],
  LOW: [0, 10000],
  HIGH: [50000, Infinity]
};

/**
 * Количество меток, отображающихся на карте
 */
const PINS_NUMBER = 10;

/**
 *
 * Сравнение значени из фильтра со значением, полученным от серверной чатси
 * @param {Number} originValue Значение, полученное из сервера
 * @param {String} filterValue Значение фильтра
 * @returns
 */
const isFiltered = (originValue, filterValue) => {
  if (!filterValue || filterValue === 'any') {
    return true;
  }
  return String(originValue) === String(filterValue);
};

/**
 *  Проверка наличия всех элементов одного массива в другом массиве
 * @param {Array} array Массив, проверяемый на наличие всех элементов subarray
 * @param {Array} subarray Массив, элементы которого проверяются на наличие в масссиве array
 * @returns
 */
const isIncluded = (array, subarray) => {
  if (!array || !subarray || !Array.isArray(array) || !Array.isArray(subarray)) {
    return false;
  }
  return subarray.every((value) => array.includes(value));
};

/**
 * Определение группы, в которую входит цена
 * @param {Number} price Цена
 * @returns Группа цены
 */
const getPriceCategory = (price) => {
  for (const category in PriceCategories) {
    const minPrice = PriceCategories[category][0];
    const maxPrice = PriceCategories[category][1];
    if (price >= minPrice && price < maxPrice) {
      return category.toLowerCase();
    }
  }
};

/**
 *
 * @returns Объект - фильт, полученный из DOM-дерева
 */
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
    filterFeatures: (() => {
      const filterdFeatures = [];
      featureElements.forEach((feature) => {
        if (feature.checked) {
          filterdFeatures.push(feature.value);
        }
      });
      return filterdFeatures;
    })()
  };
};

/**
 *
 * @param {Object} param0 Объект - фильтр
 * @param {Array} objects Массив объектов, полученных от серверной части
 * @returns Массив объектов, удовлетворяющий всем значениям фильтра
 */
const filterObjects = ({ filterType, filterPrice, filterRooms, filterGuests, filterFeatures }, objects) => {
  const filteredElements = [];
  for (const object of objects) {
    const { type, price, rooms, guests, features } = object.offer;
    if (isFiltered(type, filterType) &&
      isFiltered(getPriceCategory(price), filterPrice) &&
      isFiltered(rooms, filterRooms) &&
      isFiltered(guests, filterGuests) &&
      isIncluded(features, filterFeatures)) {
      filteredElements.push(object);
    }
    if (filteredElements.length === PINS_NUMBER) {
      break;
    }
  }
  return filteredElements;
};

/**
 *Создает второстепенный маркер
 * @param {Object} param0 Объект - позиция маркера на карте
 * @param {Element} baloon Элемент - карточка объявления
 * @returns Маркер карты
 */
export const getPin = ({ location }, baloon) => {
  const pin = L.marker(location);

  fetch('./img/pin.svg')
    .then((result) => {
      if (result.ok) {
        const pinIcon = L.icon({
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

/**
 * Асинхроннная загрузка с сервера данных о похожих объявлений
 * @returns JSON-объект - массив объектов
 */
export const downloadAdObjects = () =>
  fetch('https://26.javascript.pages.academy/keksobooking/data')
    .then((answer) => answer.json());

/**
 *Загружает в группу маркеров новые маркеры - похожие объявления
  * @param {Object} pinsGroup Группа маркеров
  * @param {Array} objects JSON-объекты, полученные из серверной части
  * @returns Группа маркеров
  */
export const loadPinsGroup = (pinsGroup, objects) => {
  const filteredObjects = filterObjects(getFilter(), objects);
  if (filteredObjects.length !== 0) {
    for (let i = 0; i < filteredObjects.length; i++) {
      const pin = getPin(filteredObjects[i], getAdvertElement(filteredObjects[i]));
      pin.addTo(pinsGroup);
    }
    return pinsGroup;
  }
  return null;
};

/**
 *Создает и загружает группу маркеров - похожих объявлений
 * @param {Array} objects JSON-объекты, полученные из серверной части
 * @returns Группа маркеров
 */
export const getPinsGroup = (objects) => {
  let pinsGroup = L.layerGroup();
  pinsGroup = loadPinsGroup(pinsGroup, objects);
  if (!pinsGroup) {
    throw new Error();
  }
  return pinsGroup;
};
