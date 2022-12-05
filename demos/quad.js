import stripes from './shaders/stripes.wgsl?raw'

import simpleWebGPU from "../lib/main";

function init () {
    console.log('hello world')



    simpleWebGPU.init({
        fs: stripes,
        attributes: {
            position: [-1, 1, 0, 1, 1],
        },

    })

}
export default {init}