import vitePluginString from 'vite-plugin-string'
let options = {
    /* Default */
    include: [
      '**/*.vs',
      '**/*.fs',
      '**/*.vert',
      '**/*.frag',
      '**/*.glsl',
    ],
  
    /* Default: undefined */
    exclude: 'node_modules/**',
  
    /* Default: true */
    // if true, using logic from rollup-plugin-glsl
    compress: true,
  
    // if a function, will instead of default compress function
    compress(code) {
      return code.replace(/\n/g, '')
    }
  };
  



export default {
  plugins: [
    vitePluginString(options),
    
  ]
}