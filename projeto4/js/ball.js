class Ball extends THREE.Object3D {
  'use strict';

  constructor(pos, dim) {
    super();

    this.unlockMotion = true;
    this.canMove = true;

  }

  move(deltaTime) {
    // TODO Movement logic
  }

  changeMaterial() {
    // TODO Phong to Basic and vice versa
  }

  changeVisibility() {
    // TODO wireframe = !wireframe
  }
}
