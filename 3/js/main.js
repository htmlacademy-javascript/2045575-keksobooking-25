function getRandomInt(firstNum,lastNum) {

  if (firstNum >= lastNum || firstNum < 0) {
    return('Неверно заданный диапазон')
  }
  return(Math.floor(Math.random() * (lastNum - firstNum + 1))+firstNum)


}

function getRandomFloat(firstNum,lastNum,floatingPointNumber) {

  if (firstNum >= lastNum || firstNum < 0) {
    return('Неверно заданный диапазон')
  }


  return((Math.random() * (lastNum - firstNum + 1) + firstNum).toFixed(floatingPointNumber))


}

console.log(getRandomFloat(11.5,556,5))
console.log(getRandomInt(5506,903))
