import { setupGround, updateGround } from './ground.js'
import { setupWolf, updateWolf, getWolfRect, setWolfLose } from './wolf.js'
import { setupGodrag, updateGodrag, getGodragRects } from './godrag.js'

//variabel untuk mengatur tempatnya
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

//var untuk manggil dari html
const worldElem = document.querySelector("[data-world]")
const scoreElem = document.querySelector("[data-score]")
// const highScoreElem = document.querySelector("[data-highScore]")
const startScreenElem = document.querySelector("[data-start-screen]")

setPixelToWorldScale()
// addeventlistener untuk bisa mengendalikan
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true})

//var untuk update loop
let lastTime
let speedScale
let score
// let highScore

//update timer
function update(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta, speedScale)
    updateWolf(delta, speedScale)
    updateGodrag(delta, speedScale)
    updateSpeedScale(delta)
    updateScore(delta)
    // updatehighScore(delta)
    if(checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose(){
    const wolfRect = getWolfRect()
    return getGodragRects().some(rect => isCollision(rect, wolfRect))
}

//function jika tabrak godrag
function isCollision(rect1, rect2){
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
        )
}

//untuk update kecepatan skala
function updateSpeedScale(delta){
    speedScale += delta * SPEED_SCALE_INCREASE
}

//untuk update/memperbarui score
function updateScore(delta){
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

// function updatehighScore(delta){
//     highScore += delta * 0.01
//     highScoreElem.textContent = Math.floor(highScore)

//     if (localStorage.getItem('updatehighScore')) {
//         highScore = localStorage.getItem('updatehighScore');
//       }
  
//     // if (score > highScore) {
//     //     highScore = score;
//     //     highScoreText.t = "Highscore: " + highScore;
//     //   }
// }

function handleStart(){
    lastTime = null
    speedScale = 1
    score = 0
    // highScore = 0
    // score = 0
    setupGround()
    setupWolf()
    setupGodrag()

    // window.localStorage.setItem('highScore', highScore); 
    // if (score > highScore) {
    //     highScore = score;
    //     highScoreElem.textContent = "Highscore: " + highScore;
    //   }

    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function handleLose(){
  setWolfLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, {once: true})
    startScreenElem.classList.remove("hide")
  }, 100)
}

//mengatue pixel untuk skala tempat/board
function setPixelToWorldScale(){
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH        
    } else{
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
