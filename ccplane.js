let eje=1,offset=0,eboton=false,aclip=false;
let renderer = document.querySelector("a-scene").renderer;
let mi_boton=document.getElementById("boton");

		//const mi_boton=document.querySelector(".button");
		//const mi_boton=document.querySelector("#boton");
		//let mi_boton=document.getElementById("boton");
mi_boton.addEventListener('click',function(){
		eboton=!eboton;
	if(eboton===true)
	{    
		document.getElementById("status").innerHTML = "ON";
		mi_boton.value="Vista sección ON";
	}else
	{ 
		document.getElementById("status").innerHTML = "OFF";
		mi_boton.value="Vista sección OFF";
	}
},true);


AFRAME.registerComponent('ccplane', {
      schema: {
        Direction: { type: 'string', default: 'x-axis' }
    },

    init: function () {//Se llama una vez cuando el componente se inicializa por primera vez y se asocia a una entidad.eventos persisten
      
      let matrix;
      const localPlanes = [];
      let localPlane;
      const clipDir = this.el.getAttribute("ccplane").Direction;
      
      if(clipDir=="x-axis"){
        localPlane = new THREE.Plane(new THREE.Vector3(eje,0,0),offset);  
        }else if(clipDir=="y-axis"){
         localPlane = new THREE.Plane(new THREE.Vector3(0,eje,0),offset);  
        }else if(clipDir=="z-axis"){
         localPlane = new THREE.Plane(new THREE.Vector3(0,0,eje),offset); 
        }
                matrix = new THREE.Matrix4().makeRotationZ(Math.PI / 2);
                localPlane.normal.applyMatrix4(matrix);
                localPlanes.push(localPlane);
                this.el.addEventListener('model-loaded', (e) => {
                    const object = e.detail.model;
                    object.traverse(function (node){
                        if (node.isMesh && localPlane){
                       let meshMaterial = node.material.clone();
                        meshMaterial.clipping=true;
	                      meshMaterial.clippingPlanes= [ localPlane ];
                              meshMaterial.clipShadows = true;
                                meshMaterial.side = THREE.DoubleSide;
                            node.material = meshMaterial;
                            node.castShadow = true;
                        }//fin node is mesh
                    })//fin function node
                });//fin eventListener
				renderer.localClippingEnabled = true;
    },//fin init function
	//tick:function(){
		//if(aclip===true)
		//{
			//document.getElementById("status").innerHTML = aclip;
			//renderer.localClippingEnabled = true;
		//}else{
			//document.getElementById("status").innerHTML = aclip;
			//renderer.localClippingEnabled = false;
		//}
	//}
});

AFRAME.registerComponent('mi_ccplane',{
        schema: {
        Direction: { type: 'string', default: 'x-axis' }
    },
  init:function(){
    const clipDir = this.el.getAttribute("mi_ccplane").Direction;
    let pnormal,pcoplanar,clippingPlane;
     if(clipDir=="x-axis"){
        pnormal = new THREE.Vector3(0,1,0);
       if(eje>0){
          offset=offset*-1;
          }
    pcoplanar = new THREE.Vector3(0,offset,0);
        }else if(clipDir=="y-axis"){
         pnormal = new THREE.Vector3(1,0,0); 
                 if(eje<0){
          offset=offset*-1;
          }
    pcoplanar = new THREE.Vector3(offset,0,0);
        }else if(clipDir=="z-axis"){
         pnormal = new THREE.Vector3(0,0,1); 
                 if(eje>0){
          offset=offset*-1;
          }
    pcoplanar = new THREE.Vector3(0,0,offset);
        }
    clippingPlane = new THREE.Plane(new THREE.Vector3(0,eje,0),offset); 
    clippingPlane.setFromNormalAndCoplanarPoint(pnormal,pcoplanar);
    const planeHelper = new THREE.PlaneHelper(clippingPlane, 10, 0xff00ff); 
    this.el.object3D.add(planeHelper);
  }
});














