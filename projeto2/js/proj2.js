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
  var _bulletCounter = 0;

  var _scene = createScene();
  var _renderer = createRenderer();

  var _camera1 = createOrtogonalCamera(0, 50, 0);
  var _camera2 = createPerspectiveCamera(50, 50, 50);
  var _camera3 = createPerspectiveCamera(-50, 50, 50);
  var _currentCamera = _camera1;
  var _visible = true;

  this.start = function() {
    'use strict';

    document.body.appendChild(_renderer.domElement);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onResize);

    setUpRndBullets();

    animate();
  }

  function createScene() {
      'use strict';

      var scene = new THREE.Scene();
      scene.add(new THREE.AxisHelper(10));

      _cannons.forEach((node) => {scene.add(node)});
      scene.add(_fence);

      _currCannon.changeColor(0x00ffff);

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

  function createPerspectiveCamera(x, y, z) {
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

  function setUpRndBullets(){
    var numRandBullets = THREE.Math.randFloat(2,4);

    for(let i = 0; i < numRandBullets; ++i) {
      var b = new Bullet([0, 0, 0], [0, 0], 0);
      _scene.add(b);
      b.translateZ(THREE.Math.randFloat(-65, -15));
      b.translateX(THREE.Math.randFloat(-43,43));
      _bullets.push(b);
    }
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

      var bullet = _currCannon.fire();
      if(!_visible){
        bullet.changeVisibilityAxis();
      }
      _bullets.push(bullet);
      _scene.add(bullet);

      _camera3.position.set(bullet.position.x, bullet.position.y + 30, bullet.position.z + 30);
      _camera3.lookAt(bullet.position);
    }

    if (_bullets.length) {
      if (_currentCamera == _camera3) {
        _currentCamera.lookAt(_bullets[_bullets.length-1].position);
      }

      _bullets.forEach((node) => {
        //node.detectEnd(_scene, _bullets);
        node.tryMove(deltaTime, _camera3);

        node.detectColisionBall(_bullets);

        if(node.nearBackwall(_fence) || node.nearLeftwall(_fence) || node.nearRightwall(_fence)){
          node.detectColisionWall(_fence);

        }

      });
    }

    if (_currCannon.userData.rotateLeft && _currCannon.userData.currRotation < Math.PI/4) {
      _currCannon.rotate(Math.PI/2 * deltaTime);
      _currCannon.userData.currRotation += Math.PI/2 * deltaTime;
    }
    if (_currCannon.userData.rotateRight && _currCannon.userData.currRotation > -Math.PI/4) {
      _currCannon.rotate(-Math.PI/2 * deltaTime);
      _currCannon.userData.currRotation -= Math.PI/2 * deltaTime;
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
        }
        break;

      case 37: // "LEFT"
        _currCannon.userData.rotateLeft = true;
        break;

      case 39: // "RIGHT"
        _currCannon.userData.rotateRight = true;
        break;

      case  87: // "W"
        _currCannon.changeColor(0x0000ff);
        _currCannon = _cannons[0];
        _currCannon.changeColor(0x00ffff);
        break;

      case 69: // "E"
        _currCannon.changeColor(0x0000ff);
        _currCannon = _cannons[1];
        _currCannon.changeColor(0x00ffff);
        break;

      case 81: // "Q"
        _currCannon.changeColor(0x0000ff);
        _currCannon = _cannons[2];
        _currCannon.changeColor(0x00ffff);
        break;

      case 82: // "R"
        _bullets.forEach((child)=>{child.changeVisibilityAxis();});
        _cannons.forEach((child)=>{child.changeVisibilityAxis();});
        _visible = !_visible;

        break;

      case 49: // "1"
        _currentCamera = _camera1;
        onResize();
        break;

      case 50: // "2"
        _currentCamera = _camera2;
        onResize();
        break;

      case 51: // "3"
        _currentCamera = _camera3;
        onResize();
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

    _renderer.setSize(window.innerWidth, window.innerHeight);

    if (_currentCamera == _camera1) {
      var ratio = window.innerWidth / window.innerHeight;
      var view = 150;

      _currentCamera.left = ratio*view / -2
      _currentCamera.right = ratio*view / 2
      _currentCamera.top = view / 2
      _currentCamera.bottom = view / -2
    }
    else {
      if (window.innerWidth > 0 && window.innerHeight > 0) {
        _currentCamera.aspect = _renderer.getSize().width / _renderer.getSize().height;
      }
    }

    _currentCamera.updateProjectionMatrix();
    render();
  }
}
