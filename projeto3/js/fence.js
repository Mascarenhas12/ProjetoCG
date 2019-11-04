class Fence extends THREE.Object3D {
	'use strict'

	// pos - Fence position in the world
	// dim - [fence.width, fence.height, fence.breadth, wall.tickness]
	// col - Fence color
	constructor(pos, dim, col) {
		super();

		var floorMat = new THREE.MeshPhongMaterial({color: col - 0x000F00});
		var backWallMat = new THREE.MeshPhongMaterial({color: col});

    this.floor = Fence.createBox([dim[0], dim[3], dim[2]], floorMat);
		this.backWall = Fence.createBox([dim[0], dim[1], dim[3]], backWallMat);

		this.floor.materials =
		[
			new THREE.MeshBasicMaterial({color: col - 0x000F00}),
			new THREE.MeshLambertMaterial({color: col - 0x000F00}),
			floorMat
		];

		this.backWall.materials =
		[
			new THREE.MeshBasicMaterial({color: col}),
			new THREE.MeshLambertMaterial({color: col}),
			backWallMat
		];

		// Relative to Fence.position
    this.floor.position.set(0, 0, 0);
		this.backWall.position.set(0,  0 + dim[2]/2 - dim[3]*2,  0 - dim[2]/2 + dim[3]/2);

    this.add(this.floor);
		this.add(this.backWall);

		this.position.set(pos[0], pos[1], pos[2]);

		this.updateMatrixWorld();

		var auxVector1 = new THREE.Vector3();

		this.backWallPos = auxVector1.setFromMatrixPosition(this.backWall.matrixWorld);
	}

	static createBox(dim, mat) {
		return new THREE.Mesh(
			new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
			mat
		);
	}

	changeMaterial(matIdx) {
		this.backWall.material = this.backWall.materials[matIdx];
		this.floor.material = this.floor.materials[matIdx];
	}
}
