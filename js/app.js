//variables for setup


let container
let camera
let renderer
let scene
let model

function init() {
    container = document.querySelector('.scene');


    //create scene
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth /container.clientHeight;
    const near = 0.1;
    const far = 500;

    //camera Setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(3,10,60);
    const ambient = new THREE.AmbientLight(0x404040,5);
    scene.add(ambient); 

    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model
    let loader = new THREE.GLTFLoader();
    loader.load('assets/3d/modelv7.glb', function(gltf){
        scene.add(gltf.scene); 
        model = gltf.scene.children[0];
        animate();

    });
}
function animate(){
    requestAnimationFrame(animate);
   // model.rotation.y += 0.01;
  //  model.rotation.x += 0.01;
    model.rotation.z += 0.008;
    renderer.render(scene, camera);
}

init()

function onWindowResize(){
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth,container.clientHeight);
}

window.addEventListener('resize',onWindowResize);