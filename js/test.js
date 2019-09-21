var camera, scene, renderer, material,ball,geometry,mesh;

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createPlataform(0,0,0);
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function addTableTopMain(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(16, 2, 12);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTableTopAux(obj, x, y, z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(4, 4, 16);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createPlataform(x, y, z) {
    'use strict';

    var plat = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addTableTopMain(plat, 0, 0, 0);
    addTableTopAux(plat,-12, 0, 0);
    addTableTopAux(plat,12, 0, 0);
    addSphere(plat,12,-4.5,7);
    addSphere(plat,-12,-4.5,-7);
    addSphere(plat,12,-4.5,-7);
    addSphere(plat,-12,-4.5,7);


    scene.add(plat);

    plat.position.x = x;
    plat.position.y = y;
    plat.position.z = z;
}

/*

class carrinho{
  base mesa;
  array[4] ball
}

carrinho.move (po caralho)


*/

function addSphere(obj, x, y, z){
    'use strict';

    ball = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(2 , 32, 32);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}
