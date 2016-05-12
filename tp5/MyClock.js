/**
 * MyCylinder
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	this.clock = new MyPrism(this.scene, slices, stacks);
	this.slices = slices;
	this.stacks = stacks;
	this.secPointer = new MyClockHand(this.scene,0.02,0.6,1);
	this.minPointer = new MyClockHand(this.scene, 0.02,0.4,1);
	this.hoursPointer = new MyClockHand(this.scene, 0.02,0.3,1);
	
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;


MyClock.prototype.display = function(){
	this.scene.pushMatrix(); 
	this.scene.translate(7.2,7.25,0);
	this.scene.scale(0.75,0.75,0.25);
	this.clock.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); 
	this.scene.blackcolor.apply();
	this.secPointer.display();
	this.scene.popMatrix();

	this.scene.pushMatrix(); 
	this.scene.bluecolor.apply();
	this.minPointer.display();
	this.scene.popMatrix();


	this.scene.pushMatrix(); 
	this.scene.yellowcolor.apply();
	this.hoursPointer.display();
	this.scene.popMatrix();
};

MyClock.prototype.update = function(currTime){
	var seconds = (currTime/1000) %60;
	this.secPointer.setAngle((seconds * 360)/60);

	var minutes = ((currTime/1000) /60) %60;
	this.minPointer.setAngle((minutes* 360)/60);
	
	var hours = (((currTime/1000)/60)/60) %	12 +1;
	this.hoursPointer.setAngle((hours*360)/ 12);

};