const prompt = require('prompt-sync')({sigint: true});
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field { 
    constructor(difficulty) { //we only inlcude a string for difficulty in the constructior
        this.difficultyPercentage = difficulty.toLowerCase();
    }
    generateFieldSizeAndCoordinates = () => {
        var columnsNum = Math.floor(Math.random() * 8)+5
        var rowsNum = Math.floor(Math.random() * 8)+5
        var fieldCoordinates = { 
            columns: columnsNum,
            rows: rowsNum,
            userX: Math.floor(Math.random() * columnsNum), //generates random player start coordinates
            userY: Math.floor(Math.random() * rowsNum),
            hatX: Math.floor(Math.random() * columnsNum), //generates random hat location coordinates
            hatY: Math.floor(Math.random() * rowsNum)
        }  
        return fieldCoordinates //returns the fieldCoordinates object that contains coordinates used across all methods
    }
    generateField = (newCoordinates, difficulty) => {
        var coordinates = newCoordinates;
        var newField = []
        var difficulty = this.difficultyPercentage;
        var difficultyPercentage;
        //set difficulty
        switch(difficulty) { //sets likely hood of encountering a hole based on the difficuly
            case 'easy': difficultyPercentage = 15
            break
            case 'medium': difficultyPercentage = 30
            break
            case 'hard': difficultyPercentage = 45
        }
        // creates random field of field/hole characters
        for(var i=0;i<coordinates.rows;i++) {
            var fieldPlaceHolder = []
            for(var a=0;a<coordinates.columns;a++){
                var characterToAdd
                if (Math.floor(Math.random() * 101) > difficultyPercentage){
                    characterToAdd = fieldCharacter;
                }
                if (Math.floor(Math.random() * 101) < difficultyPercentage){
                    characterToAdd = hole;
                }
                else {
                    characterToAdd = fieldCharacter;
                }
                fieldPlaceHolder.push(characterToAdd);
            }
            newField.push(fieldPlaceHolder);
        }
        // add in the player and the hat in random positions
        newField[coordinates.hatY][coordinates.hatX] = hat;
        newField[coordinates.userY][coordinates.userX] = pathCharacter;
        return newField
    }
    startGame = () => {
        var gameCoordinates = this.generateFieldSizeAndCoordinates();
        var field = this.generateField(gameCoordinates);
        this.printField(field, gameCoordinates)
        var hX = gameCoordinates.hatX;
        var hY = gameCoordinates.hatY;
        var uX = gameCoordinates.userX;
        var uY = gameCoordinates.userY;
        while(`${hX},${hY}` != `${uX},${uY}`){
            //ends game if we go out of bounds on the X axis
            if (uX < 0 || uX >= gameCoordinates.columns) {
                return console.log("you fell off the map!")
            }
        const movement = prompt('where would you like to move?')
        //start movement settings
        if (movement === 'down') {
            if (uY === gameCoordinates.rows - 1) { //bounds checker
                return console.log('you fell off the map!')
            }
            if(field[uY+1][uX] === hole) {
                return console.log('you fell into a hole')
            }
            if(field[uY+1][uX] === hat) {
                return console.log('YOU WIN!')
            }
           field[uY+1][uX] = pathCharacter;
           uY++;
        }
        if (movement === 'right') {
            if(field[uY][uX+1] === hole) {
                return console.log('you fell into a hole')
            }
            if(field[uY][uX+1] === hat) {
                return console.log('YOU WIN!')
            }
            field[uY][uX+1] = pathCharacter;
            uX++;
            }
        if (movement === 'left') {
            if(field[uY][uX-1] === hole) {
                return console.log('you fell into a hole')
            }
            if(field[uY][uX-1] === hat) {
                return console.log('YOU WIN!')
            }
            field[uY][uX-1] = pathCharacter;
            uX--;
            }
        if (movement === 'up') {
            if (uY <= 0) { //bounds checker
                return console.log('you fell off the map!')
            }
            if(field[uY-1][uX] === hole) {
                return console.log('you fell into a hole')
            }
            if(field[uY-1][uX] === hat) {
                return console.log('YOU WIN!')
            }
            field[uY-1][uX] = pathCharacter;
            uY--;
            }
        this.printField(field, gameCoordinates)
        }
    }
    printField = (currField, currCoordinates) => {
        for(var i=0; i<currCoordinates.rows; i++) {
        console.log(currField[i].join(''))
        }
    }
}

const fieldOne = new Field('easy') //change to medium or hard for more holes in the field

fieldOne.startGame()