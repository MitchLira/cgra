/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	var n = 0;
 	
 	var angle = 2*Math.PI/this.slices;

 	for(var j=0; j < this.stacks; j++){
 		for(var i = 0; i < this.slices; i++)
 		{
 			var x = Math.cos(i*angle);
 			var y = Math.sin(i*angle);
	
 			this.vertices.push(x,y,(j+1)*(1/this.stacks));
 			this.vertices.push(x,y,(j)*(1/this.stacks));
			this.normals.push(Math.cos((i*angle+(i+1)*angle)/2),Math.sin((i*angle+(i+1)*angle)/2),0.0);
			this.normals.push(Math.cos((i*angle+(i+1)*angle)/2),Math.sin((i*angle+(i+1)*angle)/2),0.0);
		
 			x = Math.cos((i+1)*angle);
 			y = Math.sin((i+1)*angle);

 			this.vertices.push(x,y,(j+1)*(1/this.stacks));
 			this.vertices.push(x,y,(j)*(1/this.stacks));
			this.normals.push(Math.cos(((i+1)*angle+(i+1)*angle)/2),Math.sin(((i+1)*angle+(i+1)*angle)/2),0.0);
			this.normals.push(Math.cos(((i+1)*angle+(i+1)*angle)/2),Math.sin(((i+1)*angle+(i+1)*angle)/2),0.0);

 			this.indices.push(n++);
 			this.indices.push(n++);
 			this.indices.push(n++);
 			this.indices.push(n--);
 			this.indices.push(n--);
 			this.indices.push(n++);
 			n+=2;
  		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
