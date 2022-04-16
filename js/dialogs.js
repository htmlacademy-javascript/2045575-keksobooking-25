import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

// Вывод сообщения о неуспешной загрузке данных
const alertContainer = document.querySelector('#alert').content.querySelector('.alert');

const showRequestErrorMessage = (message) => {
  const alertMessage = alertContainer.querySelector('.alert__message');
  alertMessage.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};

// Вывод сообщения об успешности отправки формы
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const showDialog = (message) => {
  document.body.append(message);

  const onMessageEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  };

  function closeMessage () {
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeyDown);
  }

  document.addEventListener('keydown', onMessageEscKeyDown);
  message.addEventListener('click', closeMessage);
};

export {showDialog, successMessage, errorMessage, showRequestErrorMessage};
