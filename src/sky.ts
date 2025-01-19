import { MathUtils, Vector3 } from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { scene } from './init';

export const createSky = () => {
    const sky = new Sky();
    sky.scale.setScalar(450000);

    const phi = MathUtils.degToRad(90);
    const theta = MathUtils.degToRad(120);
    const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms.sunPosition.value = sunPosition;

    scene.add(sky);
}