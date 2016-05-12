/**
 * MyPrism
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

MyLamp.prototype.initBuffers = function() {

	
	this.vertices = new Array();
	this.indices = new Array();
	this.normals = new Array();

	
	var hor_ang = (2*Math.PI) / this.slices;
	var ver_ang = Math.PI / (2*this.stacks);
	var rect = Math.PI / 2;

	for (i = 0; i < this.slices; i++) {
		this.vertices.push(Math.sin(rect)*Math.cos(i*hor_ang), Math.sin(rect)*Math.sin(i*hor_ang), Math.cos(rect));
		this.normals.push(Math.sin(rect)*Math.cos(i*hor_ang), Math.sin(rect)*Math.sin(i*hor_ang), Math.cos(rect));
	}
	

	var top = this.slices;
	var bottom = 0;

	for (k = 1; k <= this.stacks; k++) {

		this.vertices.push(Math.sin(rect - k*ver_ang)*Math.cos(0), Math.sin(rect - k*ver_ang)*Math.sin(0), Math.cos(rect - k*ver_ang));				
		this.normals.push(Math.sin(rect - k*ver_ang)*Math.cos(0), Math.sin(rect - k*ver_ang)*Math.sin(0), Math.cos(rect - k*ver_ang));	

		for (i = 1; i < this.slices; i++) {

			this.vertices.push(Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang), Math.cos(rect - k*ver_ang));
			this.normals.push(Math.sin(rect - k*ver_ang)*Math.cos(i*hor_ang), Math.sin(rect - k*ver_ang)*Math.sin(i*hor_ang), Math.cos(rect - k*ver_ang));

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

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
