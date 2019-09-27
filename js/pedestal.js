
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

  changeVisibility(){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Torus extends THREE.Object3D {
  'use strict';

  constructor(pos,dim){
    super();
    var mesh = new THREE.Mesh(
      new THREE.TorusGeometry(dim[0], dim[1], dim[2], dim[3]),
      new THREE.MeshBasicMaterial({ color: 0x7070ff, wireframe: true })
    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
  }

  changeVisibility(){
    this.children.forEach(function(child){
      if(child instanceof THREE.Mesh){
        child.material.wireframe = !child.material.wireframe;
      }
    });
  }
}

class Pedestal extends THREE.Object3D {
  'use strict';

  constructor(pos){
    super();
    this.add(new Cylinder([pos[0]+30, pos[1]+4, pos[2]], [3,3,20,64]));
    this.add(new Torus([pos[0]+30, pos[1]+17.6, pos[2]], [2.5,1,30,20]));
  }

  changeVisibility(){
    this.children.forEach(function(child){
        child.changeVisibility()
    });
  }
}
