var myGamePiece;
var myObstacles = [];
var myBackground;

const up = 87;
const left = 65;
const down = 83;
const right = 68;

// addeventlistener untuk bisa mengendalikan karakter
window.addEventListener("keydown", move);
window.addEventListener("keyup", stopMove);

function startGame() {
  myGamePiece = new component(90, 50, "Wolf1.png", 10, 190, "image");
  myBackground = new component(656, 270, "BGSore.png", 0, 0, "background");
  myGameArea.start();
}
// let canvas = DOCzzz
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");

    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener("keydown", function (e) {
      myGameArea.key = e.keyCode;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.key = e.keyCode;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = myGameArea.context;
    if (type == "image" || type == "background") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      if (type == "background") {
        ctx.drawImage(
          this.image,
          this.x + this.width,
          this.y,
          this.width,
          this.height
        );
      }
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.movement = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == "background") {
      if (this.x == -this.width) {
        this.x = 0;
      }
    }
    this.hitTop();
    this.hitBottom();
    this.hitRight();
    this.hitLeft();
  };

  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };

  // function hit untuk memberi batasan agar karakter dan obstcales tidak melewati batas canvas
  this.hitTop = function () {
    let objTop = this.height - this.height;
    if (this.y < objTop) {
      this.y = objTop;
    }
  };

  this.hitBottom = function () {
    let objBottom = 290 - this.height;
    if (this.y > objBottom) {
      this.y = objBottom;
    }
  };

  this.hitLeft = function () {
    let objLeft = 480 - this.width;
    if (this.x > objLeft) this.x = objLeft;
  };

  this.hitRight = function () {
    let objRight = this.width - this.width;
    if (this.x < objRight) {
      this.x = objRight;
    }
  };
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function updateGameArea() {
  var x, y;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(45)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 100;
    height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    minGap = 55;
    maxGap = 200;
    minGap2 = 20;
    maxGap2 = 100;
    a = 700;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    gap2 = Math.floor(Math.random() * (maxGap2 - minGap2 + 1) + minGap2);

    myObstacles.push(new component(50, 50, "Godrag.png", 700, 190, "image"));
  }
  myBackground.speedX = -1;
  myBackground.movement();
  myBackground.update();
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -10;
    myObstacles[i].update();
  }
  myGamePiece.movement();
  myGamePiece.update();
}

function move(event) {
  const keyPressed = event.keyCode;
  if (keyPressed == left) {
    myGamePiece.speedX = -5;
  } else if (keyPressed == right) {
    myGamePiece.speedX = 5;
  } else if (keyPressed == up) {
    myGamePiece.speedY = -5;
  } else if (keyPressed == down) {
    myGamePiece.speedY = 5;
  }
}

function stopMove(event) {
  const keyPressed = event.keyCode;
  if (keyPressed == left) {
    myGamePiece.speedX = 0;
  } else if (keyPressed == right) {
    myGamePiece.speedX = 0;
  } else if (keyPressed == up) {
    myGamePiece.speedY = 5;
  } else if (keyPressed == down) {
    myGamePiece.speedY = 0;
  }
}
