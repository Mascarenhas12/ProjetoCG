var camera, scene, renderer, material,ball,geometry,mesh;

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("keydown",onKeyDown);
    createScene();
    createCamera();
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
    return camera;
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
    addTableTopAux(plat,-10.5, 0, 0);
    addTableTopAux(plat,10.5, 0, 0);
    addSphere(plat,12,-4.5,7);
    addSphere(plat,-12,-4.5,-7);
    addSphere(plat,12,-4.5,-7);
    addSphere(plat,-12,-4.5,7);


    scene.add(plat);

    plat.position.x = x;
    plat.position.y = y;
    plat.position.z = z;
}

function addSphere(obj, x, y, z){
    'use strict';

    ball = new THREE.SphereGeometry(2 , 32, 32);/*perguntar ao stor*/
    mesh = new THREE.Mesh(ball, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);

}

function onKeyDown(e){
  'use strict';

  switch(e.keyCode){
    case 49:// "1"
      camera.position.x=50;
      camera.position.y=50;
      camera.position.z=50;
      camera.lookAt(scene.position);
      break;

    case 50:// "2"
      camera.position.x=50;
      camera.position.y=0;
      camera.position.z=0;
      camera.lookAt(scene.position);
      break;

    case 51:// "3"
      camera.position.x=0;
      camera.position.y=-50;
      camera.position.z=0;
      camera.lookAt(scene.position);
      break;

    case 79:// "o"
      scene.traverse(function (node){
        if(node instanceof THREE.Mesh){
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;
  }

  render();
}


/*

class carrinho{
  base mesa;
  array[4] ball
}

carrinho.move (po caralho)


*/
