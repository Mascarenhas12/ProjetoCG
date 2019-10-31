class Painting extends THREE.Object3D {
  'use strict';

  constructor(pos) {
    super();

  }
}

function combination(vals){
  list = [];
  for (i in vals){
    for (u in vals){
      for (t in vals){
        
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
    const phi = ( 1 + Math.sqrt( 5 ) ) / 2;
    const vals = [1,-1,0,phi,-phi];
    var vertex = combination(vals);
    vertex.forEach((node)=>{
      geo.vertices.push(node);
    });

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
