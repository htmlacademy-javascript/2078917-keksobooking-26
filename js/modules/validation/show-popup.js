import { removeTextFromElement } from '../utils.js';

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
  });
  document.body.append(errorElement);
  return errorElement;
};

/**
 * При нажатии на Esc скрывает элемент
 * @param {Event} evt Вызываемое событие
 * @param {Element} element Элемент, который необходимо скрыть
 */
const OnEscKeydown = (evt, element) => {
  if (evt.key === 'Escape') {
    element.classList.add('visually-hidden');
  }
};

/**
 * При нажатии за пределы элемента, скрыть элемент
 * @param {Event} evt Вызываемое событие
 * @param {Element} element Элемент, который необходимо скрыть
 */
const OnDocumentClick = (evt, element) => {
  for (const node of element.children) {
    if (node === evt.target) {
      return;
    }
  }
  element.classList.add('visually-hidden');
  document.removeEventListener('click', OnDocumentClick);
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

  document.addEventListener('keydown', (evt) => OnEscKeydown(evt, errorElement), { once: true });

  document.addEventListener('click', (evt) => OnDocumentClick(evt, errorElement));

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

  document.addEventListener('keydown', (evt) => OnEscKeydown(evt, successElement), { once: true });

  document.addEventListener('click', (evt) => OnDocumentClick(evt, successElement));

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
