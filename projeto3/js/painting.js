class Painting extends THREE.Object3D {
  'use strict';

  // dim = [painting.length (78), painting.height (46), frame.length (2), frame.tickness (1)]
  constructor(pos, dim, col) {
    super();

    this.createFrame(dim, col);
    this.createBackground(dim, 0x959595);
    this.createSquares(dim, 0x000000);
    this.createCircles(dim, 0xFFFFFF);

    this.position.set(pos[0], pos[1], pos[2]);

    this.updateMatrixWorld();

    var auxVector1 = new THREE.Vector3();
    this.paintingPos = auxVector1.setFromMatrixPosition(this.matrixWorld);
  }

  createFrame(dim, col) {

    this.frame = new THREE.Group();

    this.frame.materials =
    [
      new THREE.MeshBasicMaterial({color: col}),
      new THREE.MeshLambertMaterial({color: col}),
      new THREE.MeshPhongMaterial({color: col})
    ];

    var leftSide = Painting.createBox([dim[2], dim[1] + dim[2]*2, dim[3]], this.frame.materials[2]);
    var rightSide = Painting.createBox([dim[2], dim[1] + dim[2]*2, dim[3]], this.frame.materials[2]);
    var upSide = Painting.createBox([dim[0], dim[2], dim[3]], this.frame.materials[2]);
    var bottomSide = Painting.createBox([dim[0], dim[2], dim[3]], this.frame.materials[2]);

    leftSide.position.set( 0 - dim[0]/2 - dim[2]/2, 0, 0 );
    rightSide.position.set( 0 + dim[0]/2 + dim[2]/2, 0, 0 );
    upSide.position.set( 0, 0 + dim[1]/2 + dim[2]/2, 0 );
    bottomSide.position.set( 0, 0 - dim[1]/2 - dim[2]/2, 0 );

    this.frame.add(leftSide);
    this.frame.add(rightSide);
    this.frame.add(upSide);
    this.frame.add(bottomSide);

    this.add(this.frame);
  }

  createBackground(dim, col) {

    var mat = new THREE.MeshPhongMaterial({color: col});

    this.background = Painting.createBox([dim[0], dim[1], 0.5], mat);

    this.background.materials =
    [
      new THREE.MeshBasicMaterial({color: col}),
      new THREE.MeshLambertMaterial({color: col}),
      mat
    ];

    this.add(this.background);
  }

  createSquares(dim, col) {
    this.squares = new THREE.Group();
    var square;

    this.squares.materials =
    [
      new THREE.MeshBasicMaterial({color: col}),
      new THREE.MeshLambertMaterial({color: col}),
      new THREE.MeshPhongMaterial({color: col})
    ];

    for (let posX = -36; posX <= 36; posX += 8) {
      for (let posY = 20; posY >= -20; posY -= 8) {
        square = Painting.createBox([6, 6, 1], this.squares.materials[2]);
        square.position.set(posX, posY, 0);
        this.squares.add(square);
      }
    }

    this.add(this.squares);
  }

  createCircles(dim, col) {
    this.circles = new THREE.Group();
    var circle;

    this.circles.materials =
    [
      new THREE.MeshBasicMaterial({color: col}),
      new THREE.MeshLambertMaterial({color: col}),
      new THREE.MeshPhongMaterial({color: col})
    ];

    for ( var posX = -32; posX <= 32; posX += 8){
      for ( var posY = 16; posY >= -16; posY -= 8){
        circle = Painting.createCylinder([Math.sqrt(2), Math.sqrt(2), 1, 64], this.circles.materials[2]);
        circle.rotateX(-Math.PI/2);
        circle.position.set(posX, posY, 0);
        this.circles.add(circle);
      }
    }

    this.add(this.circles);
  }

  static createBox(dim, mat) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      mat
    );
  }

  // dim - [can.topRadius, can.bottomRadius, can.height, can.cylinderSmothness]
  static createCylinder(dim, mat) {
		return new THREE.Mesh(
			new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
			mat
		);
	}

  changeMaterial(matIdx) {
    this.children.forEach((child)=>{
      if (child instanceof THREE.Mesh) {
        child.material = child.materials[matIdx];
      }
      if (child instanceof THREE.Group) {
        child.children.forEach((piece)=>{
          if (piece instanceof THREE.Mesh) {
            piece.material = child.materials[matIdx];
          }
        });
      }
    });
  }
}
