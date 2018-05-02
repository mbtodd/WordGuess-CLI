


var Letter = function (char) {

    this.value = char;

    this.guessed = false;

}

Letter.prototype.show = function () {
    if (this.guessed) {
        return this.value;
    }

    else {
        return "_";
    }
}

module.exports = Letter;