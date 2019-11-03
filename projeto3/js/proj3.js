function main() {
	new Enviornment().start();
}

function Enviornment() {
	'use strict'

	var _clock = new THREE.Clock(true);
	var _auxVector = new THREE.Vector3();

	var _scene = createScene();
	var _renderer = createRenderer();

	var _camera1 = createPerspectiveCamera(200, 200, 200);
	var _camera2 = createOrtogonalCamera(0, 30, 0);
	var _currCamera = _camera1;

	var _light = new THREE.DirectionalLight( 0xffffff, 3.0 );
	_light.position.set( 0, 300, 0);
	_scene.add(_light);

	var _fence;
	var _icosahedron;

	this.start = function() {
		'use strict'

		document.body.appendChild(_renderer.domElement);

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		window.addEventListener('resize', onResize);

		animate();
	}

	function createScene() {
		'use strict'

		var scene = new THREE.Scene();

		_fence = new Fence([0,0,-50], [220,80,100,4], 0x7DA7D9);
		_icosahedron = new Icosahedron([0,0,0]);

		scene.add(_fence);
		//scene.add(_icosahedron);
		scene.add(new THREE.AxisHelper(10));

		return scene;
	}

	function createRenderer() {
		'use strict'

		var renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);

		return renderer;
	}

	function createPerspectiveCamera(x, y, z) {
		'use strict'

		var ratio = window.innerWidth / window.innerHeight;
		var fov = 50;

		var camera = new THREE.PerspectiveCamera(
			fov,
			ratio,
			0.1,
			1000
		);

		camera.position.set(x, y, z);
		camera.lookAt(_scene.position);

		return camera;
	}

  function createOrtogonalCamera(x, y, z) {
    'use strict'

    var ratio = window.innerWidth / window.innerHeight;
    var view = 250;

    var camera = new THREE.OrthographicCamera(
      ratio*view / -2,
      ratio*view / 2,
      view / 2,
      view / -2,
      0.1,
      1000
    );

    camera.position.set(x, y, z);
    camera.lookAt(_scene.position);

    return camera;
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
	}

	function render() {
		'use strict'
		_renderer.render(_scene, _currCamera);
	}

	function onKeyDown(e) {
		'use strict'

		switch (e.keyCode) {
			case 49: // "1"
				break;

			case 50: // "2"
				break;

			case 51: // "3"
				break;

      case 52: // "4"
				break;

      case 53: // "5"
				_currCamera = _camera1;
				onResize();
				break;

      case 54: // "6"
				_currCamera = _camera2;
				onResize();
				break;

			case 69: // "E"
				break;

			case 81: // "Q"
				break;

			case 87: // "W"
				break;

			default:
				break;
		}
	}

	function onKeyUp(e) {
		'use strict'

		switch (e.keyCode) {
      case 49: // "1"
				break;

			case 50: // "2"
				break;

			case 51: // "3"
				break;

      case 52: // "4"
				break;

      case 69: // "E"
				break;

			case 81: // "Q"
				break;

			case 87: // "W"
				break;

			default:
				break;
		}
	}

	function onResize(e) {
		'use strict'

		_renderer.setSize(window.innerWidth, window.innerHeight);

		if (_currCamera == _camera1) {
			var ratio = window.innerWidth / window.innerHeight;
			var view = 250;

			_currCamera.left = ratio*view / -2
			_currCamera.right = ratio*view / 2
			_currCamera.top = view / 2
			_currCamera.bottom = view / -2
		}
		else {
			_currCamera.aspect = _renderer.getSize().width / _renderer.getSize().height;
		}

		_currCamera.updateProjectionMatrix();
	}
}