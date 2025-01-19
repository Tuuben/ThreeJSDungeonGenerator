import * as Three from 'three'
import { scene } from './init'

const DEFAULT_MATERIAL: Three.MeshBasicMaterialParameters = { color: 'lightblue', reflectivity: 1 } 

export const createCube = (size: Three.Vector3, materialParams: Three.LineBasicMaterialParameters = DEFAULT_MATERIAL) => {
    const geometry = new Three.BoxGeometry(size.x, size.y, size.z)
    const material = new Three.MeshPhongMaterial(materialParams)
    const cube = new Three.Mesh(geometry, material)
    cube.receiveShadow = true
    cube.castShadow = true

    scene.add(cube)
    return cube
}

export const createPlane = (size: Three.Vector2, materialParams: Three.MeshBasicMaterialParameters = DEFAULT_MATERIAL) => {
    const geometry = new Three.PlaneGeometry(size.x, size.y)
    const material = new Three.MeshLambertMaterial(materialParams)
    const plane = new Three.Mesh(geometry, material)
    plane.receiveShadow = true

    scene.add(plane)
    return plane
}
