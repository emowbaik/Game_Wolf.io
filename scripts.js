const wolf = document.getElementById("wolf")
const godrag = document.getElementById("godrag")

//lompat
function jump(){
if (wolf.classList != "jump"){
wolf.classList.add("jump")

setTimeout(function(){
wolf.classList.remove("jump")
}, 300)
}}

let nyawa = setInterval(function(){
// posisi Y wolf
let wolfTop = parseInt(window.getComputedStyle(wolf).getPropertyValue("top"))
// posisi X godrag
let godragLeft = parseInt(window.getComputedStyle(godrag).getPropertyValue("left"))
// sensor jika kena tabrakan
if(godragLeft < 160 && godragLeft > 0 && wolfTop >= 100){
console.log("MATI ANDA!!!")
// alert("Mati!!!")
}
}, 10)

document.addEventListener("keydown", function (event){
jump();
})


// // var myGamePiece;
// var myBackground;

// function startGame() {
//     // myGamePiece = new component(30, 30, "smiley.gif", 10, 120, "image");
//     myBackground = new component(480, 240, "BGPagi.png", 0, 0, "background");
//     myGameArea.start();
// }

// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.frameNo = 0;
//         this.interval = setInterval(updateGameArea, 20);
//         },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     },
//     stop : function() {
//         clearInterval(this.interval);
//     }
// }

// function component(width, height, color, x, y, type) {
//     this.type = type;
//     if (type == "image" || type == "background") {
//         this.image = new Image();
//         this.image.src = color;
//     }
//     this.width = width;
//     this.height = height;
//     this.speedX = 0;
//     this.speedY = 0;    
//     this.x = x;
//     this.y = y;    
//     this.update = function() {
//         ctx = myGameArea.context;
//         if (type == "image" || type == "background") {
//             ctx.drawImage(this.image, 
//                 this.x, 
//                 this.y,
//                 this.width, this.height);
//         if (type == "background") {
//             ctx.drawImage(this.image, 
//                 this.x + this.width, 
//                 this.y,
//                 this.width, this.height);
//         }
//         } else {
//             ctx.fillStyle = color;
//             ctx.fillRect(this.x, this.y, this.width, this.height);
//         }
//     }
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//         if (this.type == "background") {
//             if (this.x == -(this.width)) {
//                 this.x = 0;
//             }
//         }
//     }    
// }

// function updateGameArea() {
//     myGameArea.clear();
//     myBackground.speedX = -1;
//     myBackground.newPos();    
//     myBackground.update();
//     // myGamePiece.newPos();    
//     // myGamePiece.update();
// }

// // function move(dir) {
// //     myGamePiece.image.src = "angry.gif";
// //     if (dir == "up") {myGamePiece.speedY = -1; }
// //     if (dir == "down") {myGamePiece.speedY = 1; }
// //     if (dir == "left") {myGamePiece.speedX = -1; }
// //     if (dir == "right") {myGamePiece.speedX = 1; }
// // }

// // function clearmove() {
// //     myGamePiece.image.src = "smiley.gif";
// //     myGamePiece.speedX = 0; 
// //     myGamePiece.speedY = 0; 
// // }