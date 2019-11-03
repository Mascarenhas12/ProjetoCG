class Painting extends THREE.Object3D {
  'use strict';

  constructor(pos, dim, color) {
    super();

    this.frame = Painting.createBox([], col);
    this.frame.material[1].visible = false;
    this.frame.material[2].visible = false;
    this.passepartu;
  }

  static createBox(dim, col) {
    return new THREE.Mesh(
      new THREE.CubeGeometry(dim[0], dim[1], dim[2]),
      [new THREE.MeshBasicMaterial({ color: col }),
      new THREE.MeshLambertMaterial({ color: color, shininess: 30}),
      new THREE.MeshPhongMaterial({ color: color, shininess: 30})]
    );
  }

  static creat
}

function combination(vals){
  list = [];

  for (var i in vals){
    for (var u in vals){
      for (var t in vals){
        if (i != u && i != t && u != t){
          list.push(new THREE.Vector3(
            vals[i]+(Math.random()),
            vals[u]+(Math.random()),
            vals[t]+(Math.random()))
          );
        }
      }
    }
  }
  return list;
}

class Icosahedron extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    var geo = new THREE.Geometry();
    var materials = new THREE.MeshBasicMaterial({color: 0x3FAF8F});
    const phi = ( 1 + Math.sqrt( 5 ) ) / 2;
    const vals = [1,-1,0,phi,-phi];

    var vertex_list = combination(vals);
    vertex_list.forEach((node)=>{
      geo.vertices.push(node);
    });

    for(let i=0;i<geo.vertices.length;i++){
      geo.faces.push(new THREE.Face3(i,i+1,i+2));
    }

    geo.computeFaceNormals();
    console.log("55");

    var mesh= new THREE.Mesh(geo, materials);
    this.add(mesh);

    this.position.set(pos[0], pos[1], pos[2]);

		this.updateMatrixWorld();
  }
}

class Spotlight extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

    this.add(new Cone());
    this.add(new Sphere());
  }
}
