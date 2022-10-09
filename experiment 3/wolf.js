import {
    incrementCustomProperty,
    getCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

//var
const wolfElem = document.querySelector("[data-wolf]") //manggil
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const WOLF_FRAME_COUNT = 6
const FRAME_TIME = 90

//var
let isJumping
let wolfFrame
let currentFrameTime
let yVelocity
export function setupWolf(){
    isJumping = false
    wolfFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(wolfElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateWolf(delta, speedScale){
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getWolfRect(){
    return wolfElem.getBoundingClientRect()
}

export function setWolfLose(){
    wolfElem.src = 'img/wolf-mati.png'
}

//biar bisa ber animasi (mirip animation sprite css)
function handleRun(delta, speedScale){
    if(isJumping){
        wolfElem.src = 'img/wolf-run-4.png'
        return
    }
    if(currentFrameTime >= FRAME_TIME){
        wolfFrame = (wolfFrame + 1) % WOLF_FRAME_COUNT
        wolfElem.src = `img/wolf-run-${wolfFrame}.png`
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta){
    if(!isJumping) return

    incrementCustomProperty(wolfElem, "--bottom", yVelocity * delta)

    if(getCustomProperty(wolfElem, "--bottom") <= 0){
        setCustomProperty(wolfElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta
}

function onJump(e){
    if (e.code !== "Space" || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}