import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight);
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

// const ambientLight = new THREE.AmbientLight(0x404040, 5); // Soft white light
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 1, 100);
// pointLight.position.set(10, 10, 10);
// scene.add(pointLight)

// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(15, 40, 35);
// spotLight.angle = Math.PI / 6;
// scene.add(spotLight)

// Key Light
const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(5, 5, 5); // Adjust position as needed
scene.add(keyLight);

// Fill Light
const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(-5, 5, 5); // Adjust position as needed
scene.add(fillLight);

// Back Light
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 5, -5); // Adjust position as needed
scene.add(backLight);


const loader = new GLTFLoader()
let gltfScene
let tablet_scene
let iphone_scene
let multimeter_scene
let wrench_scene
let screwdriver_scene
loader.load('./models/macbook/scene.glb', ( gltf ) => {
    gltfScene = gltf.scene
    loader.load('./models/multimeter/multimeter.gltf', ( gltf ) => {
        multimeter_scene = gltf.scene				
        multimeter_scene.scale.setScalar(0.4)
        multimeter_scene.position.setX(0.5)
        gltfScene.add(multimeter_scene)
    }, undefined, ( error ) => {
        console.error( error )
    })
    loader.load('./models/wrench/wrench.gltf', ( gltf ) => {
        wrench_scene = gltf.scene	
        wrench_scene.scale.setScalar(0.2)	
        wrench_scene.position.setX(-0.4)	
        wrench_scene.rotation.x = Math.PI / 2;	
        // let wrench_clone = wrench_scene.clone()
        // wrench_clone.position.setZ(-0.05)
        // wrench_clone.scale.setScalar(0.15)
        gltfScene.add(wrench_scene)
    }, undefined, ( error ) => {
        console.error( error )
    })
    loader.load('./models/screwdriver/screwdriver.gltf', ( gltf ) => {
        screwdriver_scene = gltf.scene
        screwdriver_scene.scale.setScalar(0.1)
        screwdriver_scene.position.setX(-0.4)
        screwdriver_scene.position.setZ(-0.15)
        screwdriver_scene.rotation.z = Math.PI / 2;
        gltfScene.add(screwdriver_scene)
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

    if (gltfScene, tablet_scene, iphone_scene, multimeter_scene, wrench_scene, screwdriver_scene) {
        gltfScene.rotation.x += 0.001; // Rotate around X-axis
        gltfScene.rotation.y += 0.009; // Rotate around Y-axis
        gltfScene.rotation.z += 0.001; // Rotate around Z-axis

        tablet_scene.rotation.x += 0.001; // Rotate around X-axis
        tablet_scene.rotation.y += 0.009; // Rotate around Y-axis
        tablet_scene.rotation.z += 0.001; // Rotate around Z-axis
        
        iphone_scene.rotation.x += 0.001; // Rotate around X-axis
        iphone_scene.rotation.y += 0.009; // Rotate around Y-axis
        iphone_scene.rotation.z += 0.001; // Rotate around Z-axis
        
        multimeter_scene.rotation.x += 0.001; // Rotate around X-axis
        multimeter_scene.rotation.y += 0.005; // Rotate around Y-axis
        multimeter_scene.rotation.z += 0.009; // Rotate around Z-axis

        wrench_scene.rotation.x += 0.001; // Rotate around X-axis
        wrench_scene.rotation.y += 0.005; // Rotate around Y-axis
        wrench_scene.rotation.z += 0.009; // Rotate around Z-axis

        screwdriver_scene.rotation.x += 0.001; // Rotate around X-axis
        screwdriver_scene.rotation.y += 0.005; // Rotate around Y-axis
        screwdriver_scene.rotation.z += 0.009; // Rotate around Z-axis
    }

    renderer.render(scene, camera);
}

animate();

console.log("Hello")