// https://simple-webgpu.com v0.37.0 Copyright 2021-2022 Zoox
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3 = global.d3 || {}));
})(this, (function (exports) { 'use strict';

var version = "0.37.0";

const hello = 'hello';
const world = 'world';
//treeshaking is deleting my version ?!?!?
//new versions arent updating in notebook!
//learn how to develop modules !

// make module work by frida
//get 3 cubes
//one has a texture
//one rescales with a slider
//one rotates with a slider

//out of scope
////translate all with a slider
////transform color with a slider

exports.hello = hello;
exports.version = version;
exports.world = world;

}));
