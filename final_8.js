// CPCS 324 Algorithms & Data Structures 2
// Graph data structure starter - Transitive Closure Package
// 2019, Dr. Muhammad Al-Hashimi

// -----------------------------------------------------------------------
// simple graph object with linked-list edge implementation and minimal fields
// extra vertex and edge member fields and methods to be added later as needed
//


var _v = [], _e = [];   // note naming conventions in upload guide


// -----------------------------------------------------------------------
function _main()   
{
        
	var g= new Graph();


 
	// set input graph properties (label, directed etc.)
	 g.label="Exercise 8.4: 7 (Levitin, 3rd edition)";
	 g.digraph = true;
	// use global input arrays _v and _e to initialize its internal data structures
 
	g.read_graph(_v,_e);

	// use print_graph() method to check graph
 
	g.print_graph();
	// report connectivity status if available
	g.topoSearch("dfs");
	
	

	
	g.topoSearch("bfs");
    document.write("<p>bfs_order: ", g.bfs_out);
    document.write("<p>", g. componentInfoImpl());
	g.DfsTC();
	document.write("<p> TC matrix by DFS:<br>");
	for (var i = 0; i < g.dfsTC.length; i++)
	{
		document.write(g.dfsTC[i], "<br>");
	}
	document.write("<p>TC matrix by Warshall-Floyd:<br>");
	g.warshallFloyd();
	for (var i = 0; i < g.warshallTC.length; i++)
	{
		document.write(g.warshallTC[i], "<br>");
	}
	
	//check if the graph is DAG (directed acyclic graph)
	document.write("<p>DAG: ", g.isDAG(), "</p>");
	
	//output floyed-distance matrix
	g.warshallFloyd();
	document.write("<p>Distance matrix<br>");

	for (var i = 0; i < g.floydD.length; i++)
	{
		document.write(g.floydD[i], "<br>");
	}
}



// -----------------------------------------------------------------------

function Vertex(v)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section
	
	// base property fields from P1M1
	


	
	// base member methods from P1M1
   
		
	// --------------------
	// more student fields next
	this.label = v.label;          
	this.visit = false;            
	this.adjacent = new List(); 
	
	// --------------------
	// more student methods next
	this.adjacentById = adjacentById;  
}

// -----------------------------------------------------------------------

function Edge(vert_i,weight)
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section

	
	// base property fields
	
	this.target_v = vert_i;  // ... complete from P1M1 (remove comment)
	this.weight=weight;
	
	// base member methods

	

	// --------------------
	// more student fields next
	
	
	// --------------------
	// more student methods next

}


// -----------------------------------------------------------------------

