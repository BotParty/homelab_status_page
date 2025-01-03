import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import tailwindcss from '@tailwindcss/vite';

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
    }),
	tailwindcss()

  ],
  server: {
  	port: 5173,
  }
});

