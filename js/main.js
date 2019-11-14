//
// Set up the scene
//

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//
// Handle resizing the browser
//

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize);


//
// Declare and initialize things in the scene
//

var ambientLight = new THREE.AmbientLight(0x404040, 0.1); // soft white light
scene.add(ambientLight);
ambientLight.intensity = 3;

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 2, 0);
spotLight.castShadow = true;
scene.add(spotLight);
spotLight.intensity = 1;
spotLight.target.position.set(0, 0, 0);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshStandardMaterial( {color: 0xFF0000});
var cube = new THREE.Mesh( geometry, material );
scene.add(cube);
cube.castShadow = true;

geometry = new THREE.PlaneGeometry(10, 10);
material = new THREE.MeshPhongMaterial( {color: 0x22bd68, side: THREE.DoubleSide} );
var plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
scene.add( plane );
plane.position.set(0, -1, 0);
plane.rotation.set(Math.PI/2, 0, 0);

camera.position.z = 5;


//
// Make things move!
//

renderer.setAnimationLoop(function () {
    // These changes happen to objects in our scene on every frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
});
