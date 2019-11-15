class Ball extends THREE.Object3D {
	'use strict';

	constructor(pos, dim, img) {
		super();

		this.unlockChangeAcc = true;

		this.posScalar = pos[0];
		this.angle = 0;

		this.minVel = 0;
		this.maxVel = 4;
		this.velScalar = this.minVel;
		this.velocity = [this.minVel, this.minVel];

		this.acceleration = 0;

		var texture = Ball.createTexture( img );

		this.materials = [
			new THREE.MeshPhongMaterial({ map: texture }),
			new THREE.MeshBasicMaterial({ map: texture })
		];

		this.sphere = Ball.createSphere( dim, this.materials[0] );
		this.sphere.position.set( 0, 0, 0 );

		this.ball = new THREE.Group();
		this.ball.add(this.sphere);
		this.ball.add(new THREE.AxisHelper( 20 ));

		this.add(this.ball);

		this.position.set( pos[0], pos[1], pos[2] );

		this.updateMatrixWorld();
  }

	static createSphere( dim, mat ) {
		return new THREE.Mesh(
			new THREE.SphereGeometry( dim[0], dim[1], dim[2] ),
			mat
		);
	}

	static createTexture( img ) {
		const texture_loader = new THREE.TextureLoader();
		const texture = texture_loader.load( img );

		texture.encoding = THREE.sRGBEncoding;
		texture.anisotropy = 16; // valores possíveis sao 2^n
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		return texture;
	}

	move( deltaTime ) {
		this.accelerate( deltaTime );
		this.updateVelocity( this.velScalar * deltaTime );

		this.position.x = this.posScalar * this.velocity[0];
		this.position.z = this.posScalar * this.velocity[1];

		this.rotateY( -2 * this.velScalar * deltaTime );
		this.ball.rotateX( 4 * this.velScalar * deltaTime );
	}

	updateVelocity( velScalar ) {
		this.velocity =
		[
			Math.cos( this.angle += velScalar ),
			Math.sin( this.angle += velScalar )
		];
	}

	accelerate( deltaTime ) {
		if (this.velScalar < this.minVel) {
			this.velScalar = this.minVel;
			this.acceleration = 0;
		}
		else if (this.velScalar > this.maxVel) {
			this.velScalar = this.maxVel;
		}
		else {
			this.velScalar += this.acceleration * deltaTime / 8;
		}
	}

	changeMaterial(matIdx) {
		this.sphere.material = this.mat[matIdx];
	}

	changeVisibility() {
		this.sphere.material.wireframe = !this.sphere.material.wireframe;
	}
}
