class Table extends THREE.Object3D {
  'use strict';

  constructor(pos, dim, text, img) {
    super();

    this.canMove = false;

    var map = this.createTexture(text);
    var bump = this.createTexture(img);
    this.box = Table.createBox(dim,map,bump);

    this.mat = [
      this.box.material,
      new THREE.MeshBasicMaterial({map:map,wireframe:false})
    ];

    this.add(this.box);
    this.position.set(pos[0], pos[1], pos[2]);

  }

  static createBox(dim,map,bump) {
    var mat = new THREE.MeshPhongMaterial({map: map,bumpMap: bump, wireframe:false});
    mat.bumpScale = 0.1;
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      mat
    );
  }

  createTexture(img) {
    const texture_loader = new THREE.TextureLoader();
    const texture = texture_loader.load(img);

    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16; //valores possíveis sao 2^n
    texture.wrapS = texture.wrapT= THREE.RepeatWrapping;
    return texture;
  }

  move(deltaTime) {

  }

  changeMaterial(matIdx) {
    // TODO Phong to Basic and vice versa
    this.box.material = this.mat[matIdx];
  }

  changeVisibility() {
  // TODO wireframe = !wireframe
    this.box.wireframe = !this.box.wireframe;
  }
}
