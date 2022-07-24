/**
 * Расширения изображений, разрешенных к загрузке
 */
const AVATAR_TYPES = [
  'image/jpeg',
  'image/png'
];

/**
 * Перечисление соотношений: тип жилья - минимальная стоимость аренды
 */
const LivingTypeMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000
};

/**
 *
 * @param {Object} element Объект File
 * @returns true - элемент является изоюражением, false - не является
 */
export const isImage = (element) => AVATAR_TYPES.some((validType) => element.type === validType);

/**
 *
 * @param {String} type Тип жилья
 * @returns Минимальная цена за указанный тип жилья
 */
export const getHousingTypePrice = (type) => LivingTypeMinPrice[type.toUpperCase()];
