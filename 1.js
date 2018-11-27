let canvas = document.getElementById('canvas1');
let ctx = canvas.getContext('2d');
let lineWidth = 3;
autoSetCanvas(canvas);

listenToMouse(canvas);

let eraser = document.getElementById('eraser');
let brush = document.getElementById('brush');
let actions = document.getElementById('actions');
let eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    brush.classList.remove('active');

}
brush.onclick = function () {
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}

let black = document.getElementById('black');
let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');

black.onclick = function () {
    ctx.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
red.onclick = function () {
    ctx.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
green.onclick = function () {
    ctx.strokeStyle = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}
blue.onclick = function () {
    ctx.strokeStyle = 'blue';
    blue.classList.add('active');
    green.classList.remove('active');
    red.classList.remove('active');
    black.classList.remove('active');
    eraserEnabled = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
}

let thin = document.getElementById('thin');
let thick = document.getElementById('thick');
thin.onclick = function () {
    lineWidth = 3;
}
thick.onclick = function () {
    lineWidth = 6;
}


let deleteIcon = document.getElementById('deleteIcon');
deleteIcon.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBackground();
}

let save = document.getElementById('save');
save.onclick = function () {
    let url = canvas.toDataURL("image/png");
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'pic.png';
    a.target = '_blank';
    a.click();
}

/** */

function listenToMouse(canvas) {
    let using = false;
    let lastPoint = {
        x: undefined,
        y: undefined
    }

    if (document.body.ontouchstart !== undefined) {
        // console.log('触屏设备');
        canvas.ontouchstart = function (e) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                // ctx.clearRect(x - 5, y - 5, 10, 10);
                eraseCircle(x,y,5);
                // lastPoint = { x: x, y: y };
            } else {
                // drawCircle(x,y,lineWidth/2);
                lastPoint = { x: x, y: y };
            }

        }
        canvas.ontouchmove = function (e) {
            let x = e.touches[0].clientX;
            let y = e.touches[0].clientY;
            if (!using) return;
            if (eraserEnabled) {
                //解决擦去背景色的问题
                // ctx.save()
                // ctx.strokeStyle = 'white';
                // let newPoint = { x: x, y: y };
                // eraseLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                // lastPoint = newPoint;
                // ctx.restore();
                eraseCircle(x,y,5);
                // ctx.clearRect(x - 5, y - 5, 10, 10);
            } else {
                let newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function () {
            using = false;
        }

    } else {
        // console.log('非触屏设备');
        canvas.onmousedown = function (e) {
            let x = e.clientX;
            let y = e.clientY;
            using = true;
            if (eraserEnabled) {
                // ctx.clearRect(x - 5, y - 5, 10, 10);
                eraseCircle(x,y,5);
            } else {
                lastPoint = { x: x, y: y };
                // drawCircle(x,y,5);
            }

        }

        canvas.onmousemove = function (e) {
            let x = e.clientX;
            let y = e.clientY;
            if (!using) return;
            if (eraserEnabled) {
                // ctx.clearRect(x - 5, y - 5, 10, 10);
                // ctx.save()
                // ctx.strokeStyle = 'white';
                // let newPoint = { x: x, y: y };
                // eraseLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                // lastPoint = newPoint;
                // ctx.restore();
                eraseCircle(x,y,5);
            } else {
                let newPoint = { x: x, y: y };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.onmouseup = function () {
            using = false;
        }
    }


}


function autoSetCanvas(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }
}


function setCanvasSize() {
    let pageWidth = document.documentElement.clientWidth;
    let pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    setBackground();
}
function setBackground() {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    // fillStyle=strokeStyle;
    ctx.fillStyle = "black";
    // ctx.fillStyle=strokeStyle;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function eraseCircle(x, y, radius) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
}



function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}


