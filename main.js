import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 0.6);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor( "#0a0b0c" )
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25
renderer.shadowMap.enabled = true

// LIGHTING

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight)

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(15, 40, 35);
spotLight.angle = Math.PI / 6;
scene.add(spotLight)

const loader = new GLTFLoader()
let gltfScene;
loader.load('./models/macbook/scene.glb', function ( gltf ) {
    gltfScene = gltf.scene
	scene.add( gltfScene )
    renderer.render(scene, camera)   
}, undefined, function ( error ) {
	console.error( error )
} )
loader.load( './models/tablet/tablet.gltf', function ( gltf ) {
    gltf.scene.scale.setScalar(0.01)
    scene.add(gltf.scene)
    renderer.render(scene, camera) 
}, undefined, function ( error ) {
	console.error( error )
} )

addEventListener("resize", (event) => {})

onresize = (event) => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (gltfScene) {
        gltfScene.rotation.x += 0.001; // Rotate around X-axis
        gltfScene.rotation.y += 0.009; // Rotate around Y-axis
        gltfScene.rotation.z += 0.001; // Rotate around Z-axis
    }

    renderer.render(scene, camera);
}

animate();

console.log("Hello")