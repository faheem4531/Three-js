import * as THREE from "three"
import "./style.css"
import gsap from "gsap"

console.log(gsap);



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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
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
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })


const tick = () => {


  // const ellapsedTime = clock.getElapsedTime()

  // camera.position.y = Math.sin(ellapsedTime)
  // camera.position.x = Math.cos(ellapsedTime)

  // mesh.rotation.y += 0.01
  // mesh.rotation.x += 0.01
  // mesh.rotation.z += 0.01

  // Render 
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()