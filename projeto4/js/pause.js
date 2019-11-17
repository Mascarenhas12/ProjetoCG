class PauseMenu extends THREE.Object3D {
	'use strict';

constructor( pos, dim ) {
	super();

	this.paused = false;

	var texture = PauseMenu.createTexture( '../images/pause5.png' );

	this.box = PauseMenu.createBox(dim, texture);
	this.add(this.box);

	this.position.set( pos[0], pos[1], pos[2] );
}

	static createBox( dim, texture ) {
		return new THREE.Mesh(
			new THREE.CubeGeometry( dim[0], dim[1], dim[2] ),
			new THREE.MeshBasicMaterial({ map: texture })
		);
	}

	static createTexture( img ) {
		const texture_loader = new THREE.TextureLoader();
		const texture = texture_loader.load( img );

		texture.encoding = THREE.sRGBEncoding;
		texture.anisotropy = 16;
		return texture;
	}
}
