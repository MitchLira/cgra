var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	
	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftwall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this, 0,12,0,10);
	this.clock = new MyClock(this, 12,1);
	this.clockTop = new MyClockTop(this,12,1);
	this.cylinder = new MyCylinder(this, 8,20);
	this.prism = new MyPrism(this, 8,20);
	this.drone = new MyDrone(this);


	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	// this.materialA.setSpecular(0.2,0.2,0.2,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);
//	this.materialA.setShininess(10);



	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(100);

	this.materialprisms = new CGFappearance(this);
	this.materialprisms.setAmbient(0.1,0.2,0.3,1);
	this.materialprisms.setDiffuse(0.1,0.2,0.3,1);
	this.materialprisms.setSpecular(0,0,0,1);	
	this.materialprisms.setShininess(1);

	this.blackcolor = new CGFappearance(this);
	this.blackcolor.setAmbient(0,0,0,1);
	this.blackcolor.setSpecular(0,0,0,1);
	this.blackcolor.setDiffuse(0,0,0,1);
	this.blackcolor.setShininess(1);

	this.whitecolor = new CGFappearance(this);
	this.whitecolor.setAmbient(1,1,1,1);
	this.whitecolor.setSpecular(1,1,1,1);
	this.whitecolor.setDiffuse(1,1,1,0.5);
	this.whitecolor.setShininess(1);

	this.bluecolor = new CGFappearance(this);
	this.bluecolor.setAmbient(0,0,1,1);
	this.bluecolor.setSpecular(0,0,1,1);
	this.bluecolor.setDiffuse(0,0,1,1);
	this.bluecolor.setShininess(1);

	this.yellowcolor = new CGFappearance(this);
	this.yellowcolor.setAmbient(1,1,0,1);
	this.yellowcolor.setSpecular(1,1,0,1);
	this.yellowcolor.setDiffuse(1,1,0,1);
	this.yellowcolor.setShininess(1);


	//textura mesa
	this. tableAppearance = new CGFappearance(this);
	this. tableAppearance.setShininess(1);
	this.tableAppearance.loadTexture("\\resources\\images\\table.png");



	//textura chao
	this. floorAppearance = new CGFappearance(this);
	this. floorAppearance.setShininess(1);
	this.floorAppearance.loadTexture("\\resources\\images\\floor.png");
	

	//textura quadro
	this. boardAppearance = new CGFappearance(this);
	this. boardAppearance.setShininess(1);
	this.boardAppearance.loadTexture("\\resources\\images\\board.png");
	
	//textura slides
	this. slidesAppearance = new CGFappearance(this);
	this. slidesAppearance.setShininess(1);
	this.slidesAppearance.loadTexture("\\resources\\images\\slides.png");
	

	//textura janela
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setShininess(1);
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.windowAppearance.loadTexture("\\resources\\images\\window.png");
	

	//textura parede 
	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.setShininess(1);
	//this.wallAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.wallAppearance.loadTexture("\\resources\\images\\tijolos.png");

	//textura parede 
	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setShininess(1);
	this.clockAppearance.loadTexture("\\resources\\images\\clock.png");
	

	
	this.Light1 = true;
	this.Light2 = true;
	this.Light3 = false;
	this.Clock = true;
	this.speed = 1;
	


	this.setUpdatePeriod(100);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 0);
	
	// Positions for four lights

	

	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0,1.0,0,1.0);


	this.lights[1].setPosition(10, 6, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);


	this.lights[2].setPosition(7.5, 5, 5, 4);
	this.lights[2].setVisible(true);
	this.lights[2].setAmbient(1, 1, 1, 0.3);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0,1.0,0,1.0);
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
	{
		this.lights[i].update();
	}
	if(this.Light1 == true)
	 	this.lights[0].enable();
	else
		this.lights[0].disable();
	
	if(this.Light2 == true)
	 	this.lights[1].enable();
	else
		this.lights[1].disable();

	if(this.Light3 == true)
	 	this.lights[2].enable();
	else
		this.lights[2].disable();


}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);


	
	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftwall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallAppearance.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(4, 0, 8);
		this. tableAppearance.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this. tableAppearance.apply();
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	this.slidesAppearance.apply();
	this.boardB.display();
	this.popMatrix();
	
	this.pushMatrix(); 
	this.translate(1,0,15);
	this.rotate(-Math.PI/2,1,0,0);
	this.materialprisms.apply();
	this.scale(1,1,8);
	this.cylinder.display();
	this.popMatrix();

	this.pushMatrix(); 
	this.translate(14,0,1);
	this.rotate(-Math.PI/2,1,0,0);
	this.materialprisms.apply();
	this.scale(1,1,8);
	this.prism.display();
	this.popMatrix();

	this.pushMatrix(); 
	this.materialDefault.apply();
	this.clock.display();
	this.popMatrix();

	this.pushMatrix(); 
	this.translate(7.2,7.25,0);
	this.clockAppearance.apply();
	this.scale(0.75,0.75,0.25);
	this.clockTop.display();
	this.popMatrix();

	this.pushMatrix();
	this.materialDefault.apply();
	this.drone.display();
	this.popMatrix();

		
	
	// ---- END Primitive drawing section
	

};

LightingScene.prototype.update = function(currTime){
	
		this.drone.update(currTime,this.speed);
	
	if(this.Clock == true)
		this.clock.update(currTime);
	
};

LightingScene.prototype.Controls = function()
{


};
