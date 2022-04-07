const sendData = (onSuccess, onFailure, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking/',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFailure();
      }
    })
    .catch(() => onFailure());
};

const getData = (onSuccess, onFailure) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFailure();
      }
    })
    .then((ads) => onSuccess(ads));
};

export {sendData, getData};
