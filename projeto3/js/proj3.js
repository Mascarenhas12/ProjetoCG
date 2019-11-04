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
	var _camera2 = createOrtogonalCamera(55, 40, 100);
	var _currCamera = _camera1;

	var _light = new THREE.DirectionalLight( 0xffffff, 1.0 );
	_light.position.set(150, 150, 150);
	_scene.add(_light);

	var _sceneObjects;
	var _fence;
	var _painting;
	var _icosahedron;
	var _spotlights;
	var _lamps;

	var unlockApplyMaterial = true;
	var unlockMaterialChange = true;
	var unlockLightWorld = true;

	var _idxMat = 2;
	var _curr = 2;

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

		_fence = new Fence([0,0,-50], [220,80,100,4], 0x7DA7D9);
		_painting = new Painting([55, 40, -95], [78, 46, 2, 1], 0x235383);
		_icosahedron = new Icosahedron([-50,0,-50]);
		_lamps =
		[
			new Lamp([-70, 150, 60]),
			new Lamp([-150, 170, -50]),
			new Lamp([150, 170, -50]),
			new Lamp([70, 150, 60])
		];

		_spotlights =
		[
			new Spotlight([-70, 150, 60], [-50, 0, -100]),
			new Spotlight([-150, 170, -50], [0, 0, -40]),
			new Spotlight([150, 170, -50], [0, 0, -40]),
			new Spotlight([70, 150, 60], [50, 0, -100])
		];



		_sceneObjects.add(_fence);
		_sceneObjects.add(_painting);
		_sceneObjects.add(_icosahedron);
		for( var i = 0; i < 4 ; i++ ){
			scene.add(_spotlights[i]);
			_sceneObjects.add(_lamps[i]);
		}
		scene.add(_sceneObjects);
		scene.add(new THREE.AxisHelper(1000));


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
		camera.lookAt(_painting.paintingPos);
		camera.zoom = 4;

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
	}

	function render() {
		'use strict'
		_renderer.render(_scene, _currCamera);
	}

	function onKeyDown(e) {
		'use strict'

		switch (e.keyCode) {
			case 49: // "1"
				if(_spotlights[0].unlockSpotlight){
					_spotlights[0].unlockSpotlight = false;
					_spotlights[0].light.visible = !_spotlights[0].light.visible;
				}
				break;

			case 50: // "2"
				if(_spotlights[1].unlockSpotlight){
					_spotlights[1].unlockSpotlight = false;
					_spotlights[1].light.visible = !_spotlights[1].light.visible;
				}
				break;

			case 51: // "3"
				if(_spotlights[2].unlockSpotlight){
					_spotlights[2].unlockSpotlight = false;
					_spotlights[2].light.visible = !_spotlights[2].light.visible;
				}
				break;

      case 52: // "4"
				if(_spotlights[3].unlockSpotlight){
					_spotlights[3].unlockSpotlight = false;
					_spotlights[3].light.visible = !_spotlights[3].light.visible;
				}
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
				if (unlockMaterialChange) {
					unlockMaterialChange = false;
					_idxMat = (_idxMat % 2) + 1;

					if (_curr != 0) {
						_curr = _idxMat
						_sceneObjects.children.forEach((object) => {
							object.changeMaterial(_curr);
						});
					}
				}
				break;

			case 81: // "Q"
				if (unlockLightWorld) {
					unlockLightWorld = false;

					_light.visible = !_light.visible;
				}
				break;

			case 87: // "W"
				if (unlockApplyMaterial) {
					unlockApplyMaterial = false;

					if(_curr != 0){
						_curr = 0;
					}
					else{
						_curr = _idxMat;
					}

					_sceneObjects.children.forEach((object) => {
						object.changeMaterial(_curr);
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
      case 49: // "1"
				_spotlights[0].unlockSpotlight = true;
				break;

			case 50: // "2"
				_spotlights[1].unlockSpotlight = true;
				break;

			case 51: // "3"
				_spotlights[2].unlockSpotlight = true;
				break;

      case 52: // "4"
				_spotlights[3].unlockSpotlight = true;
				break;

      case 69: // "E"
				unlockMaterialChange = true;
				break;

			case 81: // "Q"
				unlockLightWorld = true;
				break;

			case 87: // "W"
				unlockApplyMaterial = true;
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
