function main() {
  new Environment().start();
}

function Environment() {
  'use strict';

  var _clock = new THREE.Clock(true);

  var cannon = new Cannon([0,0,0]);
  //var cannons = [new Cannon([,,],[,,,]),new Cannon([,,],[,,,]),new Cannon([,,],[,,,])];

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

    animate();
  }

  function createScene() {
      'use strict';

      var scene = new THREE.Scene();
      scene.add(new THREE.AxisHelper(10));

      scene.add(cannon);

      return scene;
  }

  function createOrtogonalCamera(x, y, z) {
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

  function createPerpectiveCamera(x, y, z) {
    'use strict';

    var ratio = window.innerWidth / window.innerHeight;
    var view = 50;

    var camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);

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

  function render() {
    'use strict'
    _renderer.render(_scene,_currentCamera);
  }

  function onKeyDown(e) {
    'use strict';

    switch(e.keyCode){
      case 37: // "LEFT"
        _
        break;

      case 38: // "FOWARD"

        break;

      case 39: // "RIGHT"

        break;

      case 40: // "BACKWARD"

        break;

      case 65: // "A"

        break;

      case 83: // "S"

        break;

      case 81: // "Q"

        break;

      case 87: // "W"

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

        break;

      default:
        break;
    }
  }

  function onKeyUp(e) {
    'use strict';

    switch(e.keyCode){
      case 37: // "LEFT"

        break;

      case 38: // "FOWARD"

        break;

      case 39: // "RIGHT"

        break;

      case 40: // "BACKWARD"

        break;

      case 52: // "4"

        break;

      case 65: // "A"

        break;

      case 83: // "S"

        break;

      case 81: // "Q"

        break;

      case 87: // "W"

        break;

      default:
        break;
    }
  }
}
