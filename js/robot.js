class Robot extends THREE.Object3D {
  constructor(pos){
    super();

    this.userData.movingLeft = false;
    this.userData.movingFoward = false;
    this.userData.movingRight = false;
    this.userData.movingBackward = false;

    this.add(new Base(pos));
    this.add(new Arm(pos));
    this.add(new Hand(pos));
  }
}

class Box extends THREE.Object3D {
  constructor(pos, dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }
}

class Sphere extends THREE.Object3D {
  constructor(pos, dim){
    super();

    let v = [0, Math.PI * 2, 0, Math.PI];
    if(dim.length > 3)
      v = [dim[3], dim[4], dim[5], dim[6]];
      //material.side = THREE.DoubleSide;

    var mesh = new THREE.Mesh(
      new THREE.SphereGeometry(dim[0], dim[1], dim[2], v[0], v[1], v[2], v[3]),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    this.add(mesh);
    this.position.set(pos[0], pos[1], pos[2]);
  }
}

class Base extends THREE.Object3D {
  constructor(pos){
    super();
    this.add(new Box([pos[0], pos[1], pos[2]], [16,2,12]));
    this.add(new Box([pos[0]-10.5, pos[1], pos[2]], [4,4,16]))
    this.add(new Box([pos[0]+10.5, pos[1], pos[2]], [4,4,16]))
    this.add(new Sphere([pos[0]+11.5, pos[1]-4, pos[2]+6.5], [2,20,20]))
    this.add(new Sphere([pos[0]+11.5, pos[1]-4, pos[2]-6.5], [2,20,20]))
    this.add(new Sphere([pos[0]-11.5, pos[1]-4, pos[2]+6.5], [2,20,20]))
    this.add(new Sphere([pos[0]-11.5, pos[1]-4, pos[2]-6.5], [2,20,20]))
  }

  moveWheels() {

  }
}

class Arm extends THREE.Object3D {
  constructor(pos){
    super();
    this.add(new Sphere([pos[0], pos[1]+1, pos[2]], [6, 32, 32, 0 ,2*Math.PI, 0, 0.5 * Math.PI]));
    this.add(new Box([pos[0], pos[1]+12, pos[2]], [2, 10, 2]));
    this.add(new Sphere([pos[0], pos[1]+18, pos[2]], [2.5, 32, 32]));
    this.add(new Box([pos[0], pos[1]+24, pos[2]], [2, 10, 2]));
    this.add(new Sphere([pos[0], pos[1]+30, pos[2]], [2.5, 32, 32]));

  }

  moveArm() {

  }

  moveBall() {

  }
}

class Hand extends THREE.Object3D {
  constructor(pos){
    super();
    this.add(new Box([pos[0],pos[1]+33,pos[2]],[6,1,6]));
    this.add(new Box([pos[0]-2,pos[1]+35,pos[2]],[1,4,1]));
    this.add(new Box([pos[0]+2,pos[1]+35,pos[2]],[1,4,1]));
  }
}
