// script.js

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const segments = [
    'Voucher 50% + Quà', 'Mất Lượt', 'Voucher 35% + Quà', 
    'Voucher 55% + Quà', 'Thêm Lượt', 'Voucher 40% + Quà', 
    'May Mắn'
];
const segmentColors = [
    '#FFEB3B', '#4CAF50', '#F44336', '#FF9800', 
    '#03A9F4', '#E91E63', '#9C27B0'
];

// Đường dẫn đến các hình ảnh
const imagePaths = [
    'images/Voucher.png', 'images/Sad.png', 'images/Voucher.png',
    'images/Voucher.png', '', 'images/Voucher.png',
    'images/Happy.png'
];

let loadedImages = [];

// Hàm tải các hình ảnh
function loadImages(callback) {
    let loadedCount = 0;
    for (let i = 0; i < imagePaths.length; i++) {
        const img = new Image();
        img.src = imagePaths[i];
        img.onload = () => {
            loadedCount++;
            if (loadedCount === imagePaths.length) {
                callback();
            }
        };
        loadedImages.push(img);
    }
}

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
        ctx.font = 'bold 20px Calibri'; // Thay đổi kích thước và kiểu chữ
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        const text = segments[i].split(' '); // Tách cụm từ thành từng từ

        // Vẽ cụm từ theo chiều dọc
        for (let j = 0; j < text.length; j++) {
            ctx.fillText(text[j], 0, j * 22 - (text.length * 11)); // 22 là khoảng cách giữa các từ, điều chỉnh nếu cần
        }

        // Vẽ hình ảnh sau cụm từ
        const img = loadedImages[i];
        if (img.src) { // Kiểm tra nếu hình ảnh tồn tại
            const imgY = (text.length * 22) / 2 + 10; // Tính toán vị trí Y để đặt hình ảnh
            ctx.drawImage(img, -img.width / 2, imgY);
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

// Tải các hình ảnh và vẽ vòng quay sau khi tải xong
loadImages(drawWheel);

// Tải các hình ảnh và vẽ vòng quay sau khi tải xong
loadImages(drawWheel);
