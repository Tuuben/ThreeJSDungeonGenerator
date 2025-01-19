import * as Three from 'three'
import { scene } from './init'

export const createSceneLight = (debugDisplayHelpers: boolean = false) => {
    // Ambient Light
    const ambientLight = new Three.AmbientLight(0x404040, 30)
    ambientLight.castShadow = true
    scene.add(ambientLight)


    // Hemisphere Light
    const hemiLight = new Three.HemisphereLight( 0xffffff, 0xffffff, 2 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );

    if (debugDisplayHelpers) {
        const hemiLightHelper = new Three.HemisphereLightHelper( hemiLight, 10 );
        scene.add( hemiLightHelper );
    }

    // Directional Light
    const directionalLight = new Three.DirectionalLight(0xffffff, 0.5)
    //directionalLight.color.setHSL(0.1, 1, 0.95)
    directionalLight.position.set( - 1, 1.75, 1 );
    directionalLight.castShadow = true
    directionalLight.position.multiplyScalar(30)
    scene.add(directionalLight)

    directionalLight.castShadow = true

    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048

    const d = 50;

    directionalLight.shadow.camera.left = -d
    directionalLight.shadow.camera.right = d
    directionalLight.shadow.camera.top = d
    directionalLight.shadow.camera.bottom = -d

    directionalLight.shadow.camera.far = 3500;
    directionalLight.shadow.bias = - 0.0001;

    if (debugDisplayHelpers) {
        const directionalLightHelper = new Three.DirectionalLightHelper(directionalLight, 10)
        scene.add(directionalLightHelper);
    }
}
