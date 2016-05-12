/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene) {
 	CGFobject.call(this,scene);
 	this.ang = Math.PI/2;
 	this.x = 0;
 	this.y = 0;
 	this.ynormal = this.y;
 	this.z = 0;

    this.heliceanglefront = Math.PI;
    this.heliceangleback = Math.PI;
    this.heliceangleright = Math.PI;
    this.heliceangleleft = Math.PI;
    this.movementType = 0;

    this.inclination =0;
    this.rotate = true;


    this.velSlow = 0.2 * (2 * Math.PI);
    this.velNormal = 1 * (2 * Math.PI);
    this.velFast = 10 * (2 * Math.PI);

    this.helice1 = new MyCylinder(this.scene, 8, 1);
    this.helice2 = new MyCylinder(this.scene, 8, 1);
    this.pontahelice1frente = new MyCylinder(this.scene, 8, 1);
    this.pontahelice1tras = new MyCylinder(this.scene, 8, 1);
    this.pontahelice2frente = new MyCylinder(this.scene, 8, 1);
    this.pontahelice2tras = new MyCylinder(this.scene, 8, 1);
    this.centrohelices = new MyLamp(this.scene, 8,1);
    this.base = new MyUnitCubeQuad(this.scene);
    this.pe1 = new MyUnitCubeQuad(this.scene);
    this.pe2 = new MyUnitCubeQuad(this.scene);
    this.stripe1 = new MyStripes(this.scene,8,1); 
    this.stripe2 = new MyStripes(this.scene,8,1);
    this.stripe3 = new MyStripes(this.scene,8,1);
    this.stripe4 = new MyStripes(this.scene,8,1);
    this.heliceroda1 = new MyCylinder(this.scene, 8, 1);
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function()
 {
     this.scene.translate(this.x,this.y,this.z);
     this.scene.rotate(this.ang, 0, 1, 0);
     this.scene.rotate(this.inclination, 1,0,0);
    
  

   //Helice horizontal
   this.scene.pushMatrix(); 
   this.scene.translate(-1,0,0);
   this.scene.rotate(Math.PI/2, 0,1,0);
   this.scene.scale(0.1,0.1,2);
   this.helice1.display();
   this.scene.popMatrix(); 

   //Helice vertical
   this.scene.pushMatrix(); 
   this.scene.translate(0,0,-1);
   this.scene.scale(0.1,0.1,2);
   this.helice2.display();
   this.scene.popMatrix(); 
  
  //Ponta helice1frente
   
   this.scene.pushMatrix(); 
   this.scene.translate(-0.90,0,0);
   this.scene.rotate(Math.PI/2, 1,0,0);
   this.scene.scale(0.1,0.1,0.2);
   this.pontahelice1frente.display();
   this.scene.popMatrix(); 
  
  //Ponta helice1tras
   this.scene.pushMatrix(); 
   this.scene.translate(0.90,0,0);
   this.scene.rotate(Math.PI/2, 1,0,0);
   this.scene.scale(0.1,0.1,0.2);
   this.pontahelice1tras.display();
   this.scene.popMatrix(); 
  
  //Ponta helice1frente
   this.scene.pushMatrix(); 
   this.scene.translate(0,0,-0.90);
   this.scene.rotate(Math.PI/2, 1,0,0);
   this.scene.scale(0.1,0.1,0.2);
   this.pontahelice2frente.display();
   this.scene.popMatrix();

 //Ponta helice2tras
   this.scene.pushMatrix(); 
   this.scene.translate(0,0,0.90);
   this.scene.rotate(Math.PI/2, 1,0,0);
   this.scene.scale(0.1,0.1,0.2);
   this.pontahelice2tras.display();
   this.scene.popMatrix(); 

 //Centro helices
   this.scene.pushMatrix(); 
    this.scene.translate(0,0,0);
   this.scene.rotate(-Math.PI/2, 1,0,0);
   this.scene.scale(0.5,0.5,0.4);
   this.centrohelices.display();
   this.scene.popMatrix(); 
  
       //Base pe esquerdo
   this.scene.pushMatrix(); 
   this.scene.translate(-0.75,-0.5,0);
   this.scene.rotate(-Math.PI/2, 1,0,0);
   this.scene.scale(0.2,1,0.2);
   this.pe1.display();
   this.scene.popMatrix(); 

      //Base pe direito
   this.scene.pushMatrix(); 
   this.scene.translate(0.75,-0.5,0);
   this.scene.rotate(-Math.PI/2, 1,0,0);
   this.scene.scale(0.2,1,0.2);
   this.pe1.display();
   this.scene.popMatrix(); 

      //Stripe 1
   this.scene.pushMatrix(); 
   this.scene.translate(0.4,-0.55,+0.1);
   this.scene.rotate(Math.PI/6, 0,0,1);
   this.scene.scale(0.3,0.6,0.1);
   this.stripe1.display();
   this.scene.popMatrix(); 

     //Stripe 2
   this.scene.pushMatrix(); 
   this.scene.translate(+0.4,-0.55,-0.2);
   this.scene.rotate(Math.PI/6, 0,0,1);
   this.scene.scale(0.3,0.6,0.1);
   this.stripe2.display();
   this.scene.popMatrix(); 

  //Stripe 3
   this.scene.pushMatrix();
   this.scene.translate(-0.1,-0.2,+0.1);
   this.scene.rotate(Math.PI/6, 0,0,1);
   this.scene.rotate(Math.PI/2, 0,0,1);
   this.scene.scale(0.3,0.6,0.1);
   this.stripe3.display();
   this.scene.popMatrix(); 

  //Stripe 4
   this.scene.pushMatrix(); 
   this.scene.translate(-0.1,-0.2,-0.2);
   this.scene.rotate(Math.PI/6, 0,0,1);
   this.scene.rotate(Math.PI/2, 0,0,1);
   this.scene.scale(0.3,0.6,0.1);
   this.stripe4.display();
   this.scene.popMatrix(); 

 

    //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(0,0.1,1);
   this.scene.rotate(this.heliceanglefront,0,1,0);
   this.scene.rotate(Math.PI/2, 0,0,1);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 
 

  //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(0,0.1,1);
   this.scene.rotate(Math.PI/2, 0,1,0);
   this.scene.rotate(this.heliceanglefront,0,1,0);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 


         //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(0,0.1,-1);
   this.scene.rotate(this.heliceangleback,0,1,0);
   this.scene.rotate(Math.PI/2, 0,0,1);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 

     //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(0,0.1,-1);
   this.scene.rotate(Math.PI/2, 0,1,0); 
   this.scene.rotate(this.heliceangleback,0,1,0);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 


      //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(-1,0.1,0);
   this.scene.rotate(-this.heliceangleright,0,1,0);
   this.scene.rotate(Math.PI/2, 0,0,1);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 
        //Helices rodar

   this.scene.pushMatrix(); 
   this.scene.translate(-1,+0.1,0);
   this.scene.rotate(Math.PI/2, 0,1,0);
   this.scene.rotate(-this.heliceangleright,0,1,0);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 


        //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(1,0.1,0);
   this.scene.rotate(-this.heliceangleleft,0,1,0);
   this.scene.rotate(Math.PI/2, 0,1,0);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 


           //Helices rodar
   this.scene.pushMatrix(); 
   this.scene.translate(1,0.1,0);
   this.scene.rotate(-this.heliceangleleft,0,1,0);
   this.scene.scale(0.02,0.02,0.4);
   this.scene.rotate(Math.PI/2, 0,0,1);   
   this.scene.translate(0,0,-0.5);
   this.heliceroda1.display();
   this.scene.popMatrix(); 



 };
 
 MyDrone.prototype.rotation = function(radang)
 {
   this.ang += radang;
   this.rotate = true;
 };

  MyDrone.prototype.inclinate = function(inclination)
  {
    this.inclination = inclination;
  };

  MyDrone.prototype.height = function(y)
 {
   this.y += y;
 };

   MyDrone.prototype.transl = function(val)
 {

   this.x += (Math.sin(this.ang)*val);
   this.z += (Math.cos(this.ang)*val);
   if(val > 0)
   {
    this.inclination = Math.PI/6;
    this.movementType = 1;
   }
   else
   {
    this.inclination = -Math.PI/6;
    this.movementType = 2;
   }
 };


 MyDrone.prototype.setInclination = function(inclination)
  {
    this.inclination= inclination;
  }; 

  MyDrone.prototype.setRotation = function(rotation)
  {
    this.rotate = rotation;
  }; 


 MyDrone.prototype.update = function(currTime, speed)
 {
   this.currTime = currTime/1000;
   this.speed = speed;
   if(this.movementType == 0)
   {
      this.heliceanglefront += this.speed * this.velNormal * this.currTime;
      this.heliceangleback += this.speed * this.velNormal * this.currTime;
      this.heliceangleleft += this.speed * this.velNormal * this.currTime;
      this.heliceangleright += this.speed * this.velNormal * this.currTime;
   }
   if(this.movementType == 1)
   {
      this.heliceanglefront += this.speed * this.velSlow * this.currTime;
      this.heliceangleback += this.speed * this.velFast * this.currTime;
       this.heliceangleleft += this.speed * this.velNormal * this.currTime;
      this.heliceangleright += this.speed * this.velNormal * this.currTime;
   }  
   if(this.movementType == 2)
   {
      this.heliceanglefront += this.speed * this.velFast * this.currTime;
      this.heliceangleback += this.speed *this.velSlow * this.currTime;
       this.heliceangleleft += this.speed * this.velNormal * this.currTime;
      this.heliceangleright += this.speed * this.velNormal * this.currTime;

   }

   if(this.rotate == true)
   {
      this.heliceangleleft += speed * this.velFast * this.currTime;
      this.heliceangleright += speed * this.velFast * this.currTime;
       this.heliceanglefront += this.speed * this.velFast * this.currTime;
      this.heliceangleback += this.speed *this.velSlow * this.currTime;
   }


 };

 MyDrone.prototype.staticMovement = function()
 {
   this.movementType = 0;
   this.rotate = false;
 }
