import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig ({
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
    })
  ],
  server: {
  	port: 5173,
  }
});