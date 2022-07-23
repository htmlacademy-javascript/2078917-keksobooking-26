import { removeTextFromElement } from '../utils.js';

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

  const OnEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      errorElement.classList.add('visually-hidden');
    }
  };
  document.addEventListener('keydown', OnEscKeydown, { once: true });

  const OnDocumentClick = (evt) => {
    for (const node of errorElement.children) {
      if (node === evt.target) {
        return;
      }
    }
    errorElement.classList.add('visually-hidden');
    document.removeEventListener('click', OnDocumentClick);
  };
  document.addEventListener('click', OnDocumentClick);

  errorElement.classList.remove('visually-hidden');
};

const initializeSuccessElement = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.classList.add('visually-hidden');
  document.body.append(successElement);
  return successElement;
};

export const showSuccess = () => {
  let successElement = document.querySelector('.success');
  if (!successElement) {
    successElement = initializeSuccessElement();
  }

  const OnEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      successElement.classList.add('visually-hidden');
    }
  };
  document.addEventListener('keydown', OnEscKeydown, { once: true });

  const OnDocumentClick = (evt) => {
    for (const node of successElement.children) {
      if (node === evt.target) {
        return;
      }
    }
    successElement.classList.add('visually-hidden');
    document.removeEventListener('click', OnDocumentClick);
  };
  document.addEventListener('click', OnDocumentClick);

  successElement.classList.remove('visually-hidden');

};

export const showPermanentError = (text) => {
  const error = document.createElement('div');
  error.textContent = text;
  error.style.background = 'tomato';
  error.style.color = 'white';
  error.style.padding = '20px';
  error.style.textAlign = 'center';
  document.body.prepend(error);
};
