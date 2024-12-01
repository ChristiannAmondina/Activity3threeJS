import * as THREE from 'three';
import '/src/styles.css'; // Ensure this path is correct depending on your project setup
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const textureLoader = new THREE.TextureLoader();
/**
//-------------------------------------------------------------------------------------------------------- Base
 */
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

//----------------------------------------------------------------------------SUN
// Load Sun texture
const sunTexture = textureLoader.load('/static/images/texture/sun.jpg'); // Add the path to your sun texture

// Create material for the Sun (use emissive material to make it glow)
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    emissive: 0xFFFFFF,  // White emissive light to simulate the glowing effect
    emissiveIntensity: 4,  // Adjust emissive intensity to control brightness
  
});

// Create Sun sphere geometry and mesh
const sun = new THREE.Mesh(
    new THREE.SphereGeometry(5, 64, 64),  // Larger radius for the Sun
    sunMaterial
);

// Position the Sun far from Earth
sun.position.set(30, 10, 0);  // Adjust the position as necessary
sun.scale.set(0.1, 0.1, 0.1); // Scale the sun to make it larger (5 times)

// Add the Sun to the scene
scene.add(sun);

// Add light source (sun light)
const sunLight = new THREE.PointLight(0xFFFFFF, 1.5, 100);  // Intensity of light
sunLight.position.set(30, 0, 0);  // Position same as the Sun


// Optionally, add a shadow from the Sun (if you need)
sunLight.castShadow = true;

// Add the light to the scene
scene.add(sunLight);

//----------------------SUN LAYER



// Create the material for the sun layer
const sunlayerMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // Set the color of the glow (white in this case)
    emissive: 0xffffff, // Make it glow with the same color
    emissiveIntensity: 2, // Initial brightness of the glow
    blending: THREE.AdditiveBlending, // Additive blending for a glowing effect
    transparent: true, // Make it semi-transparent
    opacity: 0.2, // Set the opacity level
});

// Create the sun mesh with a sphere geometry
const sunlayer = new THREE.Mesh(new THREE.SphereGeometry(1.1, 64, 64), sunlayerMaterial);

// Position and scale the sun mesh
sunlayer.position.set(30, 10, 0); // Place the sun at the origin
sunlayer.scale.set(1.4, 1.4, 1.4); // Scale it to create the glowing halo

// Add the sun layer to the scene
scene.add(sunlayer);

// Animation Variables for the "bling-bling" effect
let time = 0;
const pulseSpeed = 0.5; // Speed of pulsing
const maxIntensity = 3; // Maximum emissive intensity
const minIntensity = 1; // Minimum emissive intensity
//-------------------------------------------------------------------------------------------------------- Load Earth texture

const earthTexture = textureLoader.load('/static/images/texture/Earthmap1.jpg');
earthTexture.encoding = THREE.sRGBEncoding; // Ensure proper color space handling
earthTexture.wrapS = THREE.RepeatWrapping;  // Repeat horizontally
earthTexture.wrapT = THREE.RepeatWrapping;  // Repeat vertically
earthTexture.magFilter = THREE.LinearFilter; // Use linear filtering for smooth texture scaling

//--------------------------------------------------------------------------------- Create material for the Earth
const earthMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',                 // Base color (not needed with a texture, but can be used for fallback)
    map: earthTexture,                // Apply the Earth texture
    metalness: 0.2,                   // Slight metalness for realism
    
    roughness: 0.4,                   // Low roughness for a smoother surface
    emissiveIntensity: 0.3,           // Low emissive intensity to give the Earth a subtle glow
});

//---------------------------------------------------------------------------------  Create Earth sphere geometry and mesh
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 64, 64),  // Sphere with radius 1 and 64 segments (for smoother appearance)
    earthMaterial                        // Apply the material to the sphere
);

//---------------------------------------------------------------------------------  Position and scale the Earth mesh
earth.position.set(0, 0, 0);             // Position the Earth at the center of the scene
earth.scale.set(1.5, 1.5, 1.5);          // Scale the Earth 1.5 times in all directions

//---------------------------------------------------------------------------------  Add Earth to the scene
scene.add(earth);



//--------------------MOON
// Set Moon's distance from Earth
// Set Moon's distance from Earth
const moonDistance = 15;  // Increased distance from Earth (15 units away)

