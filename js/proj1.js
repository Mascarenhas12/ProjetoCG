function main() {
  new Environment().start();
}

function Environment() {
  'use strict'

  var _clock = new THREE.Clock(true);

  var _robot = new Robot([0,0,0]);
  var _pedestal = new Pedestal([0,0,0]);

  var _scene = createScene();
  var _renderer = createRenderer();

  var _camera1 = createCamera(0, 50, 0);
  var _camera2 = createCamera(0, 0, 50);
  var _camera3 = createCamera(50, 0, 0);
  var _currentCamera = _camera1;

  this.start = function() {
    'use strict'

    document.body.appendChild(_renderer.domElement);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    //window.addEventListener('resize', onResize);

    render();
    animate();
  }

  function createScene() {
      'use strict';

      var scene = new THREE.Scene();
      scene.add(new THREE.AxisHelper(10));
      scene.add(_robot);
      scene.add(_pedestal);

      return scene;
  }

  function createCamera(x, y, z) {
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

      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
      camera.lookAt(_scene.position);
      return camera;
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

  function update() {
		'use strict'

		var deltaTime = _clock.getDelta();

		if (_robot.userData.movingLeft) {
			_robot.position += 10 * deltaTime;
			//_robot.translateZ(-10 * deltaTime);
		}
		if (_robot.userData.movingFoward) {
			_robot.translateX(10 * deltaTime);
		}
		if (_robot.userData.movingRight) {
			_robot.translateZ(10 * deltaTime);
		}
		if (_robot.userData.movingBackward) {
			_robot.translateX(-10 * deltaTime);
		}
		if (_robot.userData.rotateLeft) {
			_robot.rotateArm(Math.PI/8 * deltaTime);
		}
		if (_robot.userData.rotateRight) {
			_robot.rotateArm(-Math.PI/8 * deltaTime);
		}
		if (_robot.userData.moveArmBackward) {
		 	if (_robot.userData.currRotation < Math.PI/3.5) {
		  	_robot.userData.currRotation += Math.PI/8 * deltaTime;
		  	_robot.moveArm(Math.PI/8 * deltaTime);
		 	}
		}
		if (_robot.userData.moveArmFoward) {
			if (_robot.userData.currRotation > -Math.PI/3.5) {
				_robot.userData.currRotation -= Math.PI/8 * deltaTime;
				_robot.moveArm(-Math.PI/8 * deltaTime);
			}
		}
  }

  function render() {
    'use strict'
    _renderer.render(_scene,_currentCamera);
  }

  function onKeyDown(e) {
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
        _currentCamera = _camera1;
        break;

      case 50: // "2"
        _currentCamera = _camera2;
        break;

      case 51: // "3"
        _currentCamera = _camera3;
        break;

      case 52: // "4"
        if (_robot.userData.unlockVisibility){
          _robot.userData.unlockVisibility = false;
          _robot.changeVisibility();
          _pedestal.changeVisibility();
        }
        break;

      default:
        break;
    }
  }

  function onKeyUp(e) {
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

      case 52: // "4"
        _robot.userData.unlockVisibility = true;
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

      default:
        break;
    }
  }
}
