import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



export function OrbitControls(camera, canvas) {
    const controls = new ThreeOrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;

    controls.maxPolarAngle = Math.PI; // Allow full vertical rotation
    controls.minPolarAngle = 0;       // Allow full downward rotation

    controls.maxDistance = 7;
    controls.minDistance = 2.6;

    const groundHeight = -10;

    controls.addEventListener('change', () => {
        // Prevent camera from going below the ground height
        if (camera.position.y < groundHeight) {
            camera.position.y = groundHeight;
        }
    });

    return controls;
}
