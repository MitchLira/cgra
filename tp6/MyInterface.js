/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();
	
	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'Controls');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'Light1');
	group.add(this.scene, 'Light2');
	group.add(this.scene, 'Light3');
	var clockgroup = this.gui.addFolder("Clock");
	clockgroup.add(this.scene, 'Clock');

	

	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters	


	this.gui.add(this.scene, 'speed', 0, 2);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			this.scene.drone.rotation(Math.PI/9);
			break;
		case (68):	//D
			this.scene.drone.rotation(-Math.PI/9);
			break;
		case (87):	//W
			this.scene.drone.transl(0.1);
			break;
		case(83):	//S
			this.scene.drone.transl(-0.1);
			break;		
		case(73):	//I
			this.scene.drone.height(0.1);
			break;		
		case(74	):	//J
			this.scene.drone.height(-0.1);
			break;		
	};


	MyInterface.prototype.setAppearances = function(event) {
		
	};
	MyInterface.prototype.processKeyUp = function(event)
	{
		
		if(event.keyCode == 87 ||  event.keyCode == 83)
			this.scene.drone.setInclination(0);
		if(event.keyCode == 65 ||  event.keyCode == 68)
			this.scene.drone.setRotation(false);		
	this.scene.drone.staticMovement();
	};
};
