/**
 * MyCylinder
 * @constructor
 */
 function MyClockTop(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = 12;
	this.stacks = 1;

 	this.initBuffers();
 };

 MyClockTop.prototype = Object.create(CGFobject.prototype);
 MyClockTop.prototype.constructor = MyClockTop;

 MyClockTop.prototype.initBuffers = function() {

	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords = new Array();
	
	var ang = (2*Math.PI) / this.slices;
	
	var indice = 1;
	this.vertices.push(0,0,1); // vertice origem 
	this.normals.push(0,0,1);
	this.texCoords.push(0.5,0.5);

	for (i = 0; i <= this.slices; i++) {
		var s = Math.cos(i*ang);
		var t= Math.sin(i* ang);
		this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 1);
		this.normals.push(0,0,1);
		this.texCoords.push(0.5 + 0.5*s, 0.5-0.5*t);
		
		if(i> 1)
		{
		this.indices.push(indice++,indice,0);
		}
	}
	this.indices.push(indice++, indice, 0);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
