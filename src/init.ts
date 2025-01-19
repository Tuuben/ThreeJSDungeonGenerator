import * as Three from 'three'

export let scene: Three.Scene
export let camera: Three.PerspectiveCamera
export let renderer: Three.WebGLRenderer

export const initThreeJS = () => {
    scene = new Three.Scene()
    camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.fov = 45
    camera.near = 0.1
    camera.far = 1000
    renderer = new Three.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)
    console.log("Three.js initialized")
}