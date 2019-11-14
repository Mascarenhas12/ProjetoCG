function main() {
	new Enviornment().start();
}

function Enviornment() {
	'use strict'

	var _clock = new THREE.Clock(true);
	var _auxVector = new THREE.Vector3();

	var _scene = createScene();
	var _renderer = createRenderer();

	var _camera1 = createPerspectiveCamera(50, 50, 50);
	var _camera2 = createOrtogonalCamera(55, 40, 100);
	var _currCamera = _camera1;

	var _light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	_light.position.set(120, 150, 150);
	_scene.add(_light);

	var _pointLight = new THREE.PointLight( 0xFFFFFF, 1.0, 100 );
	_pointLight.position.set(50, 50, 50);
	_scene.add(_pointLight);

	var _table;
	var _dice;
	var _ball;
	var _pauseMenu;

	var unlockLightWorld = true;
	var unlockLightPontual = true;
	var unlockApplyMaterial = true;
	var unlockPauseMenu = true;
	var unlockVisibility = true;

	var _sceneObjects;

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

		_sceneObjects = new THREE.Group();

		_table = new Table([0, 0, 0], [50, 10, 50], '../images/board.png','../images/wood.jpg');
		//_dice = new Dice([0, 50, 0], [10, 10, 10], '../images/dice.jpg');
		//_ball = new Ball([30, 50, 0], [10, 10, 10], '../images/ball.jpg');
		//_pauseMenu = new PauseMenu([30, 50, 0], [10, 10, 10], '../images/ball.jpg');

		_sceneObjects.add(_table);
		//_sceneObjects.add(_dice);
		//_sceneObjects.add(_ball);

		scene.add(_sceneObjects);

		scene.add(new THREE.AxisHelper(50));

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

		camera.updateProjectionMatrix();

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

		_sceneObjects.children.forEach((object) => {
			if (object.canMove) {
				object.move(deltaTime);
			}
		});

		var deltaTime = _clock.getDelta();
	}

	function render() {
		'use strict'
		_renderer.render(_scene, _currCamera);
	}

	function onKeyDown(e) {
		'use strict'

		switch (e.keyCode) {
			case 66: // "B - Parar Bola"
				if (_ball.unlockMotion) {
					_ball.unlockMotion = false;
					_ball.canMove = !_ball.canMove;
				}
				break;

			case 68: // "D - Luz Direcional"
				if (unlockLightWorld) {
					unlockLightWorld = false;
					_light.visible = !_light.visible;
				}
				break;

			case 76: // "L - Ligar/Desligar Iluminação"
				if (unlockApplyMaterial) {
					unlockApplyMaterial = false;

					_sceneObjects.children.forEach((object) => {
						object.changeMaterial();
					});
				}
				break;

      case 80: // "P - Luz Pontual"
				if (unlockLightPontual) {
					unlockLightPontual = false;
					_pointLight.visible = !_pointLight.visible;
				}
				break;

			case 82: // "R - Reset da cena"
				if (_pauseMenu.visible) {
					_currCamera = _camera1;
					_pauseMenu.visible = !_pauseMenu.visible;

					// TODO Reset da cena
				}
				break;

			case 83: // "S - Pausar/Retomar a cena"
				if (unlockPauseMenu) {
					unlockPauseMenu = false;

					_sceneObjects.children.forEach((object) => {
						object.canMove = false;
					});

					if (_currCamera == _camera1) {
						_currCamera = _camera2;
					} else {
						_currCamera = _camera1;
					}

					_pauseMenu.visible = !_pauseMenu.visible;
				}
				onResize();
				break;

			case 87: // "W - Wireframe"
				if (unlockVisibility) {
					unlockVisibility = false;

					_sceneObjects.children.forEach((object) => {
						object.changeVisibility();
					});
				}
				break;

			default:
				break;
		}
	}

	function onKeyUp(e) {
		'use strict'

		switch (e.keyCode) {
			case 66: // "B - Parar Bola"
				_ball.unlockMotion = true;
				break;

			case 68: // "D - Luz Direcional"
				unlockLightWorld = true;
				break;

			case 76: // "L - Ligar/Desligar Iluminação"
				unlockApplyMaterial = true;
				break;

      case 80: // "P - Luz Pontual"
				unlockLightPontual = true;
				break;

			case 82: // "R - Reset da cena"
				break;

			case 83: // "S - Pausar/Retomar a cena"
				unlockPauseMenu = true;
				break;

			case 87: // "W - Wireframe"
				unlockVisibility = true;
				break;

			default:
				break;
		}
	}

	function onResize(e) {
		'use strict'

		_renderer.setSize(window.innerWidth, window.innerHeight);

		if (_currCamera == _camera1) {
			_currCamera.aspect = _renderer.getSize().width / _renderer.getSize().height;
		}
		else {
			var ratio = window.innerWidth / window.innerHeight;
			var view = 250;

			_currCamera.left = ratio*view / -2
			_currCamera.right = ratio*view / 2
			_currCamera.top = view / 2
			_currCamera.bottom = view / -2
		}

		_currCamera.updateProjectionMatrix();
	}
}
