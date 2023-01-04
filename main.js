import * as THREE from 'three'
import gsap from 'gsap'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//Making a scene
const scene = new THREE.Scene()

//Making our sphere
const geometry = new THREE.SphereGeometry(3,64,64) // getting the shape
const material = new THREE.MeshStandardMaterial({ //getting the material for the shape
  color: '#00ff83',
  roughness: 0.4
})
const mesh = new THREE.Mesh(geometry, material);//combining shape with the material
scene.add(mesh) //adding to the scene

//Sizing
const sizes = {
  width: innerWidth,
  height: innerHeight
}

//Making the light
const light = new THREE.PointLight(0xffffff,1,100) 
light.position.set(0,10,10) //(x,y,z) position of the light
light.intensity = 1.25
scene.add(light)


//Making the camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height, 0.1,100) //this camera can only see things that are within 0.1 to 100 distance units away from it
camera.position.z = 20
scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)



//Responsive resize
window.addEventListener("resize" , () =>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
  
})
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls. autoRotateSpeed = 5

const loop = () =>{
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
//tl: timeline
const tl = gsap.timeline({defaults: {durations: 1}});
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y:'-100%'}, {y:"0"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})

//Mouse animations colors
let mouseDown = false;
window.addEventListener("mousedown", () => (mouseDown=true))
window.addEventListener("mouseup", () => {mouseDown=false})

let rgb = []
window.addEventListener('mousemove', (e) => { 
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.width)*255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
    gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b: newColor.b})
  }
})