function Graph()
{
	// published docs section (ref. assignment page)
	// for this section, strip line comments
	// no JSDOC comments in this section
	
	
	// base property fields

	this.vert = [];
	this.nv = 0;  // ... etc. from P1M1 (remove)
	this.vert = [];								// vertex list (an array of Vertex objects)
    this.nv = 0;								// number of vertices
    this.ne = 0;								// number of edges
    this.digraph = false;						// true if digraph, false otherwise (default undirected)
    this.weighted = false;						// true if weighted , false otherwise (default unweighted )
    this.dfs_push = [];							// DFS order output
    this.bfs_out = [];					     	// BFS order output
    this.label = "";							// identification string to label graph
    this.connectedComp = 0;						// number of connected comps set by DFS; 0 (default) for no info
    this.adjMatrix = [];						// graph adjacency matrix to be created on demand
	

	// base member methods
	
	
	this.read_graph = better_input;  // ... (complete next)
	this.print_graph = better_output; // better printer function
    this.list_vert = list_vert;
    this.makeAdjMatrix = makeAdjMatrix;
   this.add_edge = add_edge;  
   this.add_edge2 = add_edge2;        // replace (don't change old .add_edge)
   this.dfs = dfs;                  // DFS  coannected component
   this.bfs = bfs;                  // BFS a connected component
   this.topoSearch=topoSearch; 
   this.componentInfoImpl=componentInfoImpl;
	
	// --------------------
	// more student fields next
	
	
	// --------------------
	// more student methods next 

	// transitive closure package (requirements in line comments, to be removed and replaced by JSDOCs) 

		/**
		Transitive closure matrix ,dfined after called DfsTC method,,Stores output of last  DfsTC call
		@default [ ]
	*/
	this.dfsTC = [];
	/**
		Transitive closure matrix by using warshall algorithm ,dfined after called warshallFloyd method,,Stores output of last  warshallFloyd call
		@default [ ]
	*/
	this.warshallTC = [];
	/**
		Distance matrix of shortest paths,,dfined after called warshallFloyd method,Stores output of last  warshallFloyd call
		@default [ ]
	*/
	this.floydD = [];

	
	
		/**
		Check if there is a path between two vertices v_i, v_j in digraph
		@method
	*/
	this.hasPath =  hasPathImpl;
	/**
		Get the distance of shortest path between v_i, v_j in weighted graph
		@method
	*/
	this.shortestPath = shortestPathImpl;
	/**
		Test if the diagraph is DAG 
		@method
	*/
	this.isDAG = isDAGImpl;
	/**
		Find TC matrix for unweighed digraph, and Find distance matrix for  weighted digraph
		@method
	*/
	this.warshallFloyd = warshallFloydImpl;
	/**
		Find TC matrix based on dfs 
		@method
	*/
	this.DfsTC = dfsTCImpl;	

}


// -----------------------------------------------------------------------
// functions used by methods of Graph and ancillary objects

// -----------------------------------------------------------------------
// begin student code section
// -----------------------------------------------------------------------

// transitive closure package 
/**
	Find TC based on dfs 
	@author Bayan Tadbier
	@implements Graph#dfsTC
*/
function dfsTCImpl(){
    // for each vertex
    for (var i = 0; i < this.nv; i++)
    {
        //process vertex v
        var v = this.vert[i];

        // mark all vertices unvisited
        for (var h = 0; h < this.nv; h++)
        {
            this.vert[h].visit = false;
        }

      // intitiate the dfsTC matrix by 0
        this.dfsTC[i] = [];
        for (var j = 0; j < this.nv; j++)
            this.dfsTC[i][j] = 0;
   
        var w = v.adjacentById();
        for (var n = 0; n < w.length; n++)
            this.dfs(w[n]); 

        for (var k = 0; k < this.nv; k++)
        {
            //put  in TC if vertix visited by dfs search
            if (this.vert[k].visit)
            {
                this.dfsTC[i][k] = 1;
            }
        }
    }
}



/**
  Check if there is a path between two vertices using their IDs
  @author Bayan Tadbier
  @implements Graph#hasPath
  @param {integer} u_i Source vertex id
  @param {integer} v_i target vertex id
  @returns {boolean} True if there is path between u_i v_i
*/
function hasPathImpl(u_i, v_i)
{
  return this.warshallTC[u_i][v_i] == 1? true : false;
}

/**
  Return the shortest path between two vertices using their IDs
  @author Bayan Tadbier
  @implements Graph#shortestPath
  @param {number} u_i Source vertex id
  @param {number} v_i target vertex id
  @returns {integer} The shortest path between u_i v_i
*/
function shortestPathImpl(u_i, v_i)
{
  return this.floydD[u_i][v_i];
}

/**
  Check if the given graph is Directed Acyclic Graph
  @author Bayan Tadbier
  @implements Graph#isDAG
  @returns {boolean} True if diagraph is DAG
*/
function isDAGImpl()
{
  for (var i = 0, j = 0; i < this.warshallTC.length && j < this.warshallTC.length; i++, j++)
      if (this.hasPath(i, j))
          return false;
  return true;
}

