import { initThreeJS, scene, camera, renderer } from './init'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createSky } from './sky';
import { createSceneLight } from './light';
import { generateDungeon } from './dungeon/dungeonGenerator';

initThreeJS()

generateDungeon()

//const plane = createPlane(new Three.Vector2(50, 50), { color: 'darkgray' })
createSky()
createSceneLight()

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

camera.position.set(50, 50, 50)
controls.target.set(0, 0, 0)
camera.lookAt(0, 0, 0)

const generateButton = document.getElementById("generate")

generateButton?.addEventListener("click", () => {
  window.location.reload()
})

function animate() {
  renderer.render(scene, camera)
  //cube.rotation.x += 0.01
  //cube.rotation.y += 0.01
}

renderer.setAnimationLoop(animate)
