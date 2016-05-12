/**
 * MyCylinder
 * @constructor
 */
 function MyClockHand(scene, xscale, yscale, zscale) {
 	CGFobject.call(this,scene);
	
	this.pointer = new MyQuad(scene,0,1,0,1);
	this.radangle = 0;
	this.xscale = xscale;
	this.yscale = yscale;
	this.zscale = zscale;

 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

  MyClockHand.prototype.setAngle = function(angle) {
 	this.radangle = ((-Math.PI*angle)/180);
 };

 MyClockHand.prototype.display = function() {
 	this.scene.translate(7.2,7.25,0.3);
	this.scene.rotate(this.radangle, 0,0,1);
	this.scene.scale(this.xscale, this.yscale,this.zscale);
	this.scene.translate(0,0.5,0);
 	this.pointer.display();
 };

