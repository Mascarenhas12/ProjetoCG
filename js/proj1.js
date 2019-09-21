function main() {
  new Environment().start();
}

class Robot extends THREE.Object3D {
  //_base;
  //_wheels[4];
  //_arm // Arm {joints, hand}
}

function Environment() {

  _scene = createScene();
  _camera = createCamera();
  _renderer = createRenderer();

  //_robot{base,ball,arm,hand};
  //_target;

  this.start = function() {
    /*add event listeners here*/
    document.body.appendChild(_renderer.domElement);
    window.addEventListener('keydown', onKeyDown);
    //window.addEventListener('resize', onResize);
    
    render();
    animate();
  }

  function animate() {
    update();
    render();
    requestAnimationFrame(animate);
  }

  function createScene() {
      'use strict';
      var scene = new THREE.Scene();
      scene.add(new THREE.AxisHelper(10));
      return scene;
  }

  function createCamera() {
      'use strict';
      var camera = new THREE.PerspectiveCamera(70,
                                           window.innerWidth / window.innerHeight,
                                           1,
                                           1000);
      camera.position.x = 50;
      camera.position.y = 50;
      camera.position.z = 50;
      camera.lookAt(_scene.position);
      return camera;
  }

  function changeCamera(x,y,z) {
    _camera.position.x = x;
    _camera.position.y = y;
    _camera.position.z = z;
    _camera.lookAt(_scene.position);
  }

  function createRenderer() {
    'use strict'
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
  }

  function render(){
    'use strict'
    _renderer.render(_scene,_camera);
  }

  function onKeyDown(e){
    'use strict';

    switch(e.keyCode){
      case 49:// "1"
        changeCamera(50,50,50);
        break;

      case 50:// "2"
        changeCamera(0,50,0);
        break;

      case 51:// "3"
        changeCamera(0,-50,0);
        break;

      case 79:// "o"
        _scene.traverse(function (node){
          if(node instanceof THREE.Mesh){
            node.material.wireframe = !node.material.wireframe;
          }
        });
        break;
    }

    render();
  }

}

 function update(){
   'use strict'
}
