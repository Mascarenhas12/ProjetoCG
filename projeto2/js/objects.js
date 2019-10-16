class Box extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2], 4, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if (child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
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
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    this.add(mesh);
    this.position.set(pos[0], pos[1], pos[2]);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if (child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Cylinder extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeColor(color){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.color = color;
      }
    });
  }
}
