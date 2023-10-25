import * as THREE from "three"
import "./style.css"
import gsap from "gsap"

// Curser
const curser = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {

  curser.x = event.clientX / sizes.width - 0.5
  curser.y = event.clientY / sizes.height - 0.5
  console.log(event.clientX);
})

//  Scene 
const scene = new THREE.Scene();


// Red Cube 
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
  width: 800,
  height: 600
}


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)


// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// // Clock 
const clock = new THREE.Clock()



// Animations 
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })


const tick = () => {


  // const ellapsedTime = clock.getElapsedTime()

  // camera.position.y = Math.sin(ellapsedTime)
  // camera.position.x = Math.cos(ellapsedTime)

  mesh.rotation.y = ellapsedTime
  // mesh.rotation.x += 0.01
  // mesh.rotation.z += 0.01

  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()