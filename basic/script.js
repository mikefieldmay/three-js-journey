console.log(THREE)
const scene = new THREE.Scene()
// A mesh is  a combination between a geometry and a material.
// A Geometry is a shape and the material is what the shape is made from
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
// the mesh must then be added to the scene
scene.add(mesh)

// We need to have a camera to provide a point of view.
// We always render from one camera, although you can have multiple cameras
// First arg is fov, second is aspect ratio

const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

const canvas = document.getElementById("webgl")

const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)