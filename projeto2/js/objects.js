class Box extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2], 4, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeColor(color) {
    this.children.forEach(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.color.setHex(color);
      }
    });
  }
}

class Sphere extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();

    let v = [0, Math.PI * 2, 0, Math.PI];
    if (dim.length > 3)
      v = [dim[3], dim[4], dim[5], dim[6]];

    var mesh = new THREE.Mesh(
      new THREE.SphereGeometry(dim[0], dim[1], dim[2], v[0], v[1], v[2], v[3]),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })
    );

    this.add(mesh);
    this.position.set(pos[0], pos[1], pos[2]);
  }

  changeColor(color) {
    this.children.forEach(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.color.setHex(color);
      }
    });
  }
}

class Cylinder extends THREE.Object3D {
  'use strict';

  constructor(pos, dim) {
    super();
    var mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeColor(color) {
    this.children.forEach(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.color.setHex(color);
      }
    });
  }

  /*changeVisibilityAxis(){
    this.children.forEach((child)=>{
      if(child instanceof THREE.AxisHelper){
        child.
      }
    });
  }*/
}
