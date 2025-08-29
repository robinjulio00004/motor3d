AFRAME.registerComponent('ccplane', {
      schema: {
        Dir: { type: 'string', default: 'no-axis'}
        //vector: { type: 'vec3', default: {x:0,y:0,z:-1}}
    },

    init: function () {
      let matrix;
      let localPlanes = [];
      let localPlane;
      let meshMaterial;
      let object;
      const ren=document.querySelector("a-scene").renderer;

          localPlane = new THREE.Plane(new THREE.Vector3(0,1,0),0);
          matrix = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
          localPlane.normal.applyMatrix4(matrix);
          localPlanes.push(localPlane);
          this.el.addEventListener('model-loaded', (e) =>{
            object = e.detail.model;
            object.traverse(function (node){
              if (node.isMesh && localPlane){
              meshMaterial = node.material.clone();
              meshMaterial.clipping=true;
              meshMaterial.clippingPlanes= [localPlane ];
              meshMaterial.clipShadows = true;
              meshMaterial.side = THREE.DoubleSide;
              node.material = meshMaterial;
              node.castShadow = true;
              }//fin node is mesh
            })//fin function node
         });//fin event listener
          ren.localClippingEnabled = true;
    },
  update:function(){
    let render=document.querySelector("a-scene");
    if(this.data.Dir=='no-axis')
      {
       render.renderer.localClippingEnabled = true; 
      }else if(this.data.Dir=='axis'){
       render.renderer.localClippingEnabled = false; 
      }
 this.el.setAttribute('Dir', this.data.Dir);
  }
});

/*document.getElementById('boton1').addEventListener('click', function() {
  console.log("boton click");
  const entidad = document.getElementById('modelo3d');
  entidad.setAttribute('ccplane', 'Dir', 'no-axis' );
});

document.getElementById('boton2').addEventListener('click', function() {
  console.log("boton click");
  const entidad = document.getElementById('modelo3d');
  entidad.setAttribute('ccplane', 'Dir', 'axis' );
});*/




