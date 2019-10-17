class Fence extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    this.add(new Box(pos, []));
    this.add(new Box(pos, []));
    this.add(new Box(pos, []));
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

    this.shaft = new Cylinder([0, 0, 0], [3, 3, 20, 64]);
    this.muzzle = new Cylinder([0, 0, 0], [2, 2, 1, 64]);

    this.shaft.rotateX(Math.PI/2);
    this.muzzle.rotateX(Math.PI/2);

    this.shaft.translateX(pos[0]);
    this.shaft.translateY(pos[1]);
    this.shaft.translateZ(pos[2]);

    this.muzzle.translateX(pos[0]);
    this.muzzle.translateY(pos[1]+10.5);
    this.muzzle.translateZ(pos[2]);

    //this.shaft.translateOnAxis(new THREE.Vector3(pos[0], pos[1], pos[2]));
    //this.muzzle.translateOnAxis(new THREE.Vector3(pos[0], pos[1]+10.5, pos[2]));

    this.add(this.shaft);
    this.add(this.muzzle);

    this.add(new THREE.AxisHelper(20));
  }

  rotate(angle) {
    this.rotateY(angle);
  }

  changeColor(color) {
    this.children.forEach(function(child){
      child.changeColor(color);
    });
  }

  fire(bullet) {
    bullet.rotateZ(this.userData.currRotation);
    bullet.move();
  }

  betterFire() {
    var bullet = new Bullet([this.muzzle.position.x, this.muzzle.position.y, this.muzzle.position.z], [3,32,32]);
    //console.log(this.muzzle.position);
    //bullet.rotateY(this.userData.currRotation);

    return bullet;
  }
}

class Bullet extends THREE.Object3D {
  'use strict';

  constructor(pos, dir) {
    super();

    this.userData.velocity = 1.5;
    this.userData.friction = 0.01;
    this.userData.direction = dir;

    this.add(new Sphere([pos[0], pos[1], pos[2]], [3,32,32]));
    this.add(new THREE.AxisHelper(10));
  }

  move() {
    this.position.x += this.userData.velocity * this.userData.direction[0];
    this.position.z -= this.userData.velocity * this.userData.direction[1];

    if (this.userData.velocity - this.userData.friction < 0) {
      this.userData.velocity = 0;
    }
    else {
      this.userData.velocity -= this.userData.friction;
    }
  }
}
