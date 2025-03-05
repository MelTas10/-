// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').classList.remove('hidden');
    }, 3000);
});

// Start button
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('info').classList.remove('hidden');
    window.scrollTo({
        top: document.getElementById('info').offsetTop,
        behavior: 'smooth'
    });
});

// Snake Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const grid = 20;
let snake = [
    {x: 200, y: 200},
];
let food = {
    x: Math.floor(Math.random() * (canvas.width/grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height/grid)) * grid
};
let dx = grid;
let dy = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && dx === 0) {
        dx = grid;
        dy = 0;
    }
    if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -grid;
        dy = 0;
    }
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -grid;
    }
    if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = grid;
    }
});

function gameLoop() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Check collision with food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * (canvas.width/grid)) * grid,
            y: Math.floor(Math.random() * (canvas.height/grid)) * grid
        };
    } else {
        snake.pop();
    }

    // Draw snake
    ctx.fillStyle = '#fff';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, grid-2, grid-2);
    });

    // Draw food
    ctx.fillRect(food.x, food.y, grid-2, grid-2);

    // Check collision with walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        clearInterval(gameInterval);
        alert('Game Over!');
        snake = [{x: 200, y: 200}];
        dx = grid;
        dy = 0;
        gameInterval = setInterval(gameLoop, 100);
    }
}

let gameInterval = setInterval(gameLoop, 100);
