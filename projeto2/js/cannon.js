class Cannon extends THREE.Object3D {
  'use strict';

  this.userData.currRotation = 0;

  constructor(pos, dim) {
    super();

    this.add(new Cylinder(pos[0], pos[1], pos[2], [3, 3, 20, 64]))
  }

  rotate(angle) {
    this.rotateY(angle);
  }

  changeColor(color) {
    this.children.forEach(function(child){
      child.changeColor(color);
    });
  }
}
