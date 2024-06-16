import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight);
camera.position.set(0, 0, 0.9);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize( window.innerWidth, window.innerHeight )
renderer.setClearColor( "#0a0b0c" )
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25
renderer.shadowMap.enabled = true

// LIGHTING

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(5, 10, 7.5);
// scene.add(directionalLight)

// const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(10, 10, 10);
// scene.add(pointLight)

// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(15, 40, 35);
// spotLight.angle = Math.PI / 6;
// scene.add(spotLight)

// Key Light
const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5); // Adjust position as needed
scene.add(keyLight);

// Fill Light
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 5, 5); // Adjust position as needed
scene.add(fillLight);

// Back Light
const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, 5, -5); // Adjust position as needed
scene.add(backLight);


const loader = new GLTFLoader()
let gltfScene
let tablet_scene
let iphone_scene
let multimeter_scene
loader.load('./models/macbook/scene.glb', ( gltf ) => {
    gltfScene = gltf.scene
    loader.load('./models/multimeter/multimeter.glb', (gltf) => {
        multimeter_scene = gltf.scene
        multimeter_scene.position.setY(0.3)
        // multimeter_scene.scale.setScalar(0.001)
        gltfScene.add(multimeter_scene)
    }, undefined, ( error ) => {
        console.error( error )
    })
    loader.load( './models/tablet/tablet.gltf', ( gltf ) => {
        tablet_scene = gltf.scene
        tablet_scene.position.setY(0.3)
        tablet_scene.scale.setScalar(0.01)
        loader.load('./models/phone/iphone.gltf', ( gltf ) => {
            iphone_scene = gltf.scene
            iphone_scene.position.setZ(20)
            iphone_scene.scale.setScalar(4)
            tablet_scene.add(iphone_scene)
        })
        gltfScene.add(tablet_scene)
        renderer.render(scene, camera) 
    }, undefined, ( error ) => {
        console.error( error )
    } )  
    scene.add( gltfScene )
    renderer.render(scene, camera) 
}, undefined, ( error ) => {
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

    if (gltfScene, tablet_scene, iphone_scene) {
        gltfScene.rotation.x += 0.001; // Rotate around X-axis
        gltfScene.rotation.y += 0.009; // Rotate around Y-axis
        gltfScene.rotation.z += 0.001; // Rotate around Z-axis

        tablet_scene.rotation.x += 0.001; // Rotate around X-axis
        tablet_scene.rotation.y += 0.009; // Rotate around Y-axis
        tablet_scene.rotation.z += 0.001; // Rotate around Z-axis
        
        iphone_scene.rotation.x += 0.001; // Rotate around X-axis
        iphone_scene.rotation.y += 0.009; // Rotate around Y-axis
        iphone_scene.rotation.z += 0.001; // Rotate around Z-axis
    }

    renderer.render(scene, camera);
}

animate();

console.log("Hello")