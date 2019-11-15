class Dice extends THREE.Object3D {
  'use strict';

  constructor(pos, dim, text) {
    super();

    this.canMove = true;

    this.phong = [
      new THREE.MeshPhongMaterial({map:'../images/dice1.png',bumpMap:'../images/bump1.png'}),
      new THREE.MeshPhongMaterial({map:'../images/dice2.png',bumpMap:'../images/bump2.png'}),
      new THREE.MeshPhongMaterial({map:'../images/dice3.png',bumpMap:'../images/bump3.png'}),
      new THREE.MeshPhongMaterial({map:'../images/dice4.png',bumpMap:'../images/bump4.png'}),
      new THREE.MeshPhongMaterial({map:'../images/dice5.png',bumpMap:'../images/bump5.png'}),
      new THREE.MeshPhongMaterial({map:'../images/dice6.png',bumpMap:'../images/bump6.png'}),
    ]

    this.basic = [
      new THREE.MeshBasicMaterial({map:'../images/dice1.png'}),
      new THREE.MeshBasicMaterial({map:'../images/dice2.png'}),
      new THREE.MeshBasicMaterial({map:'../images/dice3.png'}),
      new THREE.MeshBasicMaterial({map:'../images/dice4.png'}),
      new THREE.MeshBasicMaterial({map:'../images/dice5.png'}),
      new THREE.MeshBasicMaterial({map:'../images/dice6.png'}),
    ]

    this.box1 = Dice.createBox(dim, this.phong);
    this.box2 = Dice.createBox(dim, this.basic);
    this.box2.visible = false;
    this.group = new THREE.Group();
    this.group.add(this.box1);
    this.group.add(this.box2);
    this.add(this.group);

    //center_to_floor = dice_edge * Math.sqrt(3, 2);
    this.group.rotation.z = Math.PI/4;
    this.group.rotation.x = Math.atan(Math.sqrt(1/2));
    this.position.set(pos[0], pos[1], pos[2]);
  }

  move(deltaTime) {
    // TODO Movement logic
    this.rotateY(Math.PI/2 * deltaTime);
  }

  changeMaterial(matIdx) {
    // TODO Phong to Basic and vice versa
    this.box1.visible = !this.box1.visible;
    this.box2.visible = !this.box2.visible;
  }

  changeVisibility() {
    // TODO wireframe = !wireframe
    this.box.wireframe = !this.box.wireframe;
  }

  static createBox(dim,mat) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2],1,1,1,mat),
      new THREE.MeshFaceMaterial({wireframe:false})
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
