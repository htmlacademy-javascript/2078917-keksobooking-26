/**
 * Возвращает случайное целое число из [start, end]
 *
 * @param {number} start Начало отрезка. Целое положительное число.
 * @param {number} end Конец отрезка. Целое положительное число.
 * @return {number} Случайное целое число из отрезка.
 */
export function getRandomInt(start, end) {
  if (isNaN(start) || isNaN(end) ||
    typeof start !== 'number' || typeof end !== 'number' ||
    start < 0 || end < 0 ||
    start % 1 !== 0 || end % 1 !== 0 ||
    start > end) {
    /*console.log(`Параметр 1 (начало диапазона) - положительное число.
Параметр 2 (конец диапазона)- положительныое число.
Параметр 3 (число знаков после запятой) - целое положительное число.`);*/
    return NaN;
  }
  return Math.round((end - start) * Math.random() + start);
}

/**
 * Возвращает случайное число из отрезка [start, end] с fractionLen количеством цифр после запятой
 *
 * @param {number} start Начало отрезка. Положительное число.
 * @param {number} end Конец отрезка. Положительное число.
 * @param {number} fractionLen Цифр после запятой у сгенерированного числа.
 * @return {number} Случайное число.
 */
export function getRandomFrac(start, end, fractionLength) {
  if (!isFinite(start) || !isFinite(end) || !isFinite(fractionLength) ||
    typeof start !== 'number' || typeof end !== 'number' || typeof fractionLength !== 'number' ||
    start < 0 || end < 0 || fractionLength < 0 ||
    fractionLength % 1 !== 0 ||
    start > end) {
    /*console.log(`Параметр 1 (начало диапазона) - положительное число.
Параметр 2 (конец диапазона)- положительныое число.
Параметр 3 (число знаков после запятой) - целое положительное число.`);*/
    return NaN;
  }
  const randomNum = (end - start) * Math.random() + start;
  return +randomNum.toFixed(fractionLength);
}

/**
 * 'Истина', если длина строки string меньше или равно maxLength
 *
 * @param {string} string Строка
 * @param {number} maxLength Количество символов для сравнения с количеством символов строки string
 * @return {boolean} 'Истина', если длина строки string меньше или равно maxLength. В остальных случаях - 'Ложь'
 */
export function IsFitted(string, maxLength) {
  if (isNaN(maxLength) ||
    typeof maxLength !== 'number' ||
    maxLength < 0 ||
    maxLength % 1 !== 0 ||
    typeof string !== 'string') {
    /*console.log(`Первый параметр - строка.
Второй параметр (максимальная длина) - целое положительное число`);*/
    return false;
  }
  return string.length <= maxLength;
}

/**
 * Случайный отбор элемента из массива.
 *
 * @param {Array} items Массив
 * @return {object} Случайный элемент массива
 */
export const GetRandomItem = (items) => items[getRandomInt(0, items.length - 1)];

/**
 * Создание подмассива случайной длины из неповторяющихся элементов исходного массива.
 *
 * @param {Array} items Исходный массив.
 * @return {object} Массив случайной длины, состоящий из неповторяющихся элементов исходного массива.
 */
export const getRandomSubarray = (items) => {
  const itemsIndexes = [...Array(items.length).keys()];
  //items.forEach((item, index) => itemsIndexes.push(index));
  const subarrayLength = getRandomInt(1, items.length);
  const subarray = Array(subarrayLength);
  for (let i = 0; i < subarray.length; i++) {
    const randomIndex = getRandomInt(0, itemsIndexes.length - 1);
    subarray[i] = items[itemsIndexes[randomIndex]];
    itemsIndexes.splice(randomIndex, 1);
  }
  return subarray;
};

/**
 * Создание массива случайной длины из элементов исходного массива.
 *
 * @param {Array} items Исходный массив.
 * @return {object} Массив случайной длины, состоящий из элементов исходного массива.
 */
export const getRandomArray = (items) => {
  const randomArrayLength = getRandomInt(1, 12);
  const randomArray = Array(randomArrayLength);
  for (let i = 0; i < randomArray.length; i++) {
    randomArray[i] = GetRandomItem(items);
  }
  return randomArray;
};
