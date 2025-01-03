import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig ({
	root: 'src/',
	publicDir:'../static/',
	resolve: {
		alias: {
			'three/addons': 'three/examples/jsm',
			'three/tsl': 'three/webgpu',
			'three': 'three/webgpu'
		}
	},
  plugins:[
    topLevelAwait({
  		promiseExportName: "__tla",
      promiseImportName: i => `__tla_${i}`
    }),
	tailwindcss()

  ],
  server: {
  	port: 5173,
  }
});



// root: 'src/', // Sources files (typically where index.html is)
// publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
// server:
// {
// 	host: true, // Open to local network and display URL
// 	open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
// },
// build:
// {
// 	outDir: '../dist', // Output in the dist/ folder
// 	emptyOutDir: true, // Empty the folder first
// 	sourcemap: true // Add sourcemap
// },
// plugins:
// [
// 	restart({ restart: [ '../static/**', ] }) // Restart server on static file change
// ],
