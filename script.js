class Gameboard {
    #over;

    constructor() {
        this.grid = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];
        this.free = 9;
        this.#over = false;
    }

    write(x, y, value) {
        this.grid[x][y] = value;
        this.free -= 1;
    }

    checkIfFree(x, y) {
        return (this.grid[x][y] === 0);
    }

    setOver() {
        this.#over = true;
    }

    gameOver() {
        return this.#over;
    }

    checkIfWin(x, y, player) {
        if (this.checkHorizontal(x, y) === player) { return true }
        if (this.checkVertical(x, y) === player) { return true }
        if (this.onFirstDiagonal(x, y) &&
            this.checkFirstDiagonal(x, y) === player) { return true }
        if (this.onSecondDiagonal(x, y) &&
            this.checkSecondDiagonal(x, y) === player) { return true }
    }

    onFirstDiagonal(x, y) {
        return (x === y);
    }

    onSecondDiagonal(x, y) {
        return (x + y === 2);
    }

    checkHorizontal(x, y) {
        let p1 = 0;
        let p2 = 0;
        for (let i = 0; i < 3; i++) {
            if (this.grid[i][y] === 1) {
                p1 += 1;
            }

            if (this.grid[i][y] === 2) {
                p2 += 1;
            }
        }

        if (p1 === 3) return 1;
        if (p2 === 3) return 2;
    }

    checkVertical(x, y) {
        let p1 = 0;
        let p2 = 0;
        for (let i = 0; i < 3; i++) {
            if (this.grid[x][i] === 1) {
                p1 += 1;
            }

            if (this.grid[x][i] === 2) {
                p2 += 1;
            }
        }

        if (p1 === 3) return 1;
        if (p2 === 3) return 2;
    }

    checkFirstDiagonal(x, y) {
        let p1 = 0;
        let p2 = 0;
        for (let i = 0; i < 3; i++) {
            if (this.grid[i][i] === 1) {
                p1 += 1;
            }

            if (this.grid[i][i] === 2) {
                p2 += 1;
            }
        }

        if (p1 === 3) return 1;
        if (p2 === 3) return 2;
    }

    checkSecondDiagonal(x, y) {
        let p1 = 0;
        let p2 = 0;
        for (let i = 0; i < 3; i++) {
            if (this.grid[2 - i][i] === 1) {
                p1 += 1;
            }

            if (this.grid[2 - i][i] === 2) {
                p2 += 1;
            }
        }

        if (p1 === 3) return 1;
        if (p2 === 3) return 2;
    }
}

class GameManager {
    #player;
    #board;

    constructor() {
        this.#board = new Gameboard();
        this.#player = 1;

        const A11 = document.querySelector(".gameboard li:nth-child(1)");
        const A21 = document.querySelector(".gameboard li:nth-child(2)");
        const A31 = document.querySelector(".gameboard li:nth-child(3)");
        const A12 = document.querySelector(".gameboard li:nth-child(4)");
        const A22 = document.querySelector(".gameboard li:nth-child(5)");
        const A32 = document.querySelector(".gameboard li:nth-child(6)");
        const A13 = document.querySelector(".gameboard li:nth-child(7)");
        const A23 = document.querySelector(".gameboard li:nth-child(8)");
        const A33 = document.querySelector(".gameboard li:nth-child(9)");

        A11.addEventListener('click', (e) => { this.makeMove(0, 0, e) });
        A21.addEventListener('click', (e) => { this.makeMove(1, 0, e) });
        A31.addEventListener('click', (e) => { this.makeMove(2, 0, e) });
        A12.addEventListener('click', (e) => { this.makeMove(0, 1, e) });
        A22.addEventListener('click', (e) => { this.makeMove(1, 1, e) });
        A32.addEventListener('click', (e) => { this.makeMove(2, 1, e) });
        A13.addEventListener('click', (e) => { this.makeMove(0, 2, e) });
        A23.addEventListener('click', (e) => { this.makeMove(1, 2, e) });
        A33.addEventListener('click', (e) => { this.makeMove(2, 2, e) });

        const RB = document.querySelector(".restart");
        RB.addEventListener('click', (e) => { this.restartGame() });
    }

    restartGame() {
        this.#board = new Gameboard();
        this.#player = 1;

        const list = document.querySelectorAll("li");
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = 'white';
        }
    }

    makeMove(x, y, e) {
        if (this.#board.checkIfFree(x, y) && !this.#board.gameOver()) {
            this.#board.write(x, y, this.#player);

            if (this.#player === 1) {
                e.target.style.backgroundColor = 'blue';
            }
            else {
                e.target.style.backgroundColor = 'red';
            }

            if (this.#board.checkIfWin(x, y, this.#player)) {
                this.#board.setOver();
                return;
            }

            if (this.#player === 1) {
                this.#player = 2
            }
            else {
                this.#player = 1
            }
        }
    }
}

const GM = new GameManager();