/**
  Finds the shortest distance from one vertex to all the other vertices
  @author Bayan Tadbier
  @implements Graph#warshallFloyd
*/
function warshallFloydImpl()
{
  //find aAdj Matrix using makeAdjMatrix method
  this.makeAdjMatrix();
  for (var i = 0; i < this.adjMatrix.length; i++)
  {
      this.warshallTC[i] = this.adjMatrix[i].slice();
  }
 //change the wieght in adj matrix  to (o/1) in warshall matrix and put it as initial valeues
for (var i = 0; i < this.warshallTC.length; i++)
  {
      for (var j = 0; j< this.warshallTC.length; j++)
      if(this.adjMatrix[i][j]==0){
      this.warshallTC[i][j] = 0;
      }
      else {
          this.warshallTC[i][j] =1 ;   
      }
  }
 


  
  //inslaise  floydD matriices
for (var i = 0; i < this.adjMatrix.length; i++)
  {
      //  returns the row elements from  adj Matrix into floydD Matrix
     
      this.floydD[i] = this.adjMatrix[i].slice();
      for (var j = 0; j < this.nv; j++)
      {
          if (this.adjMatrix[i][j] == 0 &&  i!=j)
          {
              this.floydD[i][j] = Infinity;
          }
      }
  }

  // warshall and Floyed algorithm
  for (var k = 0; k < this.floydD.length; k++)
  {
      for (var i = 0; i < this.floydD.length; i++)
      {
          for (var j = 0; j < this.floydD.length; j++)
          {
              this.floydD[i][j] = Math.min(this.floydD[i][j], (this.floydD[i][k] + this.floydD[k][j]));
              this.warshallTC[i][j] = this.warshallTC[i][j] || (this.warshallTC[i][k] && this.warshallTC[k][j]);
          }
      }
  }

  //make Infinity destance as 0
for (var i = 0; i < this.floydD.length; i++) {
    for (var j = 0; j < this.floydD.length; j++)  { 
        if (this.floydD[i][j] == Infinity)         
           this.floydD[i][j] = 0;
          }   
  } 
         

}





// -----------------------------------------------------------------------
// published docs section (ref. assignment page)
// use starter6-based P1M1 code as-is (fixes/improvements OK)
// no JSDOC comments in this section (docs already published)
// -----------------------------------------------------------------------

function list_vert()
{
   var i, v;  // local vars
   for (i=0; i < this.nv; i++)
   {
      v = this.vert[i];
      document.write( "VERTEX: ", i, " {", v.label, "} - VISIT: ", v.visit,
         " - ADJACENCY: ", v.adjacentById(), "<br>" );
   }
}

// --------------------
function better_input(v,e)
{
// set vertex and edge count fields
this.nv = v.length;
this.ne = e.length;


// input vertices into internal vertex array
for (var i = 0; i < this.nv; i++)
{
    this.vert[i] = new Vertex(v[i]);
}

 if( e[0].w === undefined ){
   this.weighted=false;

 }
 else{
   this.weighted =true;

 }
 for (var h = 0; h < this.ne; h++)
 {
     this.add_edge2(e[h].u, e[h].v,e[h].w);
 
 }
// input vertex pairs from edge list input array
// remember to pass vertex ids to add_edge()



// double edge count if graph undirected
if (!this.digraph)
{
    this.ne = e.length * 2;
}
}




// --------------------
function better_output()
{
   document.write("<p>GRAPH {",this.label, "} ",  this.weighted ?"":"UN", "WEIGHTED- ",this.digraph?"":"UN", "DIRECTED - ", this.nv, " VERTICES, ",
      this.ne, " EDGES:</p>");
      document.write("<p>", this. componentInfoImpl(),"<p>");
   // list vertices
   this.list_vert();
}

// --------------------
function add_edge(u_i,v_i)   // obsolete, replaced by add_edge2() below
{
   var u = this.vert[u_i];
   var v = this.vert[v_i];


   // insert (u,v), i.e., insert v (by id) in adjacency list of u

   u.adjacent.insert(v_i);


   // insert (v,u) if undirected graph (repeat above but reverse vertex order)

   if (!this.digraph)
   {
       v.adjacent.insert(u_i);
   }
}

