function getRandomInt(firstNum, lastNum) {
  if (firstNum >= lastNum || firstNum < 0) {
    return null;
  }

  return Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum;
}

function getRandomFloat(firstNum, lastNum, floatingPointNumber) {
  if (firstNum >= lastNum || firstNum < 0) {
    return null;
  }

  return (Math.random() * (lastNum - firstNum) + firstNum).toFixed(floatingPointNumber);
}

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const getRandomArrayLength = (array) => {
  const randomIndex = getRandomInt(0, array.length - 1);

  return array.splice(randomIndex);
};

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArrayLength};
