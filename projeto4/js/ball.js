class Ball extends THREE.Object3D {
  'use strict';

  constructor(pos, dim, text) {
    super();

    this.unlockMotion = true;
    this.canMove = true;

    var map = this.createTexture(text);
    this.sphere = Ball.createSphere(dim,map);
    

    this.mat = [
      this.sphere.material,
      new THREE.MeshBasicMaterial({map:map,wireframe:false})
    ];

    this.add(this.sphere);
    this.position.set(pos[0], pos[1], pos[2]);

  }

  move(deltaTime) {
    // TODO Movement logic

  }

  changeMaterial(matIdx) {
    // TODO Phong to Basic and vice versa
    this.sphere.material = this.mat[matIdx];
  }

  changeVisibility() {
    // TODO wireframe = !wireframe
    this.sphere.wireframe = !this.sphere.wireframe;
  }
  static createSphere(dim, text) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(dim[0], dim[1], dim[2]),
			new THREE.MeshPhongMaterial({map: text})
    );
  }

  createTexture(img){
    const texture_loader = new THREE.TextureLoader();
    const texture = texture_loader.load(img);

    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16; //valores possíveis sao 2^n
    texture.wrapS = texture.wrapT= THREE.RepeatWrapping;
    return texture;
  }
}
