import * as THREE from "three"
import "./style.css"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import gsap from 'gsap'
import * as lil from "lil-gui"


// Debui -- Gui 
const gui = new lil.GUI()
const params = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 2, y: mesh.rotation.y + 15 })
  }
}




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


// Red Cube 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Debug 
gui
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Y elevation')

gui
  .add(mesh.position, 'x')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('X elevation')

gui
  .add(mesh.position, 'z')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Z elevation')

gui
  .add(mesh, 'visible')

gui
  .add(material, 'wireframe')

gui
  .addColor(material, 'color')

gui
  .add(params, 'spin')




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


// // Clock 
const clock = new THREE.Clock()

const tick = () => {


  // const ellapsedTime = clock.getElapsedTime()

  // camera.position.y = Math.sin(ellapsedTime)
  // camera.position.x = Math.cos(ellapsedTime)

  // mesh.rotation.y = ellapsedTime
  // mesh.rotation.x += 0.01
  // mesh.rotation.z += 0.01


  // Update Camera 
  // camera.position.x = Math.sin(curser.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(curser.x * Math.PI * 2) * 3
  // camera.position.y = Math.sin(curser.y * Math.PI * 2) * 3
  // camera.position.z = Math.cos(curser.y * Math.PI * 2) * 3
  // camera.lookAt(mesh.position)


  // Update controls 
  controls.update()

  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()