const isEscapeKey = (key) => key === 'Escape';

const debounce = (cb, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {debounce, isEscapeKey};
