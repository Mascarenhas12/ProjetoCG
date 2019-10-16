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

    this.shaft = new Cylinder([pos[0], pos[1], pos[2]], [3, 3, 20, 64]);
    this.muzzle = new Cylinder([pos[0], pos[1]+10.5, pos[2]], [2, 2, 1, 64]);

    this.add(this.shaft);
    this.add(this.muzzle);

    this.add(new THREE.AxisHelper(10));

    this.rotateX(Math.PI/2);
  }

  rotate(angle) {
    this.rotateZ(angle);
  }

  changeColor(color) {
    this.children.forEach(function(child){
      child.changeColor(color);
    });
  }

  fire(bullet) {
    bullet.rotateZ(this.userData.currRotation);
    bullet.move(0);
  }

  betterFire() {

    var bullet = new Sphere([this.muzzle.position.x, this.muzzle.position.y, this.muzzle.position.z], [3,32,32]);
    bullet.rotateY(this.userData.currRotation);

    return bullet;
  }
}

class Bullet extends THREE.Object3D {
  'use strict';

  constructor(pos,dir) {
    super();

    this.userData.velocity = 1;
    this.userData.direction = dir;

    this.add(new Sphere([pos[0],pos[1],pos[2]], [3,32,32]));
    this.add(new THREE.AxisHelper(10));
  }

  move(friction) {
    this.position.x += this.userData.velocity*Math.sin(this.userData.direction[0]);
    this.position.z -= this.userData.velocity*Math.cos(this.userData.direction[1]);
  }
}
