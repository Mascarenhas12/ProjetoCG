class Dice extends THREE.Object3D {
	'use strict';

	constructor( pos, dim ) {
		super();

		this.totalRotation = 0;

		var dice =
		[
			Dice.createTexture( '../images/dice1.png' ),
			Dice.createTexture( '../images/dice2.png' ),
			Dice.createTexture( '../images/dice3.png' ),
			Dice.createTexture( '../images/dice4.png' ),
			Dice.createTexture( '../images/dice5.png' ),
			Dice.createTexture( '../images/dice6.png' )
		];

		var bump =
		[
			Dice.createTexture( '../images/bump1.png' ),
			Dice.createTexture( '../images/bump2.png' ),
			Dice.createTexture( '../images/bump3.png' ),
			Dice.createTexture( '../images/bump4.png' ),
			Dice.createTexture( '../images/bump5.png' ),
			Dice.createTexture( '../images/bump6.png' )
		];

		var phong =
		[
			new THREE.MeshPhongMaterial({ map:dice[0], bumpMap:bump[0] }),
			new THREE.MeshPhongMaterial({ map:dice[1], bumpMap:bump[1] }),
			new THREE.MeshPhongMaterial({ map:dice[2], bumpMap:bump[2] }),
			new THREE.MeshPhongMaterial({ map:dice[3], bumpMap:bump[3] }),
			new THREE.MeshPhongMaterial({ map:dice[4], bumpMap:bump[4] }),
			new THREE.MeshPhongMaterial({ map:dice[5], bumpMap:bump[5] })
		];

		var basic =
		[
			new THREE.MeshBasicMaterial({ map:dice[0] }),
			new THREE.MeshBasicMaterial({ map:dice[1] }),
			new THREE.MeshBasicMaterial({ map:dice[2] }),
			new THREE.MeshBasicMaterial({ map:dice[3] }),
			new THREE.MeshBasicMaterial({ map:dice[4] }),
			new THREE.MeshBasicMaterial({ map:dice[5] })
		];

		this.mat = [phong, basic];

		this.box = Dice.createBox( dim, phong );

		this.box.rotation.z = Math.PI/4;
		this.box.rotation.x = Math.atan( Math.sqrt( 1 / 2 ) );

		this.box.add( new THREE.AxesHelper( 10 ) );
		this.add( this.box );

		this.position.set( pos[0], pos[1], pos[2] );
  }

  static createBox( dim, mat ) {
    return new THREE.Mesh(
      new THREE.CubeGeometry( dim[0], dim[1], dim[2], 3, 3, 3 ),
      mat
    );
  }

  static createTexture( img ) {
    const texture_loader = new THREE.TextureLoader();
    const texture = texture_loader.load( img );

    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  update( deltaTime ) {
		this.totalRotation += Math.PI/2 * deltaTime;
		this.rotateY( Math.PI/2 * deltaTime );
	}

	changeMaterial( matIdx ) {
		this.box.material = this.mat[matIdx];
	}

	changeVisibility() {
		this.mat[0].forEach((node)=>{
			node.wireframe = !node.wireframe;
		});
		this.mat[1].forEach((node)=>{
			node.wireframe = !node.wireframe;
		});
	}

  reset() {
  	this.resetRotation();
  	this.resetMaterials();
  }

  resetRotation() {
  	this.rotateY( -this.totalRotation );
  	this.totalRotation = 0;
  }

  resetMaterials() {
		this.mat[0].forEach((node)=>{
			node.wireframe = false;
		});
		this.mat[1].forEach((node)=>{
			node.wireframe = false;
		});
		this.box.material = this.mat[0];
  }
}
