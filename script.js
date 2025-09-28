class Gameboard {
    constructor() {
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']];
    }

    checkHorizontal(x, y) {
        let p1 = 0;
        let p2 = 0;
        for (let i = 0; i < 3; i++) {
            if (this.grid[i][y] === 'O') {
                p1 += 1;
            }
 
            if (this.grid[i][y] === 'X') {
                p2 += 1;
            }
        }

        if (p1 === 3) return 'p1';
        if (p2 === 3) return 'p2';
    }

    checkVertical(x,y) {
        let p1 = 0;
        let p2 = 0;
        for (let i = 0; i < 3; i++) {
            if (this.grid[x][i] === 'O') {
                p1 += 1;
            }
 
            if (this.grid[x][i] === 'X') {
                p2 += 1;
            }
        }

        if (p1 === 3) return 'p1';
        if (p2 === 3) return 'p2';
    }
}