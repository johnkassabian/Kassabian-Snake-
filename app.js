document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    
    const width = 10
    let currentIndex = 0 //first div in grid
    let appleIndex = 0 //first div in grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = .95
    let intervalTime = 0
    let interval = 0
  
  
    //start and restart the game
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      clearInterval(interval)
      score = 0
      randomApple()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 700
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    //outcomes

    function moveOutcomes() {
  
      //snake hitting stuff (border and itself)
      if (
        (currentSnake[0] + width >= (width * width) && direction === width ) || //bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //right wall
        (currentSnake[0] % width === 0 && direction === -1) || // left wall
        (currentSnake[0] - width < 0 && direction === -width) ||  // top
        squares[currentSnake[0] + direction].classList.contains('snake') //itself
      ) {
        return clearInterval(interval) //this will clear the interval if any of the above happen
        score = "GAME OVER"
      }
  
      const tail = currentSnake.pop() //removes last item  of the array and shows it
      squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
      currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array
  
      //deals with snake getting apple
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
       console.log(currentSnake)
    }
  
  
    //generate new apple once apple is eaten
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) //apples dont appear on snake
      squares[appleIndex].classList.add('apple')
    }
  
  
    //assign functions to keycodes
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
      } else if (e.keyCode === 38) {
        direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
      } else if (e.keyCode === 37) {
        direction = -1 //press left, the snake will go left one 
      } else if (e.keyCode === 40) {
        direction = +width //press down, the snake head will go 10 divs ahead, appearing to go down 
      }
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
  })