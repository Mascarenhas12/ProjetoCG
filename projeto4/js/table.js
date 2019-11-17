class Table extends THREE.Object3D {
	'use strict';

	constructor( pos, dim ) {
		super();

		var texture1 = Table.createTexture( '../images/board.png' );
		var texture2 = Table.createTexture( '../images/wood.png' );

		this.materials = [
			new THREE.MeshPhongMaterial({ map:texture1, bumpMap:texture2 }),
			new THREE.MeshBasicMaterial({ map:texture1 })
		];
		this.materials[0].bumpScale = 0.1;

		this.box = Table.createBox( dim, this.materials[0] );
		this.add( this.box );

		this.position.set( pos[0], pos[1], pos[2] );
	}

	static createBox( dim, mat ) {
		return new THREE.Mesh(
			new THREE.CubeGeometry( dim[0], dim[1], dim[2], 8, 1, 8 ),
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

	update( deltaTime ) {}

	changeMaterial( matIdx ) {
		this.box.material = this.materials[matIdx];
	}

	changeVisibility() {
		this.materials[0].wireframe = !this.materials[0].wireframe;
		this.materials[1].wireframe = !this.materials[1].wireframe;
	}

	reset() {
		this.materials[0].wireframe = false;
		this.materials[1].wireframe = false;
		this.box.material = this.materials[0];
	}
}
