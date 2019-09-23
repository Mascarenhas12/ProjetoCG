class Robot extends THREE.Object3D {
  constructor(pos){
    super();

    this.userData.movingLeft = false;
    this.userData.movingFoward = false;
    this.userData.movingRight = false;
    this.userData.movingBackward = false;
    this.userData.rotateArmPositive = false;
    this.userData.rotateArmPositive = false;
    this.userData.RotationBasePositive = false;
    this.userData.RotationBaseNegative = false;
    this.userData.currRotation = 0;

    this.add(new Base(pos));
    this.body = new Body(pos);//move semi sphere to class body
    this.add(this.body);
  }

  rotateArm(angle){ // change rotation
    this.body.rotateY(angle);
  }

  moveArm(angle){
    this.body.rotateZ(angle);
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
    this.add(new Box([pos[0]-10, pos[1], pos[2]], [4,4,16]))
    this.add(new Box([pos[0]+10, pos[1], pos[2]], [4,4,16]))
    this.add(new Sphere([pos[0]+11.5, pos[1]-4, pos[2]+6.5], [2,20,20]))
    this.add(new Sphere([pos[0]+11.5, pos[1]-4, pos[2]-6.5], [2,20,20]))
    this.add(new Sphere([pos[0]-11.5, pos[1]-4, pos[2]+6.5], [2,20,20]))
    this.add(new Sphere([pos[0]-11.5, pos[1]-4, pos[2]-6.5], [2,20,20]))
    this.add(new Sphere([pos[0], pos[1]+1, pos[2]], [6, 20, 20, 0 ,2*Math.PI, 0, 0.5 * Math.PI]));
  }

  moveWheels() {

  }
}

class Arm extends THREE.Object3D {
  constructor(pos){
    super();
    this.add(new Box([pos[0], pos[1]+12, pos[2]], [2, 13, 2]));
    this.add(new Sphere([pos[0], pos[1]+18, pos[2]], [2.5, 32, 32]));
    this.add(new Box([pos[0]+5, pos[1]+19, pos[2]], [10, 2, 2]));
    this.add(new Sphere([pos[0]+12, pos[1]+19, pos[2]], [2.5, 32, 32]));
  }
}

class Hand extends THREE.Object3D {
  constructor(pos){
    super();
    this.add(new Box([pos[0]+15,pos[1]+20,pos[2]],[1,6,6]));
    this.add(new Box([pos[0]+18,pos[1]+21,pos[2]],[4,1,1]));
    this.add(new Box([pos[0]+18,pos[1]+18,pos[2]],[4,1,1]));
  }
}

class Body extends THREE.Object3D {
  constructor(pos){
    super();
    this.arm = new Arm(pos); //combine arm e hand noutra class
    this.hand = new Hand(pos);
    this.add(this.arm);
    this.add(this.hand);
  }
}
