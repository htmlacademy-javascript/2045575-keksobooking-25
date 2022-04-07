const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 999;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = `${message} `;

  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

// Вывод сообщения об успешной отправке формы
const successMessage = document.querySelector('#success').content.querySelector('.success');

const onSuccessMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
};

function closeSuccessMessage () {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageEscKeyDown);
}

const showSuccessMessage = () => {
  document.body.append(successMessage);

  successMessage.addEventListener('click', closeSuccessMessage);

  document.addEventListener('keydown', onSuccessMessageEscKeyDown);
};

// Вывод сообщения о неудачной отправке формы
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const onErrorMessageEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
};

function closeErrorMessage () {
  errorMessage.remove();
  document.removeEventListener('keydown', onErrorMessageEscKeyDown);
}

const showErrorMessage = () => {
  document.body.append(errorMessage);

  document.addEventListener('keydown', onErrorMessageEscKeyDown);
  errorMessage.addEventListener('click', closeErrorMessage);
  errorButton.addEventListener('click', closeErrorMessage);
};

export {showAlert, showSuccessMessage, showErrorMessage};
