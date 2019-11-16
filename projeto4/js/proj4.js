function main() {
	new Enviornment().start();
}

function Enviornment() {
	'use strict'

	var _clock = new THREE.Clock(true);
	var deltaTime;

	var _scene = createScene();
	var _renderer = createRenderer();

	var _camera1 = createPerspectiveCamera(60, 60, 0);
	var _camera2 = createOrtogonalCamera(40, 0, 0);
	var _currCamera = _camera1;

	var _light = new THREE.DirectionalLight( 0xFFFFFF, 1.5 );
	_light.position.set(30, 120, 150);
	_scene.add(_light);

	var _pointLight = new THREE.PointLight( 0xFFFFFF, 5.0, 100 );
	_pointLight.position.set(0, 10, 0);
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
	var unlockReset = true;
	var idx = 0;
	var pause = false;
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

		_table = new Table([0, -1.5, 0], [50, 3, 50], '../images/board.png','../images/wood.jpg');
		_dice = new Dice([0, 4.2, 0], [5, 5, 5]);
		_ball = new Ball([20, 4, 0], [4, 16, 16], '../images/ball.png');
		_pauseMenu = new PauseMenu([50, 0, 0], [1, 300, 550], '../images/pause5.png');

		_sceneObjects.add(_table);
		_sceneObjects.add(_dice);
		_sceneObjects.add(_ball);
		_pauseMenu.visible = false;

		scene.add(_sceneObjects);
		scene.add(_pauseMenu);

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
		camera.lookAt(_pauseMenu.position);

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

		if (pause) {
			deltaTime = 0;
			_clock.getDelta();
		}
		else {
			deltaTime = _clock.getDelta();
		}

		_sceneObjects.children.forEach((object) => {
			object.move(deltaTime);
		});
	}

	function render() {
		'use strict'
		_renderer.render(_scene, _currCamera);
	}

	function onKeyDown(e) {
		'use strict'

		switch (e.keyCode) {
			case 66: // "B - Parar Bola"
				if(!pause){
					if (_ball.unlockChangeAcc) {
						_ball.unlockChangeAcc = false;

						if (_ball.acceleration == 0) {
							_ball.acceleration = 1;
						}
						else {
							_ball.acceleration *= -1;
						}
					}
				}
				break;

			case 68: // "D - Luz Direcional"
				if (unlockLightWorld) {
					if(!pause){
						unlockLightWorld = false;
						_light.visible = !_light.visible;
					}
				}
				break;

			case 76: // "L - Ligar/Desligar Iluminação"
				if (unlockApplyMaterial) {
					if(!pause){
						unlockApplyMaterial = false;
					 	idx = ((idx + 1) % 2);
						_sceneObjects.children.forEach((object) => {
							object.changeMaterial(idx);
						});
					}
				}
				break;

      case 80: // "P - Luz Pontual"
				if (unlockLightPontual) {
					if(!pause){
						unlockLightPontual = false;
						_pointLight.visible = !_pointLight.visible;
					}
				}
				break;

			case 82: // "R - Reset da cena"
				if(unlockReset){
					unlockReset = false;
						if (pause){
							_ball.reset([20,4,0]);
							_table.reset();
							_dice.reset();

							_pointLight.visible = true;
							_light.visible = true;
							idx = 0;
							_pauseMenu.visible = !_pauseMenu.visible;
							pause = !pause;
							_currCamera = _camera1;
						}
					}
					break;

			case 83: // "S - Pausar/Retomar a cena"
				if (unlockPauseMenu) {
					unlockPauseMenu = false;

					if (_currCamera == _camera1) {
						_currCamera = _camera2;
					} else {
						_currCamera = _camera1;
					}
					_pauseMenu.visible = !_pauseMenu.visible;
					pause = !pause;
				}
				onResize();
				break;

			case 87: // "W - Wireframe"
				if (unlockVisibility) {
					if(!pause){
						unlockVisibility = false;

						_sceneObjects.children.forEach((object) => {
							object.changeVisibility();
						});
					}
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
				_ball.unlockChangeAcc = true;
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
				unlockReset = true;
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
