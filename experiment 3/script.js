import { setupGround, updateGround } from './ground.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30

const worldElm = document.querySelector("[data-world]")

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)

setupGround()

let lastTime = 0
function update(time){
    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime

    updateGround(delta)

    lastTime = time
    window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

function setPixelToWorldScale(){
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH        
    } else{
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }

    worldElm.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    worldElm.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}