// 1. Load the Moon texture (replace with the path to your Moon texture)
// Load Moon texture
const moonTexture = textureLoader.load('/static/images/texture/moon.jpg');
moonTexture.encoding = THREE.sRGBEncoding;  // Optional: Ensure proper color space handling

// Create the material for the Moon with the texture and emissive glow
const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,       // Apply the Moon texture
    metalness: 0.1,         // Slight metalness for realism
    roughness: 0.8,         // Adjust roughness to make it look like the Moon's surface
   
    emissiveIntensity: 1,   // Increase emissive intensity to make it glow more
});

// Create the Moon mesh with the material
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),  // Moon sphere geometry with radius 0.5
    moonMaterial                          // Apply the Moon material
);

// Set the initial position of the Moon (behind the Earth)
moon.position.set(14, 0, -15);  // 15 units behind Earth

// Add the Moon to the scene
scene.add(moon);



// Your tick function here...

//--------------------------------------------------------------------------------- * Ozone Layer

const ozoneMaterial = new THREE.MeshBasicMaterial({
    color: 0x027fe0,
    emissive: 0xbde2ff,
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.20,
});

const ozone = new THREE.Mesh(new THREE.SphereGeometry(1.1, 64, 64), ozoneMaterial);
ozone.position.set(0, 0, 0);
ozone.scale.set(1.4, 1.4, 1.4);
scene.add(ozone);



const cloudTexture = textureLoader.load('/static/images/earth/05_earthcloudmaptrans.png');

const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    emissive: 0xbde2ff,
    emissiveIntensity: 2,
    roughness: 0,


    blending: THREE.AdditiveBlending,
   // blending: THREE.MultiplyBlending
    //blending: THREE.NormalBlending
     
    opacity: 0.190, // Fully opaque (since blending is used)
});



const cloud = new THREE.Mesh(new THREE.SphereGeometry(1.1, 64, 64), cloudMaterial);
cloud.position.set(0, 0, 0);
cloud.scale.set(1.410, 1.400, 1.410);

scene.add(cloud);
//--------------------------------------------------------------------------------EARTH LIGHTS

const earthlightTexture = textureLoader.load('/static/images/earth/03_earthlights1k.jpg');

const earthlightMaterial = new THREE.MeshBasicMaterial({
    map: earthlightTexture,
    emissive: 0xbde2ff,
    emissiveIntensity: 2,
    blending: THREE.CustomBlending,
    blendEquation: THREE.AddEquation, // Or any other blend equation
    blendSrc: THREE.SrcAlphaFactor, // Or other blend factors
    blendDst: THREE.OneMinusSrcAlphaFactor, // Or other blend factors

    //blending: THREE.AdditiveBlending
   // blending: THREE.MultiplyBlending
    //blending: THREE.NormalBlending
     
    opacity: 0.7, // Fully opaque (since blending is used)
});



const earthlight = new THREE.Mesh(new THREE.SphereGeometry(1.1, 64, 64), earthlightMaterial);
earthlight.position.set(0, 0, 0);
earthlight.scale.set(1.420, 1.420, 1.420);

scene.add(earthlight);
//-------------------------------------------------------------------  Correctly set the position and scale for the `cloud` object





//--------------------------------------------------------------------------------- * Particles (Asteroids)

const particleTexture = textureLoader.load('/static/images/texture/asteroid.avif');
const particlesCount = 250;
const radius = 10;
const minDistance = 0.5;
const particlesGroup = new THREE.Group();
const particleVelocities = [];
const asteroidPositions = [];

for (let i = 0; i < particlesCount; i++) {
    const asteroidRadius = Math.random() * 0.05 + 0.03;
    const particleGeometry = new THREE.SphereGeometry(asteroidRadius, 6, 2);
    const positions = particleGeometry.attributes.position.array;

    for (let j = 0; j < positions.length; j += 3) {
        const noiseFactor = 0.02 * asteroidRadius;
        positions[j] += (Math.random() - 0.5) * noiseFactor;
        positions[j + 1] += (Math.random() - 0.5) * noiseFactor;
        positions[j + 2] += (Math.random() - 0.5) * noiseFactor;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    const particleMaterial = new THREE.MeshStandardMaterial({
        map: particleTexture,

      
        emissiveIntensity: 0.1,
        roughness: 0.8,
        metalness: 0.3,
    });

    const particle = new THREE.Mesh(particleGeometry, particleMaterial);

    let positionValid = false;
    let x, y, z;

    while (!positionValid) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const distance = radius + Math.random() * 4;

        x = distance * Math.sin(phi) * Math.cos(theta);
        y = distance * Math.cos(phi);
        z = distance * Math.sin(phi) * Math.sin(theta);

        positionValid = true;
        for (const pos of asteroidPositions) {
            const dx = pos.x - x;
            const dy = pos.y - y;
            const dz = pos.z - z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < minDistance) {
                positionValid = false;
                break;
            }
        }
    }

    asteroidPositions.push({ x, y, z });
    particle.position.set(x, y, z);
    particlesGroup.add(particle);

    particleVelocities.push({
        x: (Math.random() - 0.5) * 0.005,  // Reduced to slow down movement
        y: (Math.random() - 0.5) * 0.005,  // Reduced to slow down movement
        z: (Math.random() - 0.5) * 0.005,  // Reduced to slow down movement
    });
}// Move particlesGroup closer to the camera





