class PauseMenu extends THREE.Object3D {
  'use strict';

  constructor(pos, dim) {
    super();

    var text = this.createTexture();
    this.box = Table.createBox(dim,text);
    this.position.set(pos[0], pos[1], pos[2]);

  }

  static createBox(dim,text) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      new THREE.MeshBasicMaterial({bumpMap: text})
    );
  }

  createTexture(){
    const texture_loader = new THREE.TextureLoader();
    const texture = texture_loader.load("images/chess.jpeg");

    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 16; //valores possíveis sao 2^n
    return texture;
  }
}
