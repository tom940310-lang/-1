const BOARD_SIZE = 15;
const PLAYER_BLACK = 1;
const PLAYER_WHITE = 2;

let board = [];
let currentPlayer = PLAYER_BLACK;
let gameActive = true;
let moveHistory = [];

const boardElement = document.getElementById('board');
const gameMessageElement = document.getElementById('gameMessage');
const playerBlackIndicator = document.getElementById('playerBlack');
const playerWhiteIndicator = document.getElementById('playerWhite');
const restartBtn = document.getElementById('restartBtn');

// Initialize Game
function initGame() {
    createBoard();
    resetState();
    setupEventListeners();
}

function createBoard() {
    boardElement.innerHTML = '';
    // Use CSS Grid layout, cells are just visual containers for clicks
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('click', () => handleCellClick(r, c));
            boardElement.appendChild(cell);
        }
    }
}

function resetState() {
    board = Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
    currentPlayer = PLAYER_BLACK;
    gameActive = true;
    moveHistory = [];

    // Clear pieces visually
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winning-line');
    });

    updateStatusDisplay();
}

function setupEventListeners() {
    restartBtn.addEventListener('click', () => {
        if (confirm('確定要重新開始遊戲嗎？ (Are you sure you want to restart?)')) {
            resetState();
        }
    });
}

function handleCellClick(row, col) {
    if (!gameActive || board[row][col] !== 0) return;

    // Place piece logic
    placePiece(row, col, currentPlayer);

    // Check for win
    if (checkWin(row, col, currentPlayer)) {
        gameActive = false;
        const winnerText = currentPlayer === PLAYER_BLACK ? '黑方 (Black)' : '白方 (White)';
        gameMessageElement.textContent = `🎉 恭喜！${winnerText} 獲勝！`;
        gameMessageElement.style.color = 'var(--win-color)';
        return;
    }

    // Switch turn
    currentPlayer = currentPlayer === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
    updateStatusDisplay();
}

function placePiece(row, col, player) {
    board[row][col] = player;

    const cellIndex = row * BOARD_SIZE + col;
    const cell = boardElement.children[cellIndex];

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(player === PLAYER_BLACK ? 'black' : 'white');

    // Remove last-move marker from previous piece
    if (moveHistory.length > 0) {
        const lastMove = moveHistory[moveHistory.length - 1];
        const lastCellIndex = lastMove.row * BOARD_SIZE + lastMove.col;
        if (boardElement.children[lastCellIndex].firstElementChild) {
            boardElement.children[lastCellIndex].firstElementChild.classList.remove('last-move');
        }
    }

    piece.classList.add('last-move');
    cell.appendChild(piece);

    moveHistory.push({ row, col, player });
}

function updateStatusDisplay() {
    if (!gameActive) return;

    if (currentPlayer === PLAYER_BLACK) {
        playerBlackIndicator.classList.add('active');
        playerWhiteIndicator.classList.remove('active');
        gameMessageElement.textContent = '黑方請下子 (Black\'s Turn)';
        gameMessageElement.style.color = 'var(--accent-color)';
    } else {
        playerBlackIndicator.classList.remove('active');
        playerWhiteIndicator.classList.add('active');
        gameMessageElement.textContent = '白方請下子 (White\'s Turn)';
        gameMessageElement.style.color = 'var(--accent-color)';
    }
}

function checkWin(row, col, player) {
    // Directions: Horizontal, Vertical, Diagonal 1 (\), Diagonal 2 (/)
    const directions = [
        [0, 1],   // Horizontal
        [1, 0],   // Vertical
        [1, 1],   // Diagonal \
        [1, -1]   // Diagonal /
    ];

    for (const [dr, dc] of directions) {
        let count = 1;

        // Positive direction
        for (let i = 1; i < 5; i++) {
            const r = row + dr * i;
            const c = col + dc * i;
            if (isValid(r, c) && board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }

        // Negative direction
        for (let i = 1; i < 5; i++) {
            const r = row - dr * i;
            const c = col - dc * i;
            if (isValid(r, c) && board[r][c] === player) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) {
            return true;
        }
    }
    return false;
}

function isValid(r, c) {
    return r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;
}

// Start
initGame();
