class SceneObjects extends THREE.Group {

  constructor(){
    super();

    this.unlockApplyMaterial = true;
  }

  add(obj){
    super().add(obj);
  }

  changeVisibility(){

  }

  changeMaterial(){

  }

  move(deltaTime){
    //this.children.move(deltaTime);
  }
}
