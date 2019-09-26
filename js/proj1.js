function main() {
  new Environment().start();
}

function Environment() {
  'use strict'

  var _robot = new Robot([0,0,0]);
  var _scene = createScene();
  var _camera = createCamera();
  var _renderer = createRenderer();

  this.start = function() {
    'use strict'

    document.body.appendChild(_renderer.domElement);

    /* add event listeners here */
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keypress', onKeyPress);
    //window.addEventListener('resize', onResize);

    render();
    animate();
  }

  function createScene() {
      'use strict';

      var scene = new THREE.Scene();
      scene.add(new THREE.AxisHelper(10));
      scene.add(_robot);
      scene.add(new Pedestal([0,0,0]));

      return scene;
  }

  function createCamera() {
      'use strict';

      var ratio = window.innerWidth / window.innerHeight;
      var view = 50;

      var camera = new THREE.OrthographicCamera(
        ratio*view / - 2,
        ratio*view / 2,
        view / 2,
        view / - 2,
        -1000,
        1000
      );

      camera.position.x = 0;
      camera.position.y = 50;
      camera.position.z = 0;
      camera.lookAt(_scene.position);
      return camera;
  }

  function changeCamera(x,y,z) {
    'use strict'

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

  function animate() {
    'use strict'

    update();
    render();

    requestAnimationFrame(animate);
  }

  function update(){
     'use strict'

     // Movimento conforme camara ou referencial?
     if (_robot.userData.movingLeft) {
       _robot.translateZ(-0.5);
       _robot.moveWheelsX(Math.PI/32);
     }
     if (_robot.userData.movingFoward) {
       _robot.translateX(0.5);
       _robot.moveWheelsZ(-Math.PI/32);
     }
     if (_robot.userData.movingRight) {
       _robot.translateZ(0.5);
       _robot.moveWheelsX(Math.PI/32);
     }
     if (_robot.userData.movingBackward) {
       _robot.translateX(-0.5);
       _robot.moveWheelsZ(Math.PI/32);
     }
     if (_robot.userData.rotateLeft) {
       _robot.rotateArm(Math.PI/32);
     }
     if (_robot.userData.rotateRight) {
       _robot.rotateArm(-Math.PI/32);
     }
     if (_robot.userData.moveArmBackward) {
       if (_robot.userData.currRotation < Math.PI/2.8) {
         _robot.userData.currRotation += Math.PI/32;
         _robot.moveArm(Math.PI/32);
       }
     }
     if (_robot.userData.moveArmFoward) {
       if (_robot.userData.currRotation > -Math.PI/3.5) {
         _robot.userData.currRotation -= Math.PI/32;
         _robot.moveArm(-Math.PI/32);
       }
     }
  }

  function render(){
    'use strict'

    _renderer.render(_scene,_camera);
  }

  function onKeyDown(e){
    'use strict';

    switch(e.keyCode){
      case 37: // "LEFT"
        _robot.userData.movingLeft = true;
        break;

      case 38: // "FOWARD"
        _robot.userData.movingFoward = true;
        break;

      case 39: // "RIGHT"
        _robot.userData.movingRight = true;
        break;

      case 40: // "BACKWARD"
        _robot.userData.movingBackward = true;
        break;

      case 65: // "A"
        _robot.userData.rotateLeft = true;
        break;

      case 83: // "S"
        _robot.userData.rotateRight = true;
        break;

      case 81: // "Q"
        _robot.userData.moveArmBackward = true;
        break;

      case 87: // "W"
        _robot.userData.moveArmFoward = true;
        break;

      case 49: // "1"
        changeCamera(0, 50, 0);
        break;

      case 50: // "2"
        changeCamera(0, 0, 50);
        break;

      case 51: // "3"
        changeCamera(50, 0, 0);
        break;

      default:
        break;
    }
  }

  function onKeyUp(e){
    'use strict';

    switch(e.keyCode){
      case 37: // "LEFT"
        _robot.userData.movingLeft = false;
        break;

      case 38: // "FOWARD"
        _robot.userData.movingFoward = false;
        break;

      case 39: // "RIGHT"
        _robot.userData.movingRight = false;
        break;

      case 40: // "BACKWARD"
        _robot.userData.movingBackward = false;
        break;

      case 65: // "A"
        _robot.userData.rotateLeft = false;
        break;

      case 83: // "S"
        _robot.userData.rotateRight = false;
        break;

      case 81: // "Q"
        _robot.userData.moveArmBackward = false;
        break;

      case 87: // "W"
        _robot.userData.moveArmFoward = false;
        break;
    }
  }

  function onKeyPress(e){
    'use strict';

    if (e.keyCode === 52){ // "4"
      _scene.traverse(function (node){
        if (node instanceof THREE.Mesh){
          node.material.wireframe = !node.material.wireframe;
        }
      });
    }
  }
}
