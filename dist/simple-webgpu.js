// https://simple-webgpu.com v0.9.9 Copyright 2021-2022 Zoox
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3 = global.d3 || {}));
})(this, (function (exports) { 'use strict';

var version = "0.9.9";

console.log('hello world');

exports.version = version;

}));
