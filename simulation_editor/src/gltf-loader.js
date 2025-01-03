import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

export function loadGLTFModel(path) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
            // Resource URL
            path,
            // Called when the resource is loaded
            function (gltf) {
                resolve(gltf);
            },
            // Called while loading is progressing
            function (progress) {
                console.log('Loading model: ' + (progress.loaded / progress.total * 100) + '%');
            },
            // Called when loading has errors
            function (error) {
                console.error('An error happened:', error);
                reject(error);
            }
        );
    });
}

// Usage example:
/*
import { loadGLTFModel } from './gltf-loader';

// In your scene setup:
loadGLTFModel('/path/to/your/model.gltf')
    .then(gltf => {
        scene.add(gltf.scene);
        // You can also access animations: gltf.animations
        // And other properties: gltf.scenes, gltf.cameras, gltf.asset
    })
    .catch(error => {
        console.error(error);
    });
*/