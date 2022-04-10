import { isEscapeKey } from './util.js';

// Вывод сообщения об успешности отправки формы
const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const showMessage = (message) => {
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

export {showMessage, successMessage, errorMessage};