scene.add(particlesGroup);


const loader = new GLTFLoader();

// Array to store the satellites
let satellites = [];
const numberOfSatellites = 3;  // Reduce the number of satellites

const satelliteOrbitSpeed = 0.001;  // Slow orbit speed for the satellite
const satelliteScale = 0.01;  // Smaller scale for satellites

const satelliteDistances = [radius - 6.6, radius - 10, radius - 14, radius - 18, radius - 22];  // Distances of the satellites from Earth



// Load the satellites
for (let i = 0; i < numberOfSatellites; i++) {
    loader.load('/static/images/3D/satellite.glb', (gltf) => {
        const satellite = gltf.scene;
        satellite.scale.set(satelliteScale, satelliteScale, satelliteScale);  // Scale of the satellite
        satellite.position.set(satelliteDistances[i], 0, 0);  // Position the satellite at a different distance

        // Loop through all the materials of the satellite
        satellite.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = false;

                // Set the material properties for roughness and metalness
                if (child.material.isMeshStandardMaterial) {
                    child.material.roughness = 0;  // Set roughness to 0 (shiny)
                    child.material.metalness = 0.3;  // Set metalness to 1 (fully metallic)
                }
            }
        });

        // Add lighting for realism
        const satelliteLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.1, 2);
        satelliteLight.position.set(40, 5, 5);
        satelliteLight.target = satellite;
        scene.add(satelliteLight);

        scene.add(satellite);  // Add satellite to the scene

        // Store the satellite in the satellites array
        satellites.push(satellite);
    });
}



//--------------------------------------------------------------------------------- * astronaut


let astronaut, mixer;  // Declare a variable to store the astronaut object and mixer
const astroDistance = 5;  // Increased distance from Earth (15 units away)
// Load the Bee model (assuming it is in the same directory or path)
loader.load('/static/images/3D/Walkingastronaut.glb', (gltf) => {
    astronaut = gltf.scene;

    // Set the scale of the astronaut (adjust to your preference)
    astronaut.scale.set(0.10, 0.10, 0.10);  // Adjust scale as needed

    // Position the astronaut at a specific location in the scene (e.g., next to Earth)
    astronaut.position.set(24, 0, -1);  // Adjust x, y, z values to bring it closer

    // Loop through all the materials of the astronaut to apply lighting/shadow
    astronaut.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Set the material properties for roughness and metalness (if applicable)
            if (child.material.isMeshStandardMaterial) {
                child.material.roughness = 0.9;  // Adjust as needed
                child.material.metalness = 0.7;  // Adjust as needed
            }
        }
    });

    // Set up the animation mixer to handle the animations in the model
    mixer = new THREE.AnimationMixer(astronaut);

    // Get animations from the glTF and add them to the mixer
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();  // Play all animations
    });

    // Add any additional lighting for the astronaut (optional)
    const astronautLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.1, 2);
    astronautLight.position.set(15, 15, 10);  // Position the light to illuminate the astronaut
    astronautLight.target = astronaut;  // Target the astronaut with the light
    scene.add(astronautLight);

    // Add the astronaut to the scene
    scene.add(astronaut);
});
//--------------------------------------------------------------------------------- * Lights
 
const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.position.set(30, 10, 0);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

/**
 * Stars
 */
const starsCount = 20000;
const starPositions = new Float32Array(starsCount * 3);
const minStarDistance = 50;
const maxStarDistance = 200;

