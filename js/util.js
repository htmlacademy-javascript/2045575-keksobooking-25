const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.querySelector('#alert').content.querySelector('.alert');
  const alertMessage = alertContainer.querySelector('.alert__message');

  alertMessage.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {showAlert, isEscapeKey};
