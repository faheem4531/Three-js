import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


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






//                           Fonts
const fontLoader = new FontLoader()
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

    textGeometry.center()  // to make text geomatery in center with threejs 

    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 })
    // textMaterial.wireframe = true
    const text = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(text)
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
camera.position.z = 2
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

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()