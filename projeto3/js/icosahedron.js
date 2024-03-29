class Icosahedron extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    this.group = new THREE.Group();

    var geo = new THREE.Geometry();
    var mat = new THREE.MeshPhongMaterial({color: 0x3FAF8F});

    this.martelo(geo);

    geo.computeFaceNormals();

    this.ico = new THREE.Mesh(geo, mat);
    this.ico.position.set(0,0+45,0);
    this.ico.materials =
    [
      new THREE.MeshBasicMaterial({color: 0x3FAF8F}),
      new THREE.MeshLambertMaterial({color: 0x3FAF8F}),
      mat
    ];


    this.cylinder = Icosahedron.createCylinder([10,10,30,64],0x126384);
    this.cylinder.position.set(0,15,0);
    this.cylinder.materials =
    [
      new THREE.MeshBasicMaterial({color: 0x126384}),
      new THREE.MeshLambertMaterial({color: 0x126384}),
      new THREE.MeshPhongMaterial({color: 0x126384})
    ];

    this.group.add(this.ico);
    this.group.add(this.cylinder);
    this.add(this.group);

    this.position.set(pos[0], pos[1], pos[2]);

		this.updateMatrixWorld();
  }

  static createCylinder(dim, col) {
		return new THREE.Mesh(
			new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
			new THREE.MeshPhongMaterial({ color: col })
		);
	}

  changeMaterial(matIdx) {
    this.ico.material = this.ico.materials[matIdx];
    this.cylinder.material = this.cylinder.materials[matIdx];
  }

  martelo(geo){
    const phi = ( 1 + Math.sqrt( 5 ) ) / 2;

    geo.vertices.push(new THREE.Vector3(-1,phi,0).multiplyScalar(10 + Math.random()*3)); //0
    geo.vertices.push(new THREE.Vector3(1,phi,0).multiplyScalar(10 + Math.random()*3)); //1
    geo.vertices.push(new THREE.Vector3(-1,-phi,0).multiplyScalar(10 + Math.random()*3)); //2
    geo.vertices.push(new THREE.Vector3(1,-phi,0).multiplyScalar(10 + Math.random()*3)); //3
    geo.vertices.push(new THREE.Vector3(0,-1,phi).multiplyScalar(10 + Math.random()*3)); //4
    geo.vertices.push(new THREE.Vector3(0,1,phi).multiplyScalar(10 + Math.random()*3)); //5
    geo.vertices.push(new THREE.Vector3(0,-1,-phi).multiplyScalar(10 + Math.random()*3)); //6
    geo.vertices.push(new THREE.Vector3(0,1,-phi).multiplyScalar(10 + Math.random()*3)); //7
    geo.vertices.push(new THREE.Vector3(phi,0,-1).multiplyScalar(10 + Math.random()*3)); //8
    geo.vertices.push(new THREE.Vector3(phi,0,1).multiplyScalar(10 + Math.random()*3)); //9
    geo.vertices.push(new THREE.Vector3(-phi,0,-1).multiplyScalar(10 + Math.random()*3)); //10
    geo.vertices.push(new THREE.Vector3(-phi,0,1).multiplyScalar(10 + Math.random()*3)); //11

    geo.faces.push(new THREE.Face3(0,11,5));
    geo.faces.push(new THREE.Face3(0,5,1));
    geo.faces.push(new THREE.Face3(0,1,7));
    geo.faces.push(new THREE.Face3(0,7,10));
    geo.faces.push(new THREE.Face3(0,10,11));
    geo.faces.push(new THREE.Face3(1,5,9));
    geo.faces.push(new THREE.Face3(5,11,4));
    geo.faces.push(new THREE.Face3(11,10,2));
    geo.faces.push(new THREE.Face3(10,7,6));
    geo.faces.push(new THREE.Face3(7,1,8));
    geo.faces.push(new THREE.Face3(3,9,4));
    geo.faces.push(new THREE.Face3(3,4,2));
    geo.faces.push(new THREE.Face3(3,2,6));
    geo.faces.push(new THREE.Face3(3,6,8));
    geo.faces.push(new THREE.Face3(3,8,9));
    geo.faces.push(new THREE.Face3(4,9,5));
    geo.faces.push(new THREE.Face3(2,4,11));
    geo.faces.push(new THREE.Face3(6,2,10));
    geo.faces.push(new THREE.Face3(8,6,7));
    geo.faces.push(new THREE.Face3(9,8,1));
  }
}
