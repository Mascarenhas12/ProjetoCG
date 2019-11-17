function main() {
	new Enviornment().start();
}

function Enviornment() {
	'use strict'

	var _clock = new THREE.Clock( true );
	var deltaTime;

	var _light = new THREE.DirectionalLight( 0xFFFFFF, 1.5 );
	var _pointLight = new THREE.PointLight( 0xFFFFFF, 5.0, 100 );

	var _scene = createScene();
	var _renderer = createRenderer();

	var _camera1 = createPerspectiveCamera( 60, 40, 20 );
	var _camera2 = createOrtogonalCamera( 40, 0, 0 );
	var _currCamera = _camera1;

	var _sceneObjects;

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

	this.start = function() {
		'use strict'

		document.body.appendChild( _renderer.domElement );

		window.addEventListener( 'keydown', onKeyDown );
		window.addEventListener( 'keyup', onKeyUp );
		window.addEventListener( 'resize', onResize );

		animate();
	}

	function createScene() {
		'use strict'

		var scene = new THREE.Scene();

		_sceneObjects = new THREE.Group();

		_table = new Table( [0, -1.5, 0], [50, 3, 50] );
		_dice = new Dice( [0, 4.33, 0], [5, 5, 5] );
		_ball = new Ball( [20, 4, 0], [4, 16, 16] );
		_pauseMenu = new PauseMenu( [50, 0, 0], [1, 300, 550] );

		_sceneObjects.add( _table );
		_sceneObjects.add( _dice );
		_sceneObjects.add( _ball );
		_pauseMenu.visible = false;

		scene.add( _sceneObjects );
		scene.add( _pauseMenu );

		_light.position.set( 30, 120, 150 );
		_pointLight.position.set( 10, 1, 0 );

		scene.add( _light );
		scene.add( _pointLight );

		scene.add( new THREE.AxesHelper( 50 ) );

		return scene;
	}

	function resetScene() {
		idx = 0;

		_light.visible = true;
		_pointLight.visible = true;

		_pauseMenu.paused = false;
		_pauseMenu.visible = false;

		_currCamera = _camera1;
	}

	function createRenderer() {
		'use strict'

		var renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setSize( window.innerWidth, window.innerHeight );

		return renderer;
	}

	function createPerspectiveCamera( x, y, z ) {
		'use strict'

		var ratio = window.innerWidth / window.innerHeight;
		var fov = 50;

		var camera = new THREE.PerspectiveCamera(
			fov,
			ratio,
			0.1,
			1000
		);

		camera.position.set( x, y, z );
		camera.lookAt( _scene.position );

		return camera;
	}

  function createOrtogonalCamera( x, y, z ) {
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

    camera.position.set( x, y, z );
		camera.lookAt( _pauseMenu.position );

		camera.updateProjectionMatrix();

    return camera;
  }

	function animate() {
		'use strict'

		update();
		render();

		requestAnimationFrame( animate );
	}

	function update() {
		'use strict'

		if ( _pauseMenu.paused ) {
			deltaTime = 0;
			_clock.getDelta();
		}
		else {
			deltaTime = _clock.getDelta();
		}

		_sceneObjects.children.forEach((object) => {
			object.update( deltaTime );
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
				if ( !_pauseMenu.paused ) {
					if ( _ball.unlockChangeAcc ) {
						_ball.unlockChangeAcc = false;

						if ( _ball.acceleration == 0 ) {
							_ball.acceleration = 1;
						}
						else {
							_ball.acceleration *= -1;
						}
					}
				}
				break;

			case 68: // "D - Luz Direcional"
				if ( !_pauseMenu.paused ) {
					if ( unlockLightWorld ) {
						unlockLightWorld = false;
						_light.visible = !_light.visible;
					}
				}
				break;

			case 76: // "L - Ligar/Desligar Iluminação"
				if ( !_pauseMenu.paused ) {
					if ( unlockApplyMaterial ) {
						unlockApplyMaterial = false;

						idx = ( (idx + 1) % 2 );
						_sceneObjects.children.forEach((object) => {
							object.changeMaterial( idx );
						});
					}
				}
				break;

      case 80: // "P - Luz Pontual"
				if ( !_pauseMenu.paused ) {
					if ( unlockLightPontual ) {
						unlockLightPontual = false;
						_pointLight.visible = !_pointLight.visible;
					}
				}
				break;

			case 82: // "R - Reset da cena"
				if ( _pauseMenu.paused ) {
					if ( unlockReset ) {
						unlockReset = false;

						_sceneObjects.children.forEach((object) => {
							object.reset();
						});

						resetScene();
					}
				}
				break;

			case 83: // "S - Pausar/Retomar a cena"
				if ( unlockPauseMenu ) {
					unlockPauseMenu = false;

					if ( _currCamera == _camera1 ) {
						_currCamera = _camera2;
					} else {
						_currCamera = _camera1;
					}

					_pauseMenu.visible = !_pauseMenu.visible;
					_pauseMenu.paused = !_pauseMenu.paused;
				}
				onResize();
				break;

			case 87: // "W - Wireframe"
				if ( !_pauseMenu.paused ) {
					if ( unlockVisibility ) {
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

		switch ( e.keyCode ) {
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

	function onResize( e ) {
		'use strict'

		_renderer.setSize( window.innerWidth, window.innerHeight );

		if ( _currCamera == _camera1 ) {
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
