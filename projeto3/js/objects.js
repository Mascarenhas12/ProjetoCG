class Box extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();

    var mesh = new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2], 4, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false })
    );

    var phong = new THREE.MeshPhongMaterial(

    );

    var gouraud = new THREE.MeshLambertMaterial(

    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
    this.add(phong);
    this.add(gouraud);
  }

  changeShading(){
    this.children.forEach((child)=>{
      if(child instanceof THREE.MeshLambertMaterial || child instanceof THREE.MeshPhongMaterial){
        child.visible = !child.visible
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
}

class Cone extends THREE.Object3D {
  'use strict';

  constructor(pos, dim){
    super();

    var mesh = new THREE.Mesh(
      new THREE.ConeGeometry(),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })
    );

    this.add(mesh);
    this.position.set(pos[0], pos[1], pos[2]);
  }
}


class Cylinder extends THREE.Object3D {
  'use strict';

  constructor(pos, dim, color) {
    super();

    var mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(dim[0], dim[1], dim[2], dim[3]),
      new THREE.MeshBasicMaterial({ color: color, wireframe: false })
    );

    var phong = new THREE.MeshPhongMaterial(

    );

    var gouraud = new THREE.MeshLambertMaterial(

    );

    mesh.position.set(pos[0], pos[1], pos[2]);
    this.add(mesh);
    this.add(phong);
    this.add(gouraud);
  }

  changeShading(){
    this.children.forEach((child)=>{
      if(child instanceof THREE.MeshLambertMaterial || child instanceof THREE.MeshPhongMaterial){
        child.visible = !child.visible
      }
    });
  }
}
