function GetBFor(num) {
    return BImpl.getInstance(num);
}
exports.GetBFor = GetBFor;
class BImpl {
    constructor(_b) {
        this._b = _b;
    }
    static getInstance(num) {
        return new BImpl(num);
    }
    getNum() {
        return this._b;
    }
}
