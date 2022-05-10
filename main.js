// import all the required modules

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

// Instantiate variable
// You can edit or create new variable if needed

const hat = '^';  //My Hat
const hole = 'O';
const fieldCharacter = '░'; //Imagine this is grass patch of 1m by 1m each -> need to fill up the whole field (10 by 10)
const pathCharacter = '*'; //ME
const row = 10;
const col = 10;

// If you prefer to use functions, please go ahead...
// In this kick-starter we are using Class object

// 1) Build the whole Field out (10 row x 10 col)
// Create 2D Array (can create an empty field first)
// Construct the layout of the field using empty array

class Field {

    field = [];

    constructor() {        
       
        this.locationX = 0;
        this.locationY = 0;        

        for (let a = 0; a < row; a++) {
            this.field[a] = [];
        }

        this.generateField(); // need to put in the patches of grass in the plot
        this.field[0][0] = pathCharacter; // set the character position as [0][0], the character * can be always at the default of position (0,0) 
    }


    generateField() {
        const field = new Array(row).fill(0).map(el => new Array(col));
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                let percentage = 0.2;
                this.field[y][x] = prob > percentage ? fieldCharacter: hole;
            }
        }
        
        // Set the hat location
        const hatLocation = {
            x: Math.floor(Math.random() * col),
            y: Math.floor(Math.random() * row)
        };
       
        // While the hat location equals the start location, get a different random number
        while (hatLocation.x === 0 && hatLocation.y === 0) {
        hatLocation.x = Math.floor(Math.random() * col);
        hatLocation.y = Math.floor(Math.random() * row);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;             
    }

    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log('Out of bounds - Game End!');                
                break;
            } else if (this.isHole()) {
                console.log('Sorry, you fell down a hole!');                
                break;
            } else if (this.isHat()) {
                console.log('Congrats, you found your hat!');                
                break;
            }
            // Update the current location on the map
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    isInBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
    }

    isHat() {
    return this.field[this.locationY][this.locationX] === hat;
    }

    isHole() {
    return this.field[this.locationY][this.locationX] === hole;
    }
    

    print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');            
        }).join('\n');    //newline / break  // join method will cover the array to string (remove comma)
        console.log(displayString);
    }

    askQuestion() {
        const answer = prompt('Which way? (u, d, l, r)').toUpperCase();
        switch (answer) {
            case 'U':
              this.locationY -= 1;
              break;
            case 'D':
              this.locationY += 1;
              break;
            case 'L':
              this.locationX -= 1;
              break;
            case 'R':
              this.locationX += 1;
              break;
            default:
              console.log('Enter U, D, L or R.');
              this.askQuestion();
              break;
        }    
    }
} // End of Field Class


const myField = new Field();
myField.runGame();