// --------------------
function dfs(v_i)
{
 // get landing vert by id then process
 var v = this.vert[v_i];
 v.visit = true;
 length_push = this.dfs_push.length;
 this.dfs_push[length_push] = v_i;


 // recursively traverse unvisited adjacent vertices
 var w = v.adjacentById();

 for (var j = 0; j < w.length; j++)
 {
     if (!this.vert[w[j]].visit)
     {
         this.dfs(w[j]);
     }
 }

}

// --------------------
function bfs(v_i)
{
    // get vertex v by its id
    var v = this.vert[v_i];
    v.visit = true;




    // initialize queue with v
    var q = new Queue();
    q.enqueue(v_i);

    // while queue not empty
    while (!q.isEmpty())
    {
        // dequeue and process a vertex, u
        var u_i = q.dequeue();

        var u = this.vert[u_i];
        bfs_out_length = this.bfs_out.length;
        this.bfs_out[bfs_out_length] = u_i;
        // queue all unvisited vertices adjacent to u 
        var w = u.adjacentById();
        for (var g = 0; g < w.length; g++)
        {
            if (!this.vert[w[g]].visit)
            {
                this.vert[w[g]].visit = true;

                q.enqueue(w[g]);


            }
        }
    }
}



// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// --- begin student code section ----------------------------------------

function adjacentById()
{
var adj_traverse =this.adjacent.traverse();
var adj_traversal_array = [];
for(var i=0;i<adj_traverse.length;i++){
   adj_traversal_array[i]=adj_traverse[i].target_v;
}
return adj_traversal_array ;
}

// --------------------
function add_edge2(u_i,v_i,w)
{
    // fetch vertices using their id, where u: edge source vertex, v: target vertex
   var v=this.vert[v_i];
   var u=this.vert[u_i];


   // insert (u,v), i.e., insert v in adjacency list of u
   // (first create edge object using v_i as target, then pass object)
   var v_edge = new Edge(v_i);

   if(!(w === undefined)){
      
      v_edge.weight = w;
   } 
   
   u.adjacent.insert( v_edge);


   // insert (v,u) if undirected graph (repeat above but reverse vertex order)
if(!this.digraph){
   var u_edge = new Edge(u_i);
   if(!(w === undefined)){
      
      u_edge.weight = w;
   } 
   
  v.adjacent.insert( u_edge);


}
}

// --------------------
function topoSearch(type)
{
  // mark all vertices unvisited
  for (var i = 0; i < this.nv; i++)
  {
      this.vert[i].visit = false;
  }
  // traverse unvisited connected components
  for (var i = 0; i < this.nv; i++)
  {

      if (!this.vert[i].visit)
      {
        
         if(type=="dfs"){
         
            this.dfs(i);
            this.connectedComp++;
         }
         else{
         
            if(type=="bfs"){  
           
            this.bfs(i);
         }
      }    
          
      }

  }

}

// --------------------
function makeAdjMatrix()
{
    //intitie adjMatrix by 0
   for(var i=0; i<this.nv; i++){

    this.adjMatrix[i]=[];

    for(var j=0; j<this.nv;j++){
       this.adjMatrix[i][j]=0;
    }

    
    // if edge is wighted put it is wieght in adjMatrix 
    //if edge is unwighted put 1 in adjMatrix 
    if(this.weighted){
       var w = this.vert[i].adjacent.traverse();
       for(var j=0; j<w.length ; j++){
          this.adjMatrix[i][w[j].target_v]= w[j].weight;
       }
    }
  
 
    else{
       var w2 = this.vert[i].adjacentById();
       for(var j=0; j<w2.length ; j++){
          this.adjMatrix[i][w2[j]]=1;
       }
    }      
 }
}

function componentInfoImpl()
{

	var comInf;
	if(this.connectedComp==0){
		comInf = "no connectivity info";
		
	}
	else if(this.connectedComp==1){
		comInf="CONNECTED"	;
	}
	else{
		comInf = "DISCONNECTED " + this.connectedComp;
	}
   
    return comInf;
}