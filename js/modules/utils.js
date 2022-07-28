/**
 * Выбор слова с корректным окончанием в зависимости от числа
 *
 * @param {Number} number Число.
 * @param {Array} Массив, состоящий из трех элементов, где:
 * Первый элемент - слово с корректным окончанием, если объект 1 (например 'комната')
 * Второй элемент - слово с корректным окончанием, если объектов 2 (например 'комнаты')
 * Третий элемент - слово с корректным окончанием, если объектов 5 (например 'комнат')
 * @return {object} Выбранное слово.
 */
export const getEnding = (number, words) => {
  const oneDigitNumber = number % 10;
  const twoDigitNumber = number % 100;
  if (oneDigitNumber === 1 && twoDigitNumber !== 11) { return words[0]; }
  if ((oneDigitNumber === 2 && twoDigitNumber !== 12) ||
    (oneDigitNumber === 3 && twoDigitNumber !== 13) ||
    (oneDigitNumber === 4 && twoDigitNumber !== 14)) { return words[1]; }
  return words[2];
};

export const removeTextFromElement = (element) => {
  element.childNodes.forEach((childNode) => {
    if (childNode.nodeType === Node.TEXT_NODE) {
      childNode.remove();
    }
  });
};

export const debounce = (cb) => {
  let timeoutId = null;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(cb, 500);
  };
};

export const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return () => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback();
      lastTime = now;
    }
  };
};
