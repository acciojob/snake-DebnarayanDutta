
const board = document.getElementById('board')
const scoreCard = document.getElementById('score-card')
let score = 0;

const blockSize = 25;
const row = 20;
const column = 20;

let context

let snakeX = 0
let snakeY = 0

let snakeBody = []

let snakeVelocityX = 0
let snakeVelocityY = 0

let foodX;
let foodY;

let gameOver = false

window.onload = function(){
    board.width = column * blockSize
    board.height = row * blockSize
    context = board.getContext('2d') 
    placeFood();
    document.addEventListener("keyup" ,  changeSnakeDirection)
    
    setInterval(() => {
        update()
    }, 100);

}

function update(){

    if(gameOver){
        return;
    }
context.fillStyle="green"
context.fillRect(0,0,board.width,board.height)

context.fillStyle = "red"
context.fillRect(foodX,foodY,blockSize,blockSize)

//ate food
if(Math.abs(foodX-snakeX) < blockSize && Math.abs(foodY- snakeY)< blockSize){
    snakeBody.push ([foodX,foodY])
    placeFood();
    score +=1
    scoreCard.textContent = score
    console.log('called')
}

//body follow
for(let i=snakeBody.length-1; i>0;i--){
    snakeBody[i]= snakeBody[i-1]
}

//first body part following head
if(snakeBody.length>0){
    snakeBody[0] = [snakeX,snakeY]
}

//snake head
context.fillStyle = "blue"
context.fillRect(snakeX,snakeY,blockSize,blockSize)
//snake body
for(let i=0;i<snakeBody.length;i++){
    context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
}

snakeX = snakeX + snakeVelocityX*5;
snakeY = snakeY + snakeVelocityY*5;

//gameOver condition

if(snakeX < 0 || snakeY < 0 || snakeX > row*(blockSize-1) || snakeY > column*(blockSize-1)){
    gameOver = true;
    alert('game over')
}

for(let i=0;i <snakeBody.length;i++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
        gameOver = true;
        alert('game over')
    }
}

}

function changeSnakeDirection(e){
    if(e.code === 'ArrowUp' && snakeVelocityY !== 1){
        snakeVelocityX = 0
        snakeVelocityY = -1;
    }
    else if(e.code === 'ArrowDown' && snakeVelocityY !== -1){
        snakeVelocityX = 0
        snakeVelocityY = 1
    }
    else if(e.code === 'ArrowLeft' && snakeVelocityX !== 1){
        snakeVelocityX = -1
        snakeVelocityY = 0
    }
    else if(e.code === 'ArrowRight' && snakeVelocityX !== -1){
        snakeVelocityX = 1
        snakeVelocityY = 0
    }
} 

function placeFood(){
    foodX = Math.floor(Math.random()*column)*blockSize
    foodY = Math.floor(Math.random()*row)*blockSize
}//your code here
