class Dice extends THREE.Object3D {
  'use strict';

  constructor(pos, dim) {
    super();
    this.canMove = true;

    var dice = [
      this.createTexture('../images/dice1.png'),
      this.createTexture('../images/dice2.png'),
      this.createTexture('../images/dice3.png'),
      this.createTexture('../images/dice4.png'),
      this.createTexture('../images/dice5.png'),
      this.createTexture('../images/dice6.png')
    ];

    var bump =[
      this.createTexture('../images/bump1.png'),
      this.createTexture('../images/bump2.png'),
      this.createTexture('../images/bump3.png'),
      this.createTexture('../images/bump4.png'),
      this.createTexture('../images/bump5.png'),
      this.createTexture('../images/bump6.png')
    ];

    var phong = [
      new THREE.MeshPhongMaterial({map:dice[0],bumpMap:bump[0],wireframe:false}),
      new THREE.MeshPhongMaterial({map:dice[1],bumpMap:bump[1],wireframe:false}),
      new THREE.MeshPhongMaterial({map:dice[2],bumpMap:bump[2],wireframe:false}),
      new THREE.MeshPhongMaterial({map:dice[3],bumpMap:bump[3],wireframe:false}),
      new THREE.MeshPhongMaterial({map:dice[4],bumpMap:bump[4],wireframe:false}),
      new THREE.MeshPhongMaterial({map:dice[5],bumpMap:bump[5],wireframe:false})
    ];

    var basic = [
      new THREE.MeshBasicMaterial({map:dice[0],wireframe:false}),
      new THREE.MeshBasicMaterial({map:dice[1],wireframe:false}),
      new THREE.MeshBasicMaterial({map:dice[2],wireframe:false}),
      new THREE.MeshBasicMaterial({map:dice[3],wireframe:false}),
      new THREE.MeshBasicMaterial({map:dice[4],wireframe:false}),
      new THREE.MeshBasicMaterial({map:dice[5],wireframe:false})
    ];

    this.mat = [phong,basic];

    this.box = Dice.createBox(dim,phong);

    this.box.add(new THREE.AxisHelper(20));
    this.add(this.box);

    //center_to_floor = dice_edge * Math.sqrt(3, 2);
    this.box.rotation.z = Math.PI/4;
    this.box.rotation.x = Math.atan(Math.sqrt(1/2));
    this.position.set(pos[0], pos[1], pos[2]);
  }

  move(deltaTime) {
    // TODO Movement logic
    this.rotateY(Math.PI/2 * deltaTime);
  }

  changeMaterial(matIdx) {
    // TODO Phong to Basic and vice versa
    this.box.material = this.mat[matIdx];
  }

  changeVisibility() {
    // TODO wireframe = !wireframe
    this.box.wireframe = !this.box.wireframe;
  }

  static createBox(dim,mat) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      mat
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
