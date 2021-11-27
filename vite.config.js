const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [''],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          //simpleGPUCompute: 'SimpleGPUCompute'
        }
      }
    }
  }
})





// import vitePluginString from 'vite-plugin-string'
// let options = {
//     /* Default */
//     include: [
//       '**/*.vs',
//       '**/*.fs',
//       '**/*.vert',
//       '**/*.frag',
//       '**/*.glsl',
//     ],
  
//     /* Default: undefined */
//     exclude: 'node_modules/**',
  
//     /* Default: true */
//     // if true, using logic from rollup-plugin-glsl
//     compress: true,
  
//     // if a function, will instead of default compress function
//     compress(code) {
//       return code.replace(/\n/g, '')
//     }
//   };
  



// export default {
//   plugins: [
//     vitePluginString(options),
    
//   ]
// }