const wolfElem = document.querySelector("[data-wolf]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.015
const WOLF_FRAME_COUNT = 7
const FRAME_TIME = 500

let isJumping
let wolfFrame
let currentFrameTime
export function setupWolf(){
    isJumping = false
    wolfFrame = 2
    currentFrameTime = 1
}

export function updateWolf(delta, speedScale){
    handleRun(delta, speedScale)
    handleJump(delta)
}

function handleRun(delta, speedScale){
    if(isJumping){
        wolfElem.src = 'img/wolf5.png'
        return
    }
    if(currentFrameTime >= FRAME_TIME){
        wolfFrame = (wolfFrame + 1) % WOLF_FRAME_COUNT
        wolfElem.src = `img/wolf${wolfFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(){

}