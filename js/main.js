function getRandomInt(firstNum,lastNum) {

  if (firstNum >= lastNum || firstNum < 0) {
    return('Неверно заданный диапазон');
  }
  return(Math.floor(Math.random() * (lastNum - firstNum + 1))+firstNum);


}

function getRandomFloat(firstNum,lastNum,floatingPointNumber) {

  if (firstNum >= lastNum || firstNum < 0) {
    return('Неверно заданный диапазон');
  }


  return((Math.random() * (lastNum - firstNum + 1) + firstNum).toFixed(floatingPointNumber));


}

getRandomFloat(5.1, 66.4,4);
getRandomInt(90,188);
