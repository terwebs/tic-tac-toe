const makePlayer = function(name, marker){
    return {name, marker}
}

const player1 = makePlayer('Player 1', 'x')
const player2 = makePlayer('Player 2', 'o')


const winLines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [6,4,2]
]

const gameBoard = document.querySelector('.game-board')
const allCells = document.querySelectorAll('.board-cell')
const title = document.querySelector('.title-results')
const restartBtn = document.querySelector('.btn')

let isPlayer2turn = false
let isGameOver = false
let currentPlayerMark = '';
let moves = 0

const startGame = function(){
    isPlayer2turn = false;
    for(let cell of allCells){
        cell.addEventListener('click', clickEvent)
    }
    title.innerText = "Let's play!"
}

function clickEvent(event){
    let cell = event.target
    if(!cell.innerText){
        if(!isPlayer2turn){
            currentPlayerMark = player1.marker;
        }else {
            currentPlayerMark = player2.marker;
        }
        placeMark(cell, currentPlayerMark)
        if (checkWin(currentPlayerMark)) {
            endGame(false)
        } 
        else if (isDraw()){
            endGame(true)
        } 
        else {
            switchPlayer()
        }
    }
    
}

const placeMark = (cell, currentPlayerMark)=> {
    cell.color = 'white'
    cell.innerText = currentPlayerMark;
    cell.classList.add(currentPlayerMark)
    moves ++
}

const switchPlayer = function(){
    isPlayer2turn = !isPlayer2turn;
}

const isDraw = ()=> {
   if (moves === 9){
    return true
   } else {
    return false
   }
}

function endGame(draw){
    if (draw){
        title.innerText = "It's a draw!"
    } else {
        if (currentPlayerMark === player1.marker){
            title.innerHTML = `Player <span>${player1.marker}</span> wins!`
            const winner = document.querySelector('span')
            winner.classList.add(player1.marker)
            // title.innerText = `Player ${player1.marker} wins!`
        } else{
            title.innerHTML = `Player <span>${player2.marker}</span> wins!`
            const winner = document.querySelector('span')
            winner.classList.add(player2.marker)
        }
        
    }
    for (cell of allCells){
        if (!cell.innerText){
            cell.innerText = '-'
        }
    }
}

function checkWin(currentPlayerMark){
    return winLines.some(function checkCombo (combination){
        return combination.every(function checkCellContent(index){
            if(allCells[index].innerText===currentPlayerMark){
                return true 
            } else {
                return false
            }
        })
    })
}

startGame()

restartBtn.addEventListener('click', ()=>{
    moves = 0
    for (cell of allCells){
        cell.classList.remove('x')
        cell.classList.remove('o')
        cell.innerText = ''
    }
    startGame()
})



