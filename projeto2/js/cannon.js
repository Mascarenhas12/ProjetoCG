class Fence extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    this.backwall= new Box([0,0,0], [4,16,104]);
    this.backwall.translateZ(pos[2]-42);
    this.backwall.rotateY(Math.PI / 2);
    this.add(this.backwall);

    this.add(new Box([50,0,-35], [4,16,70]));
    this.add(new Box([-50,0,-35], [4,16,70]));
  }
}

class Cannon extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    this.userData.currRotation = 0;
    this.userData.rotateLeft = false;
    this.userData.rotateRight = false;
    this.userData.bullet = false;

    this.userData.unlockFiring = true;
    this.userData.fire = false;

    this.shaft = new Cylinder([0,0,0], [3,3,20,64]);
    this.muzzle = new Cylinder([0,0,0], [4,4,1,64]);

    this.shaft.rotateX(Math.PI/2);
    this.muzzle.rotateX(Math.PI/2);

    this.muzzle.translateY(-10.5);

    this.add(this.shaft);
    this.add(this.muzzle);

    this.position.set(pos[0], pos[1], pos[2]);

    this.add(new THREE.AxisHelper(20));
  }

  rotate(angle) {
    this.rotateY(angle);
  }

  changeColor(color) {
    this.children.forEach(function(child){
      if(!(child instanceof THREE.AxisHelper)){
          child.changeColor(color);
        }
    });
  }

  fire() {
    var bullet = new Bullet(
      [
        this.position.x,
        this.position.y,
        this.position.z
      ],
      [
        -Math.sin(this.userData.currRotation),
        Math.cos(this.userData.currRotation)
      ]
    );

    return bullet;
  }
}

class Bullet extends THREE.Object3D {
  'use strict';

  constructor(pos, velocity) {
    super();

    this.userData.scalar = 100;
    this.userData.friction = 0.8;
    this.userData.velocity = velocity;

    this.userData.rotation = false;

    this.userData.rotate = [];

    this.add(new Sphere([0,0,0], [3,32,32]));

    this.position.set(pos[0], pos[1], pos[2]);

    this.add(new THREE.AxisHelper(10));
  }

  move(deltaTime) {
    this.position.x += this.userData.scalar * this.userData.velocity[0]*deltaTime;
    this.position.z -= this.userData.scalar * this.userData.velocity[1]*deltaTime;

    if (this.userData.scalar - this.userData.friction < 0) {
      this.userData.scalar = 0;
    }
    else {
      this.userData.scalar -= this.userData.friction;
    }
  }
/*
  rotate(angle) {

    this.rotateX(angle);

    if (this.userData -= this.userData.rotate[1] < 0){
      this.userData.rotate[1]=0;
    }
    else{
    }
  }*/

  movement(deltaTime){

    this.move(deltaTime);
    //this.rotate(deltaTime);
  }
}
