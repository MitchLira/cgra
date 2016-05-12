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
    var init = 0;
 	var angle = 2*Math.PI/this.slices;
    for(var j =0; j < this.stacks; j++)
    {
   		for(var i =0; i < this.slices; i++)
    	{
    		var x = Math.cos(init);
    		var y = Math.sin(init);
	
    		this.vertices.push(x,y,(j+1)*(1/this.stacks));
    		this.normals.push(x,y,0);
    		this.vertices.push(x,y,(j)*(1/this.stacks));
    		this.normals.push(x,y,0);
    		init += angle;
    		x = Math.cos(init);
   		 	y = Math.sin(init);
     	  	this.vertices.push(x,y,(j+1)*(1/this.stacks));
      	 	this.normals.push(x,y,0);
    		this.vertices.push(x,y,(j)*(1/this.stacks));
    		this.normals.push(x,y,0);
	
    		this.indices.push(n++);
    		this.indices.push(n++);
    		this.indices.push(n++);

    		this.indices.push(n--);
    		this.indices.push(n--);
    		this.indices.push(n++);
    		n += 2;
    		}
    }


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
