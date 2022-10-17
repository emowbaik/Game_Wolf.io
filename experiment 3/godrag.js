import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty
} from "./updateCustomProperty.js"

//godrag = obstacles

//var
const SPEED = 0.05 //kecepatan godrag
const GODRAG_INTERVAL_MIN = 750 //mengatur min jarak obstacle dengan yang lain
const GODRAG_INTERVAL_MAX = 2000 //mengatur max jarak obstacle dengan yang lain
const worldElem = document.querySelector("[data-world]") //manggil dari html

//waktu muncul obstacle berikutnya
let nextGodragTime
export function setupGodrag(){
    nextGodragTime = GODRAG_INTERVAL_MIN
    document.querySelectorAll("[data-godrag]").forEach(godrag => {
        godrag.remove()
    })
}

//update obstacle
export function updateGodrag(delta, speedScale){
    document.querySelectorAll("[data-godrag]").forEach(godrag => {
        incrementCustomProperty(godrag, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(godrag, "--left",) <= -100){
            godrag.remove()
        }
    })

    if(nextGodragTime <= 0){
        createGodrag()
        nextGodragTime =
        randomNumberBetween(GODRAG_INTERVAL_MIN,
            GODRAG_INTERVAL_MAX) / speedScale
    }
    nextGodragTime -= delta
}

//agar kena hit
export function getGodragRects(){
    return [...document.querySelectorAll("[data-godrag]")].map(godrag => {
        return godrag.getBoundingClientRect()
    })
}

//menampilkan obstacle
function createGodrag(){
    const godrag = document.createElement("img")
    godrag.dataset.godrag = true
    godrag.src = 'img/Godrag.png'
    godrag.classList.add("godrag")
    setCustomProperty(godrag, "--left", 100)
    worldElem.append(godrag)
}

//random
function randomNumberBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}