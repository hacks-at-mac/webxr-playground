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
spotLight.position.set(0, 10, 0);
spotLight.castShadow = true;
scene.add(spotLight);
spotLight.intensity = 2;
spotLight.angle = 0.3;
spotLight.target.position.set(0, 0, 0);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshToonMaterial( {color: 0xFF0000});
var cube = new THREE.Mesh( geometry, material );
//scene.add(cube);
cube.castShadow = true;

geometry = new THREE.PlaneGeometry(10, 10);
material = new THREE.MeshPhongMaterial( {color: 0x22bd68, side: THREE.DoubleSide} );
var plane = new THREE.Mesh(geometry, material);
plane.receiveShadow = true;
scene.add( plane );
plane.position.set(0, -1, 0);
plane.rotation.set(Math.PI/2, 0, 0);

geometry = new THREE.SphereGeometry( 1, 2, 12 );
material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
sphere.position.set(1, 2, 3);

camera.position.z = 5;

window.onkeydown = function(event) {
    switch(event.key) {
        case "w":
            camera.position.y += 0.1;
            break;
        case "a":
            camera.position.x -= 0.1;
            break;
        case "s":
            camera.position.y -= 0.1;
            break;
        case "d":
            camera.position.x += 0.1;
            break;
    }
}

window.onmousemove = function(event) {
    let dx = event.clientX - window.innerWidth / 2;
    let dy = event.clientY - window.innerHeight / 2;

    camera.rotation.x = dy / 100;
    camera.rotation.y = -dx / 100;
}


//
// Make things move!
//

renderer.setAnimationLoop(function () {
    // These changes happen to objects in our scene on every frame
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
});
