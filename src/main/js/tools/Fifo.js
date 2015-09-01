var Fifo = function(size) {
    this.size = size;
    this.array = [];
}
Fifo.prototype.push = function(element) {
    this.array.push(element);
    if (this.array.length > this.size) {
        this.array.splice(0, 1);
    }
}
module.exports = Fifo;