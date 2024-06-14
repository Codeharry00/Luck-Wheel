// script.js

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const segments = [
    '50% + Quà', '55% + Quà', '45% + Quà', 
    '50% + Quà', 'Mất lượt', '35% + Quà',
    '40% + Quà', 'Thêm lượt'
];
const segmentColors = [
    '#3ACC85', '#FF0099', '#FF8A00', '#FF5500', 
    '#CC5555', '#009DEE', '#304BCE', '#93D1BC'
];

let startAngle = 0;
const arc = Math.PI / (segments.length / 2);
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ lại
    for (let i = 0; i < segments.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = segmentColors[i];
        ctx.beginPath();
        ctx.arc(250, 250, 250, angle, angle + arc, false);
        ctx.arc(250, 250, 0, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.fillStyle = 'black';
        ctx.translate(250 + Math.cos(angle + arc / 2) * 200, 250 + Math.sin(angle + arc / 2) * 200);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.font = 'bold 18px Calibri'; // Thay đổi kích thước và kiểu chữ
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        const text = segments[i].split(' '); // Tách cụm từ thành từng từ

        for (let j = 0; j < text.length; j++) {
            ctx.fillText(text[j], 0, j * 24 - (text.length * 12)); // 24 là khoảng cách giữa các từ, điều chỉnh nếu cần
        }

        ctx.restore();
    }
}

function rotateWheel() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotate();
}

function rotate() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawWheel();
    requestAnimationFrame(rotate);
}

function stopRotateWheel() {
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    alert("Bạn đã trúng " + segments[index]);
}

function easeOut(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
}

spinButton.addEventListener('click', rotateWheel);

drawWheel();


