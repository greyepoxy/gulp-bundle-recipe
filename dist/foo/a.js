var b_1 = require('./b');
function GetA() {
    return new AImpl();
}
exports.GetA = GetA;
class AImpl {
    do() {
        let b = b_1.GetBFor(5);
        if (b.getNum() == 10) {
            throw new Error('This is a bad thing!');
        }
    }
}
