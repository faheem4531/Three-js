import * as THREE from "three"
import "./style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Curser
const curser = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {

  curser.x = event.clientX / sizes.width - 0.5
  curser.y = -(event.clientY / sizes.height - 0.5)
})


//  Scene 
const scene = new THREE.Scene();



//                                          Geomatery
// Red Triangles 
const geometry = new THREE.BufferGeometry()
// count of trangles 
const count = 50
const positionArray = new Float32Array(count * 3 * 3)
// set values in position array 
for (let i = 0; i < count * 3 * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 4
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
geometry.setAttribute('position', positionAttribute)


const material = new THREE.MeshBasicMaterial({
  color: '#ff0000',
  wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Canvas 
const canvas = document.querySelector('.webgl')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {

  // Update Size 
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update Camera 
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer 
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 4))
})


window.addEventListener('dblclick', () => {

  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  }
  else {
    document.exitFullscreen()
  }
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)


// Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


const tick = () => {
  // Update controls 
  controls.update()

  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()