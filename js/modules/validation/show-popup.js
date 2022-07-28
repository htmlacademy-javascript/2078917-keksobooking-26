import { removeTextFromElement } from '../utils.js';

/**
 * Массив слушателей событий
 */
const eventList = [];

/**
 * Добавляет обработчик события к элементу, добавляет событие в массив слушателей событий eventList
 * @param {Object} element Элемент, на который вешается событие
 * @param {String} event Тип события
 * @param {Object} handler Указатель на обработчик события
 */
const addEvent = (element, event, handler,) => {
  eventList.push({
    element: element,
    event: event,
    handler: handler
  });
  element.addEventListener(event, handler);
};

/**
 * Удаляет все слушатели событий, которые есть в массиве, массив очищается
 */
const removeEvents = () => {
  while (eventList.length > 0) {
    const eventListener = eventList[eventList.length - 1];
    eventListener.element.removeEventListener(eventListener.event, eventListener.handler);
    eventList.pop();
  }
};

/**
 * Создает DOM-элемент - сообщение об ошибке и добавляет в конец тега body
 * @returns DOM-элемент - сообщение об ошибке
 */
const initializeErrorElement = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.classList.add('visually-hidden');
  const errorMessageElement = errorElement.querySelector('.error__message');
  const errorInfoElement = document.createElement('p');
  errorInfoElement.classList.add('error__info');
  errorMessageElement.append(errorInfoElement);

  const errorButtonElement = errorElement.querySelector('.error__button');
  errorButtonElement.addEventListener('click', () => {
    errorElement.classList.add('visually-hidden');
    removeEvents();
  });
  document.body.append(errorElement);
  return errorElement;
};

/**
 * Нажата ли клавиша Esc
 * @param {Event} evt Событие
 */
const isEscKeydown = (evt) => evt.key === 'Escape';

/**
 * Произошло ли событие вне элемента
 * @param {Event} evt Событие
 * @param {Element} element Элемент
 */
const isOutOfElementClick = (evt, element) => {
  for (const node of element.children) {
    if (node === evt.target ||
      (node.hasChildNodes() && !isOutOfElementClick(evt, node))) {
      return false;
    }
  }
  return true;
};

/**
   * Скрывает элемент в случае выполнения условия
   * @param {} element Элемент
   * @param {*} isProperEvent Условие
   */
const hideElement = (element, isProperEvent) =>
  (evt) => {
    if (isProperEvent(evt, element)) {
      element.classList.add('visually-hidden');
      removeEvents();
    }
  };

/**
 * Создает DOM-элемент - сообщение об ошибке и заполняет текст сообщения, объявляет события
 * @param {String} type Тип ошибки, от него зависит верхний текст сообщения
 * @param {String} text Текст ошибки, размещен ниже типа ошибки
 */
export const showError = (type, text) => {
  let errorElement = document.querySelector('.error');
  if (!errorElement) {
    errorElement = initializeErrorElement();
  }
  const errorMessage = errorElement.querySelector('.error__message');
  const errorInfo = errorElement.querySelector('.error__info');
  removeTextFromElement(errorMessage);
  switch (String(type).toUpperCase()) {
    case 'ERROR-FORM':
      errorMessage.prepend('Ошибка размещения объявления');
      break;
    case 'ERROR-IMAGE':
      errorMessage.prepend('Ошибка размещения изображения');
      break;
    case 'ERROR-LOAD':
      errorMessage.prepend('Ошибка загрузки');
      break;
    case 'ERROR':
      errorMessage.prepend('Ошибка');
      break;
  }
  errorInfo.textContent = text;

  addEvent(document, 'keydown', hideElement(errorElement, isEscKeydown));
  addEvent(document, 'click', hideElement(errorElement, isOutOfElementClick));

  errorElement.classList.remove('visually-hidden');
};

/**
 * Создает DOM-элемент - сообщение об успешной отправке формы и добавляет в конец тега body
 * @returns DOM-элемент - сообщение об успешной отправке формы
 */
const initializeSuccessElement = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.classList.add('visually-hidden');
  document.body.append(successElement);
  return successElement;
};

/**
 * Создает DOM-элемент - сообщение об успешной отправке формы, объявляет события
 */
export const showSuccess = () => {
  let successElement = document.querySelector('.success');
  if (!successElement) {
    successElement = initializeSuccessElement();
  }

  addEvent(document, 'keydown', hideElement(successElement, isEscKeydown));
  addEvent(document, 'click', hideElement(successElement, isOutOfElementClick));

  successElement.classList.remove('visually-hidden');

};

/**
 *Создает DOM-элемент - не закрывающееся сообщение об ошибке, добавляет в начало тэга body
 * @param {String} text Текст ошибки
 */
export const showPermanentError = (text) => {
  const error = document.createElement('div');
  error.textContent = text;
  error.style.background = 'tomato';
  error.style.color = 'white';
  error.style.padding = '20px';
  error.style.textAlign = 'center';
  document.body.prepend(error);
};
