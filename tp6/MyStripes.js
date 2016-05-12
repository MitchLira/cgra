/**
 * MyCylinder
 * @constructor
 */
 function MyStripes(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.patchSlices = 1/this.slices;

 	this.initBuffers();
 };

 MyStripes.prototype = Object.create(CGFobject.prototype);
 MyStripes.prototype.constructor = MyStripes;

 MyStripes.prototype.initBuffers = function() {

	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();
	this.texCoords= new Array();
 
	
	var sCoord = 0;
	var tCoord = 0;
	var ang = (Math.PI/2) / this.slices;

	for (i = 0; i < this.slices; i++) {
		this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), 0);
		this.normals.push(Math.cos(i*ang), Math.sin(i*ang), 0.0);
		this.texCoords.push(sCoord, tCoord);
		sCoord += this.patchSlices;
		}
	

	var top = this.slices;
	var bottom = 0;

	for (k = 1; k <= this.stacks; k++) {
		this.vertices.push(Math.cos(0), Math.sin(0), k/this.stacks);				
		this.normals.push(Math.cos(0), Math.sin(0), 0.0);
		tCoord += this.patchStacks;
		sCoord = 0;
		 this.texCoords.push(sCoord, tCoord);
		for (i = 1; i < this.slices; i++) {

			this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), k/this.stacks);
			this.normals.push(Math.cos(i*ang), Math.sin(i*ang), 0.0);
			

			sCoord += this.patchSlices;
			this.texCoords.push(sCoord, tCoord);

			this.indices.push(top);
			this.indices.push(bottom+1);
			this.indices.push(top+1);
			this.indices.push(bottom);
			this.indices.push(bottom+1);
			this.indices.push(top);

			top++;
			bottom++;
		}
		top++;
		bottom++;
	
		this.indices.push(top - 1, bottom - this.slices, top - this.slices);
		this.indices.push(bottom - 1, bottom - this.slices, top - 1);
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };