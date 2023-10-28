import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'


/**
 * Base
 */
// Debug
const gui = new lil.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png')
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png')






//                           Fonts
const fontLoader = new FontLoader()
let text
fontLoader.load(
  '/fonts/helvetiker_regular.typeface.json ',
  (font) => {
    const textGeometry = new TextGeometry(
      'Mushab Faheem',
      {
        font: font,
        size: 0.5,
        height: 0.2,    //  depth
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
      }
    )
    // textGeometry.computeBoundingBox()  // to make text geomatery in center manually 
    // textGeometry.translate(
    //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,   // subtract x and y values from bevelSize to make it center of the its axes
    //   - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
    //   - (textGeometry.boundingBox.max.z - 0.03) * 0.5   // subtract z value from bevelThickness to make it center of the its axes
    // )

    const params = {
      spin: () => {
        gsap.to(text.rotation, { duration: 2, x: text.rotation.x + 15 })
      }
    }


    textGeometry.center()  // to make text geomatery in center with threejs 
    const color = "skyblue"
    const material = new THREE.MeshMatcapMaterial({ color: color })
    material.wireframe = false




    text = new THREE.Mesh(textGeometry, material)
    text.scale.x = 2
    text.scale.y = 2
    text.scale.z = 3

    gui
      .add(material, 'wireframe')
    gui
      .add(text, 'visible').name('Hide Name')
    gui
      .addColor(material, 'color')
    gui
      .add(params, 'spin')

    scene.add(text)


    const donutGeometery = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 })
    const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64)
    const sphereMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture1 })
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 100)
    const planeMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 })

    for (let i = 0; i < 100; i++) {
      //                  donuts
      const donut = new THREE.Mesh(donutGeometery, donutMaterial)

      donut.position.x = (Math.random() - 0.5) * 20
      donut.position.y = (Math.random() - 0.5) * 20
      donut.position.z = (Math.random() - 0.5) * 20

      donut.rotation.x = Math.random() * Math.PI
      donut.rotation.y = Math.random() * Math.PI

      const scale = Math.random()
      donut.scale.x = scale
      donut.scale.y = scale
      donut.scale.z = scale

      scene.add(donut)

      //                   sphere

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

      sphere.position.x = (Math.random() - 0.5) * 25
      sphere.position.y = (Math.random() - 0.5) * 25
      sphere.position.z = (Math.random() - 0.5) * 15

      sphere.rotation.x = Math.random() * Math.PI
      sphere.rotation.y = Math.random() * Math.PI

      const scale2 = Math.random()
      sphere.scale.x = scale2
      sphere.scale.y = scale2
      sphere.scale.z = scale2

      scene.add(sphere)


      // plane 
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)

      plane.position.x = (Math.random() - 0.5) * 20
      plane.position.y = (Math.random() - 0.5) * 20
      plane.position.z = (Math.random() - 0.5) * 15

      plane.rotation.x = Math.random() * Math.PI
      plane.rotation.y = Math.random() * Math.PI

      const scale3 = Math.random()
      plane.scale.x = scale3
      plane.scale.y = scale3
      plane.scale.z = scale3

      scene.add(plane)
    }

  }
)



/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 6
scene.add(camera)



// Controls    // camera control system
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // text.rotation.x = 0.15 * elapsedTime
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()