for (let i = 0; i < starsCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const distance = Math.random() * (maxStarDistance - minStarDistance) + minStarDistance;
    const x = distance * Math.sin(phi) * Math.cos(theta);
    const y = distance * Math.cos(phi);
    const z = distance * Math.sin(phi) * Math.sin(theta);

    starPositions[i * 3 + 0] = x;
    starPositions[i * 3 + 1] = y;
    starPositions[i * 3 + 2] = z;
}

const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

const starsMaterial = new THREE.PointsMaterial({
    color: 0x4fffff,
    sizeAttenuation: true,
    size: 0.03,
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

/**
 //--------------------------------------------------------------------------------- * Camera
 */
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// Set full rotation for both X and Y axes
controls.maxPolarAngle = Math.PI;  // Allow full vertical rotation (360-degree)
controls.minPolarAngle = 0;        // Allow the camera to rotate all the way down to the ground

controls.maxDistance = 17;
controls.minDistance = 2.6;

const groundHeight = -10;


function checkCameraPosition() {
    // Prevent camera from going below the ground height
    if (camera.position.y < groundHeight) {
        camera.position.y = groundHeight;
    }

    
}

 //--------------------------------------------------------------------------------- * Renderer
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;  // Soft shadows for realism

/**
 //--------------------------------------------------------------------------------- * Animate
 */
 const clock = new THREE.Clock();
let previousTime = 0;





const tick = () => {
    const elapsedTime = clock.getElapsedTime();  // Get elapsed time
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    controls.update(); // Update camera controls

    // Update Earth's rotation
    earth.rotation.x += 0.010 * deltaTime;
    earth.rotation.y += 0.010 * deltaTime;

    ozone.rotation.x += 0.010 * deltaTime;
    ozone.rotation.y += 0.010 * deltaTime;

   
    earthlight.rotation.x += 0.010 * deltaTime;
    earthlight.rotation.y += 0.010 * deltaTime;

    cloud.rotation.x += 0.020 * deltaTime;
    cloud.rotation.y += 0.020 * deltaTime;

    // Update the Moon's orbit around Earth
    const orbitRadius = moonDistance;  
    const moonOrbitSpeed = 0.010;      

    moon.position.x = orbitRadius * Math.cos(elapsedTime * moonOrbitSpeed);
    moon.position.z = orbitRadius * Math.sin(elapsedTime * moonOrbitSpeed);
    moon.rotation.y = elapsedTime * moonOrbitSpeed;

    // Update astronaut's orbit around the Moon
    if (astronaut) {
        const astroOffset = 1.5;  // Distance offset from the Moon
        astronaut.position.x = moon.position.x + astroOffset * Math.cos(elapsedTime * moonOrbitSpeed);
        astronaut.position.z = moon.position.z + astroOffset * Math.sin(elapsedTime * moonOrbitSpeed);
        astronaut.position.y = moon.position.y;
    }

    // Update sun properties
    const sunScaleFactor = 1 + 0.2 * Math.abs(Math.sin(elapsedTime));  // Dynamic sun scale
    sunlayer.scale.set(sunScaleFactor, sunScaleFactor, sunScaleFactor);
    sunlayerMaterial.emissiveIntensity = minIntensity + Math.sin(elapsedTime * pulseSpeed) * (maxIntensity - minIntensity);
    sunlayerMaterial.opacity = 0.2 + 0.1 * Math.sin(elapsedTime * pulseSpeed);

    // Animation mixer
    if (mixer) mixer.update(deltaTime);

        // Update the particles' positions
        particlesGroup.children.forEach((particle, i) => {
            const velocity = particleVelocities[i];
            particle.position.x += velocity.x;
            particle.position.y += velocity.y;
            particle.position.z += velocity.z;
        });
    
    
        
        satellites.forEach((satellite, index) => {
            const orbitRadius = satelliteDistances[index];  // Get the distance of each satellite from Earth
    
            // Update the satellite's position based on its orbit
            satellite.position.x = orbitRadius * Math.cos(elapsedTime * satelliteOrbitSpeed * (index + 1));  // Multiply by index to make each satellite orbit differently
            satellite.position.z = orbitRadius * Math.sin(elapsedTime * satelliteOrbitSpeed * (index + 1));
    
            // Rotate the satellite (if desired, you can change rotation logic here)
            satellite.rotation.y += 0.10 * deltaTime;
        });
    // Render the scene
    renderer.render(scene, camera);

    // Continue the animation loop
    window.requestAnimationFrame(tick);
};


// Start the animation
tick();