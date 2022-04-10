const SEND_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/';
const GET_DATA_URL = 'https://25.javascript.pages.academy/keksobooking/data';

const sendData = (onSuccess, onError, body) => {
  fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

const getData = (onSuccess, onError) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onError();
      }
    })
    .then((data) => onSuccess(data));
};

export {sendData, getData};
