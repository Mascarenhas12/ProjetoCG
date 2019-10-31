class Fence extends THREE.Object3D {
	'use strict'

	// pos - Fence position in the world
	// dim - [fence.width, fence.height, fence.breadth, wall.tickness]
	// col - Fence color
	constructor(pos, dim, col) {
		super();

    this.floor = Fence.createBox([dim[0], dim[3], dim[2]], col);
		this.backWall = Fence.createBox([dim[0], dim[1], dim[3]], col);

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

	static createBox(dim, col) {
		return new THREE.Mesh(
			new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
			new THREE.MeshBasicMaterial({ color: col,  wireframe:true })
		);
	}
}
