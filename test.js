import * as THREE from './node_modules/three/build/three.module.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x111111)
document.body.appendChild( renderer.domElement );


const ring = 16
const length = 128
const geometry = new THREE.TorusKnotGeometry(1, 0.2, length, ring);

const colors = new Float32Array( ((length+1)*(ring+1)) * 3 ); // 3 vertices per point
geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

console.log(geometry.vertices)
const color = new THREE.Color();


const material = new THREE.PointsMaterial( {
    vertexColors: true,
    size: 0.01,
});
const knot = new THREE.Points( geometry, material );
scene.add( knot );

ringColor(1)

function ringColor(x, worm_length) {
    const colors = knot.geometry.attributes.color.array
    let index = 0;
    const num = x % length
    const sec_num = (x+worm_length)%length

    for(let i = 0; i < (length+1)*(ring+1); i++){
        const offset = i-18

        const first_in_ring = (num-1)*ring+(num-3)
        const last_in_ring = sec_num*ring+(sec_num-1)

        if (last_in_ring < first_in_ring){
            if(offset > first_in_ring || offset < last_in_ring){
                color.setHex(0xff0000)
            }
            else {
                color.setHex(0x00ff00)
            }
        }
        else{
            if (offset < last_in_ring && offset > first_in_ring){
                color.setHex(0xff0000)
            }
            else{
                color.setHex(0x00ff00)
            }
        }
        colors[index++]=color.r
        colors[index++]=color.g
        colors[index++]=color.b
    }
}

let num = 1
camera.position.z = 5;
function animate() {
	requestAnimationFrame( animate );
    num += 0.25
    ringColor(num, 50)
    knot.geometry.attributes.color.needsUpdate = true
    knot.rotation.x += 0.003;
    knot.rotation.y += 0.003;
	renderer.render( scene, camera );
}
animate();