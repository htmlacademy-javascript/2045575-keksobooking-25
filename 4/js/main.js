function getRandomInt(firstNum, lastNum) {
  if (firstNum >= lastNum || firstNum < 0) {
    return null;
  }

  return(Math.floor(Math.random() * (lastNum - firstNum + 1)) + firstNum);
}

function getRandomFloat(firstNum, lastNum, floatingPointNumber) {
  if (firstNum >= lastNum || firstNum < 0) {
    return null;
  }

  return((Math.random() * (lastNum - firstNum) + firstNum).toFixed(floatingPointNumber));
}

getRandomFloat(99, 100, 4);
getRandomInt(90, 100);
