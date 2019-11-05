class Spotlight extends THREE.Object3D{
  'use strict';
  constructor(pos, target) {
    super();

    this.unlockSpotlight = true;
    this.light = new THREE.SpotLight(0xfffffff, 1, 250, Math.PI/8, 0, 1);

    this.add(this.light);
    //this.add(this.light.target);

    this.light.position.set(pos[0], pos[1], pos[2]);
    this.light.target.position.set(target[0], target[1], target[2]);

    this.light.target.updateMatrixWorld();
    //this.helper = new THREE.SpotLightHelper(this.light);
    //this.add(this.helper);
  }
}
