class Spotlight extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    //this.lamp = Spotlight.createSphere(3, 64, 64);
    this.iceCream = Spotlight.createCone([9, 18, 64, 64, true], 0x00004F);

    //this.add(this.lamp);
    this.add(this.iceCream);

  }

  static createSphere(dim, col) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(dim[0], dim[1], dim[2]),
      new THREE.MeshBasicMaterial({ color: col })
    );
  }

  static createCone(dim, col) {
    return new THREE.Mesh(
      new THREE.ConeGeometry(dim[0], dim[1], dim[2], dim[3], dim[4], dim[5]),
      new THREE.MeshBasicMaterial({ color: col })
    );
  }
}
