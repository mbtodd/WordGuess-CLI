

var Letter = require("./letter.js").default;

var Word = function (word) {
    this.word = word;
    this.display = "";
    this.letterObjArray = [];

    this.splitWord = function () {
        return this.word.split("");
    }

    this.newLetters = function (num) {

        var letterArray = this.splitWord();
        for (var i = 0; i < letterArray.length; i++) {
            var letter = new Letter(letterArray[i]);
            this.letterObjArray.push(letter);
        }
        this.showWord();
    }
}

Word.prototype.showWord = function () {
    this.display = "";

    for (var i = 0; i < this.letterObjArray.length; i++) {
        this.display += this.letterObjArray[i].show() + " "
    }

    console.log("\n" + this.display + "\n");
}

module.exports = Word;