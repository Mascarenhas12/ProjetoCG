class Lamp extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    this.materials =
    [
      new THREE.MeshBasicMaterial({color: 0x00004F}),
      new THREE.MeshLambertMaterial({color: 0x00004F}),
      new THREE.MeshPhongMaterial({color: 0x00004F})
    ];

    this.lamp = Lamp.createSphere([3, 64, 64], this.materials[2]); //0x340f45
    this.iceCream = Lamp.createCone([9, 18, 64, 64, true], this.materials[2]);

    this.add(this.lamp);
    this.add(this.iceCream);


    if(pos[0] > 0 && pos[2] > 0){
      this.rotateX(Math.PI/4);

    }
    if(pos[0] > 0 && pos[2] < 0){
      this.rotateZ(-Math.PI/4);
    }
    if(pos[0] < 0 && pos[2] > 0){
      this.rotateX(Math.PI/4);

    }
    if(pos[0] < 0 && pos[2] < 0){
      this.rotateZ(Math.PI/4);
    }
    this.position.set(pos[0], pos[1], pos[2]);
    this.updateMatrixWorld();

  }

  static createSphere(dim, mat) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(dim[0], dim[1], dim[2]),
      mat
    );
  }

  static createCone(dim, mat) {
    return new THREE.Mesh(
      new THREE.ConeGeometry(dim[0], dim[1], dim[2], dim[3], dim[4], dim[5]),
      mat
    );
  }

  changeMaterial(matIdx) {
    this.lamp.material = this.materials[matIdx];
    this.iceCream.material = this.materials[matIdx];
  }
}
