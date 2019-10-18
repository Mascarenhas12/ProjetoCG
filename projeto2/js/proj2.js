function main() {
  new Environment().start();
}

function Environment() {
  'use strict';

  var _clock = new THREE.Clock(true);

  var _fence = new Fence([0,0,-30]);
  var _cannons = [new Cannon([0,0,0]), new Cannon([30,0,0]), new Cannon([-30,0,0])];
  var _currCannon = _cannons[0];
  var _bullets = [];

  var _scene = createScene();
  var _renderer = createRenderer();

  var _camera1 = createOrtogonalCamera(0, 50, 0);
  var _camera2 = createPerpectiveCamera(0, 0, 50);
  //var _camera3 = createCamera(50, 0, 0);
  var _currentCamera = _camera1;

  this.start = function() {
    'use strict';

    document.body.appendChild(_renderer.domElement);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onResize);

    animate();
  }

  function createScene() {
      'use strict';

      var scene = new THREE.Scene();
      scene.add(new THREE.AxisHelper(10));

      _cannons.forEach((node)=>{scene.add(node)});
      scene.add(_fence);

      return scene;
  }

  function createOrtogonalCamera(x, y, z) {
    'use strict';

    var ratio = window.innerWidth / window.innerHeight;
    var view = 150;

    var camera = new THREE.OrthographicCamera(
      ratio*view / -2,
      ratio*view / 2,
      view / 2,
      view / -2,
      -1000,
      1000
    );

    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(_scene.position);

    return camera;
  }

  function createPerpectiveCamera(x, y, z) {
    'use strict';

    var ratio = window.innerWidth / window.innerHeight;
    var view = 50;

    var camera = new THREE.PerspectiveCamera(view, ratio, 1, 1000);

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

    if (_currCannon.userData.fire) {
      _currCannon.userData.fire = false;
      var bullet = _currCannon.fire2();
      _bullets.push(bullet);
      _scene.add(bullet);
    }

    if (_currCannon.userData.bullet) {
      _bullets.forEach((node)=>{node.move(deltaTime)});
    }

    /* To be used after random balls are placed in the fence

    _bullets.forEach((node) => {
      node.move();
    });

    */


    if (_currCannon.userData.rotateLeft && _currCannon.userData.currRotation < Math.PI/4) {
      _currCannon.rotate(Math.PI/8 * deltaTime);
      _currCannon.userData.currRotation += Math.PI/8 * deltaTime;
    }
    if (_currCannon.userData.rotateRight && _currCannon.userData.currRotation > -Math.PI/4) {
      _currCannon.rotate(-Math.PI/8 * deltaTime);
      _currCannon.userData.currRotation -= Math.PI/8 * deltaTime;
    }
  }

  function render() {
    'use strict'
    _renderer.render(_scene,_currentCamera);
  }

  function onKeyDown(e) {
    'use strict';

    switch(e.keyCode){
      case 32: // "SPACEBAR"
        if (_currCannon.userData.unlockFiring) {
          _currCannon.userData.unlockFiring = false;
          _currCannon.userData.fire = true;
          _currCannon.userData.bullet = true;
        }
        break;

      case 37: // "LEFT"
        _currCannon.userData.rotateLeft = true;
        break;

      case 39: // "RIGHT"
        _currCannon.userData.rotateRight = true;
        break;

      case 65: // "A"
        _currCannon = _cannons[0];
        break;

      case 69: // "E"
        _currCannon = _cannons[2];
        break;

      case 81: // "Q"
        _currCannon = _cannons[1];
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

      default:
        break;
    }
  }

  function onKeyUp(e) {
    'use strict';

    switch(e.keyCode){
      case 32: // "SPACEBAR"
        _currCannon.userData.unlockFiring = true;
        break;

      case 37: // "LEFT"
        _currCannon.userData.rotateLeft = false;
        break;

      case 39: // "RIGHT"
        _currCannon.userData.rotateRight = false;
        break;

      default:
        break;
    }
  }

  function onResize(e) {
    'use strict';

    //_currentCamera.aspect = window.innerWidth / window.innerHeight;
    //_currentCamera.updateProjectionMatrix();

    _renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerWidth > 0 && window.innerHeight > 0) {
      _currentCamera.aspect = _renderer.getSize().width / _renderer.getSize().height;
      _currentCamera.updateProjectionMatrix();
    }

    //_renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }
}
