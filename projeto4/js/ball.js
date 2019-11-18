class Ball extends THREE.Object3D {
	'use strict';

	constructor( pos, dim ) {
		super();

		this.unlockChangeAcc = true;

		this.initPos = pos;
		this.posScalar = pos[0];

		this.angle = 0;
		this.horzRotation = 0;
		this.vertRotation = 0;

		this.minVel = 0;
		this.maxVel = 4;
		this.velScalar = this.minVel;
		this.velocity = [this.minVel, this.minVel];

		this.acceleration = 0;

		var texture = Ball.createTexture( '../images/ball.png' );

		this.materials = [
			new THREE.MeshPhongMaterial({ map:texture, specular:0xFFFFFF, shininess:100 }),
			new THREE.MeshBasicMaterial({ map:texture })
		];

		this.sphere = Ball.createSphere( dim, this.materials[0] );
		this.sphere.position.set( 0, 0, 0 );

		this.ball = new THREE.Group();
		this.ball.add( this.sphere );
		this.ball.add(new THREE.AxesHelper( 10 ));
		this.add( this.ball );

		this.position.set( pos[0], pos[1], pos[2] );
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
		texture.anisotropy = 16;
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		return texture;
	}

	update( deltaTime ) {
		this.accelerate( deltaTime );

		var delta = this.velScalar * deltaTime;

		this.move( delta );
		this.rotate( delta );
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

	move( delta ) {
		this.updateVelocity( delta );

		this.position.x = this.posScalar * this.velocity[0];
		this.position.z = this.posScalar * this.velocity[1];
	}

	updateVelocity( delta ) {
		this.velocity =
		[
			Math.cos( this.angle += delta ),
			Math.sin( this.angle += delta )
		];
	}

	rotate( delta ) {
		this.horzRotation += -2 * delta;
		this.vertRotation += 4 * delta;

		this.rotateY( -2 * delta );
		this.ball.rotateX( 4 * delta );
	}

	changeMaterial( matIdx ) {
		this.sphere.material = this.materials[matIdx];
	}

	changeVisibility() {
		this.materials[0].wireframe = !this.materials[0].wireframe;
    this.materials[1].wireframe = !this.materials[1].wireframe;
	}

	reset() {
		this.position.set( this.initPos[0], this.initPos[1], this.initPos[2] );
		this.velocity = [this.minVel, this.minVel];
		this.velScalar = 0;
		this.acceleration = 0;

		this.resetRotation();
		this.resetMaterials();
	}

	resetRotation() {
		this.rotateY( -this.horzRotation );
		this.ball.rotateX( -this.vertRotation );

		this.angle = 0;
		this.horzRotation = 0;
		this.vertRotation = 0;
	}

	resetMaterials() {
		this.materials[0].wireframe = false;
		this.materials[1].wireframe = false;
		this.sphere.material = this.materials[0];
	}
}
