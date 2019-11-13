class Table extends THREE.Object3D {
  'use strict';

  constructor(pos, dim, img) {
    super();

    this.canMove = false;

    var text = this.createTexture(img);
    this.box = Table.createBox(dim,text);
    this.add(this.box);
    this.position.set(pos[0], pos[1], pos[2]);

  }

  static createBox(dim,text) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      new THREE.MeshPhongMaterial({map: text})
    );
    //new THREE.MeshPhongMaterial({map: text,bumpMap: text})
  }

  createTexture(img) {
    const texture_loader = new THREE.TextureLoader();
    const texture = texture_loader.load(img);

    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16; //valores possíveis sao 2^n
    return texture;
  }

  move(deltaTime) {}

  changeMaterial() {
    // TODO Phong to Basic and vice versa
  }

  changeVisibility() {
  // TODO wireframe = !wireframe
  }
}
