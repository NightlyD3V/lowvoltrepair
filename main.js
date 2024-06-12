import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 0.6);

const loader = new GLTFLoader();
let gltfScene;
loader.load( './models/macbook/scene.glb', function ( gltf ) {
    gltfScene = gltf.scene;
	scene.add( gltfScene );
    renderer.render(scene, camera)   
}, undefined, function ( error ) {
	console.error( error );
} );

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor( "#76b5c5" );

function animate() {
    requestAnimationFrame(animate);

    if (gltfScene) {
        // gltfScene.rotation.x += 0.001; // Rotate around X-axis
        gltfScene.rotation.y += 0.009; // Rotate around Y-axis
        // gltfScene.rotation.z += 0.001; // Rotate around Z-axis
    }

    renderer.render(scene, camera);
}

animate();

console.log("Hello")