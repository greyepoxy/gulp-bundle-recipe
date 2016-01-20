(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var b_1 = require('./b');
function GetA() {
    return new AImpl();
}
exports.GetA = GetA;

var AImpl = function () {
    function AImpl() {
        _classCallCheck(this, AImpl);
    }

    _createClass(AImpl, [{
        key: 'do',
        value: function _do() {
            var b = b_1.GetBFor(5);
            if (b.getNum() == 10) {
                throw new Error('This is a bad thing!');
            }
        }
    }]);

    return AImpl;
}();

},{"./b":2}],2:[function(require,module,exports){
"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function GetBFor(num) {
    return BImpl.getInstance(num);
}
exports.GetBFor = GetBFor;

var BImpl = function () {
    function BImpl(_b) {
        _classCallCheck(this, BImpl);

        this._b = _b;
    }

    _createClass(BImpl, [{
        key: "getNum",
        value: function getNum() {
            return this._b;
        }
    }], [{
        key: "getInstance",
        value: function getInstance(num) {
            return new BImpl(num);
        }
    }]);

    return BImpl;
}();

},{}],3:[function(require,module,exports){
'use strict';

var a_1 = require('./foo/a');
exports.a = a_1.GetA();
exports.a.do();

},{"./foo/a":1}]},{},[3])


//# sourceMappingURL=index.js.map
