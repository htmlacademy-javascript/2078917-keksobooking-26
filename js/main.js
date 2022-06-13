function getRandomInt(start, end) {
  //Если аргумент не число, либо строка, либо меньше нуля, либо не целое, то возвращает не число ( NaN)
  if (isNaN(start) || isNaN(end) ||
    typeof start !== 'number' || typeof end !== 'number' ||
    start < 0 || end < 0 ||
    start % 1 !== 0 || end % 1 !== 0 ||
    start >= end) {
    /*console.log(`Параметр 1 (начало диапазона) - положительное число.
Параметр 2 (конец диапазона)- положительныое число.
Параметр 3 (число знаков после запятой) - целое положительное число.`);*/
    return NaN;
  }
  return Math.round((end - start) * Math.random() + start);
}

getRandomInt(1,10);

function getRandomFrac(start, end, fractionLen) {
  if (!isFinite(start) || !isFinite(end) || !isFinite(fractionLen) ||
    typeof start !== 'number' || typeof end !== 'number' || typeof fractionLen !== 'number' ||
    start < 0 || end < 0 || fractionLen < 0 ||
    fractionLen % 1 !== 0 ||
    start >= end) {
    /*console.log(`Параметр 1 (начало диапазона) - положительное число.
Параметр 2 (конец диапазона)- положительныое число.
Параметр 3 (число знаков после запятой) - целое положительное число.`);*/
    return NaN;
  }
  const randomNum = (end - start) * Math.random() + start;
  return +randomNum.toFixed(fractionLen);
}

getRandomFrac(2.5,100.1,5);

function IsFitted(string, maxLength) {
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

IsFitted('qwerty', 6);
