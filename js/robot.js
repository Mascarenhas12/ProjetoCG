//node.material.wireframe = !node.material.wireframe;

class Robot extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();

    this.userData.movingLeft = false;
    this.userData.movingFoward = false;
    this.userData.movingRight = false;
    this.userData.movingBackward = false;

    this.userData.rotateLeft = false;
    this.userData.rotateRight = false;
    this.userData.moveArmBackward = false;
    this.userData.moveArmFoward = false;
    this.userData.currRotation = 0;

    this.userData.unlockVisibility = true; // So podes tar a trolar!!!!!

    this.base = new Base(pos)
    this.body = new Body(pos);

    this.add(this.base);
    this.add(this.body);
  }

  rotateArm(angle){
    this.body.rotateY(angle);
  }

  moveArm(angle){
    this.body.moveArm(angle);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      child.changeVisibility()
    });
  }
}

class Base extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();

    this.add(new Box([pos[0], pos[1], pos[2]], [16,2,12]));
    this.add(new Box([pos[0]-10, pos[1], pos[2]], [4,4,16]));
    this.add(new Box([pos[0]+10, pos[1], pos[2]], [4,4,16]));
    this.add(new Sphere([pos[0]+10, pos[1]-4, pos[2]+6], [2,20,20]));
    this.add(new Sphere([pos[0]+10, pos[1]-4, pos[2]-6], [2,20,20]));
    this.add(new Sphere([pos[0]-10, pos[1]-4, pos[2]+6], [2,20,20]));
    this.add(new Sphere([pos[0]-10, pos[1]-4, pos[2]-6], [2,20,20]));
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}

class Body extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();
    this.add(new Sphere([pos[0], pos[1]+1, pos[2]], [6, 20, 20, 0 ,2*Math.PI, 0, 0.5 * Math.PI]));
    this.forearm = new ForeArm(pos);
    this.add(this.forearm);
  }

  moveArm(angle){
    this.forearm.rotateZ(angle);
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}

class Box extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2], 4, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Sphere extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();

    let v = [0, Math.PI * 2, 0, Math.PI];
    if (dim.length > 3)
      v = [dim[3], dim[4], dim[5], dim[6]];

    var mesh = new THREE.Mesh(
      new THREE.SphereGeometry(dim[0], dim[1], dim[2], v[0], v[1], v[2], v[3]),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    this.add(mesh);
    this.position.set(pos[0], pos[1], pos[2]);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Arm extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();
    this.add(new Box([pos[0], pos[1]+12, pos[2]], [2, 13, 2]));
    this.add(new Sphere([pos[0], pos[1]+18, pos[2]], [2.5, 32, 32]));
    this.add(new Box([pos[0]+5, pos[1]+18, pos[2]], [10, 2, 2]));
    this.add(new Sphere([pos[0]+12, pos[1]+18, pos[2]], [2.5, 32, 32]));
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}

class Hand extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();
    this.add(new Box([pos[0]+15, pos[1]+18, pos[2]], [1,6,6]));
    this.add(new Box([pos[0]+17.5, pos[1]+20.5, pos[2]], [4,1,1]));
    this.add(new Box([pos[0]+17.5, pos[1]+15.5, pos[2]], [4,1,1]));
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}

class ForeArm extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();
    this.add(new Arm(pos));
    this.add(new Hand(pos));
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}

class Cylinder extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Torus extends THREE.Object3D {
  'use strict';

  constructor(pos,dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.TorusGeometry(dim[0], dim[1], dim[2], dim[3]),
      new THREE.MeshBasicMaterial({ color: 0x7070ff, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Pedestal extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();
    this.add(new Cylinder([pos[0]+30, pos[1]+4, pos[2]], [3,3,20,64]));
    this.add(new Torus([pos[0]+30, pos[1]+17.6, pos[2]], [2.5,1,30,20]));
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}
