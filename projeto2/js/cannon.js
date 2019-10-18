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
      ],
      this.userData.currRotation
    );

    return bullet;
  }

  changeVisibilityAxis(){
    this.children.forEach((child)=>{child.changeVisibilityAxis()});
  }
}

class Bullet extends THREE.Object3D {
  'use strict';

  constructor(pos, velocity, angle) {
    super();

    this.userData.scalar = THREE.Math.randFloat(50, 200);
    this.userData.friction = 0.8;
    this.userData.velocity = velocity;
    this.userData.currRotation = Math.PI/2;

    this.add(new Sphere([0,0,0], [3,32,32]));
    this.rotateY(angle);

    this.position.set(pos[0], pos[1], pos[2]);

    this.add(new THREE.AxisHelper(10));
  }

  tryMove(deltaTime, camera) {

    this.move(deltaTime, camera);
    this.rotate(deltaTime);
  }

  move(deltaTime, camera) {
    this.position.x += this.userData.scalar * this.userData.velocity[0] * deltaTime;
    this.position.z -= this.userData.scalar * this.userData.velocity[1] * deltaTime;

    camera.position.x += this.userData.scalar * this.userData.velocity[0] * deltaTime;
    camera.position.z -= this.userData.scalar * this.userData.velocity[1] * deltaTime;

    if (this.userData.scalar - this.userData.friction < 0) {
      this.userData.scalar = 0;
    }
    else {
      this.userData.scalar -= this.userData.friction;
    }
  }

  rotate(deltaTime) {

    this.rotateX(-this.userData.currRotation * deltaTime);

    this.userData.currRotation -= this.userData.friction * deltaTime;

    if (this.userData.currRotation < 0) {
      this.userData.currRotation = 0;
    }
  }

  changeVisibilityAxis(){
    this.children.forEach((child)=>{child.changeVisibilityAxis()});
  }
}
