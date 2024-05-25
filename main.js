const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(height, width, percentage) {
        this.height = height;
        this.width = width;
        this.percentage = percentage;
        this._field = this.generateField();
        this.currentX = 0;
        this.currentY = 0;
    }

    print( ) {
        this._field.forEach(element => {
            console.log(element.join(''))
        })
    }

   generateField() {
        const field = new Array(this.height).fill(0).map(el => new Array(this.width).fill('░'));
        field[0][0] = '*';
        let hatX = Math.floor(Math.random() * this.width);
        let hatY = Math.floor(Math.random() * this.height);
        field[hatY][hatX] = '^';
        let holeCount = Math.round((this.width * this.height) * this.percentage);
        while (holeCount > 0) {
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);
            if (field[y][x] === fieldCharacter) {
                field[y][x] = hole;
                holeCount--;
            }
        }
        return field;
    }

    move(direction) {
        switch (direction) {
            case 'u':
                this.currentY--;
                break;
            case 'd':
                this.currentY++;
                break;
            case 'l':
                this.currentX--;
                break;
            case 'r':
                this.currentX++;
                break;
            default:
                console.log('Invalid move!');
        }
    

        if (this.currentX < 0 || this.currentY < 0 || this.currentX >= this.width || this.currentY >= this.height) {
            console.log('Out of bounds instruction!');
            return false;
        }
        const newPosition = this._field[this.currentY][this.currentX];
        if (newPosition === '^') {
            console.log('Congrats! You found your hat!');
            return true;
        }
        else if (newPosition === 'O') {
            console.log('Sorry, you fell into a hole!');
            return false;
        }

        this._field[this.currentY][this.currentX] = '*';
        return true;
    }

}

function playGame() {
    const height = 10;
    const width = 10;
    const percentage = 0.1;
    const field = new Field(height, width, percentage);

    while (true) {
        field.print();
        const direction = prompt('Which way? (u/d/l/r): ');
        const continueGame = field.move(direction);
        if (!continueGame) break;
    }
}

playGame();

