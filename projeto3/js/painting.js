class Painting extends THREE.Object3D {
  'use strict';

  // dim = [painting.length (78), painting.height (46), frame.length (2), frame.tickness (1)]
  constructor(pos, dim, col) {
    super();

    var mat = [
      new THREE.MeshBasicMaterial({color: col}),
      new THREE.MeshLambertMaterial({color: col}),
      new THREE.MeshPhongMaterial({color: col})
    )];

    this.createFrame(dim, col);

    this.back = Painting.createBox([dim[0], dim[1], 0], 0x959595);

    this.add(this.back);

    var i = 0;

    var squares = new Array(60);
    for ( var comprimento = -36; comprimento <= 36; comprimento += 8){
      for ( var altura = 20; altura >= -20; altura -= 8){
        squares[i] = Painting.createBox([6, 6, 1], 0x000000);
        squares[i].position.set(comprimento, altura, 0);
        this.add(squares[i]);
        i++;
      }
    }
    i = 0;
    var circles = new Array(45);
    for ( var comprimento = -32; comprimento <= 32; comprimento += 8){
      for ( var altura = 16; altura >= -16; altura -= 8){
        circles[i] = Painting.createCylinder([Math.sqrt(2), Math.sqrt(2), 1, 64], 0xFFFFFF);
        circles[i].rotateX(-Math.PI/2);
        circles[i].position.set(comprimento, altura, 0);
        this.add(circles[i]);
        i++;
      }
    }

    this.position.set(pos[0], pos[1], pos[2]);

    this.updateMatrixWorld();

    var auxVector1 = new THREE.Vector3();
    this.paintingPos = auxVector1.setFromMatrixPosition(this.matrixWorld);
  }

  createFrame(dim, col) {

    this.frame = new THREE.Group();

    var leftSide = Painting.createBox([dim[2], dim[1] + dim[2]*2, dim[3]], col);
    var rightSide = Painting.createBox([dim[2], dim[1] + dim[2]*2, dim[3]], col);
    var upSide = Painting.createBox([dim[0], dim[2], dim[3]], col);
    var bottomSide = Painting.createBox([dim[0], dim[2], dim[3]], col);

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

  static createBox(dim, col) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      new THREE.MeshBasicMaterial({ color: col })
    );
  }

  // dim - [can.topRadius, can.bottomRadius, can.height, can.cylinderSmothness]
  static createCylinder(dim, col) {
		return new THREE.Mesh(
			new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
			new THREE.MeshBasicMaterial({ color: col })
		);
	}

  // childs: frame -> azul; cilindros -> branco; quadrados -> preto; back -> cinzento
  changeMaterial(material) {
    this.children.forEach((child)=>{
      if (child instanceof THREE.AxisHelper) {
        child.material = material;
        
      }
    });
  }
}
