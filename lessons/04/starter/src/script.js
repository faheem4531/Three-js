import * as THREE from "three"
import "./style.css"



//  Scene 
const scene = new THREE.Scene();



// Group 
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

group.add(cube1)

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff000 })
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0 })
)
cube3.position.x = 2
group.add(cube3)

// // Red Cube 
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: '#ff0000' })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


// // position 
// // mesh.position.x = 0.7
// // mesh.position.y = - 0.6
// // mesh.position.z = 1
// mesh.position.set(0.7, -0.6, 1);


// // Scale 
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)



// // Rotation 
// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.x = Math.PI * 0.25


// Axes helper 
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)




// Sizes
const sizes = {
  width: 800,
  height: 600
}




// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
// console.log(mesh.position.distanceTo(camera.position));


// camera.lookAt(mesh.position)


// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
