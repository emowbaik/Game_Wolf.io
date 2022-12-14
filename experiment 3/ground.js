import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

//var
const SPEED = 0.05 //kecepatan ground
const groundElems = document.querySelectorAll("[data-ground]") //manggil dari html

export function setupGround(){
    setCustomProperty(groundElems[0], "--left", 0)
    setCustomProperty(groundElems[1], "--left", 300)
}

export function updateGround(delta, speedScale){
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if(getCustomProperty(ground, "--left") <= -300){
            incrementCustomProperty(ground, "--left", 600)
        }
    })
}