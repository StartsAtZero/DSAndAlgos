//Building a Graph through an AdjacencyList
//Undirected Graph

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  //Adding a Vertex
  //Accepts a name of a vertex
  // It should add a key to the adjaceny list with the name of the vertex and set its value to be an empty array

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  //Adding an Edge
  //Accept two vertices, we can call them ver1 and ver2
  //The function should find in the adjacency list the key of ver1 and push ver2 to the array
  //the function should find in the adjacency list the key of ver2 and push the ver1 to the array
  //Not worrying about error handling/invalid vertices

  addEdge(ver1, ver2) {
    this.adjacencyList[ver1].push(ver2);
    this.adjacencyList[ver2].push(ver1);
  }

  // Removing an Edge
  //Accepts two vertices, ver1 and ver2
  //reassign the key of ver1 to be an array that does not contain vertex 2
  //do the same for ver2

  removeEdge(ver1, ver2) {
    this.adjacencyList[ver1] = this.adjacencyList[ver1].filter(
      (v) => v !== ver2
    );
    this.adjacencyList[ver2] = this.adjacencyList[ver2].filter(
      (v) => v !== ver1
    );
  }

  //Remove Vertex
  //Accepts a single argument, a vertex
  //Should loop as long as there are any other vertices in the adjaceny list for that vertex
  //Inside the loop, call our removeEdge function with the vertex we are removing and any values in the adjacency list for that vertex
  //delete the key in the adjacency list for that vertex

  removeVertex(ver) {
    if (this.adjacencyList[ver].length) {
      while (this.adjacencyList[ver].length) {
        let adjVer = this.adjacencyList[ver].pop();
        this.removeEdge(ver, adjVer);
      }
    }
    delete this.adjacencyList[ver];
  }

  //Traversing a graph
  //Unlike a tree, which is a special kind of graph, most graphs do not have a root node

  //Depth First Search : Explore as far down as possible before backtracking
  //Recursive DFS
  //Accepts Starting node
  //Create a list to store the end result, to be returned at the very end
  //Create an object to store visited vertices
  //Create a helper function which accepts a vertex
  //The helper function should return early if the vertex is empty
  //it should place the vertex it accepts into the visted object and push that vertex into the results array
  //Loop over all of the values in the adjacencyList for that vertex
  //If any of htose values have not been visited, recursively invoke the helper funciton with that vertex

  DFSRecursive(vertex) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    const traverse = (ver) => {
      if (!ver) return null;
      visited[ver] = true;
      result.push(ver);
      adjacencyList[ver].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return traverse(neighbor);
        }
      });
    };
    traverse(vertex);
    return result;
  }

  //DFS Iterative
  // Function accepts starting node
  //Create a stack to help us keep track of vertices (array)
  //create an array to store the end result to be returned
  //create an object to store visted vertices
  //add the starting vertex to the stack and mark it visited
  //While the stack has something in it:
  //Pop the next vertex from the stack
  //If that vertex hasn't been visited yet
  //Mark it as visited
  //Add to the result list
  //push all of its neighbors into the stack

  DFSIterative(vertex) {
    let stack = [];
    let result = [];
    let visited = {};

    stack.push(vertex);
    visited[vertex] = true;

    while (stack.length) {
      let ver = stack.pop();
      result.push(ver);
      this.adjacencyList[ver].forEach((v) => {
        if (!visited[v]) {
          visited[v] = true;
          stack.push(v);
        }
      });
    }
    return result;
  }

  //Breadth First Search
  // Accepts a starting vertex
  //create a queue(array) and place the starting vertex in it
  //Create an array to store the results array
  // create an object to store the nodes visited
  //Mark the starting vertex as visited
  //Loop as long as there is anything in the queue
  //Remove the first vertex from the queue and push it into the array that stores the results
  //Loop over each vertex in the adjacency list for the vertex you are visiting
  //If it is not inside the object that stores the nodes visited, mark it as visisted and enqueue that vertex
  //once you have finished looping, return the results array

  BFS(vertex) {
    const queue = [vertex];
    const result = [];
    const visited = {};

    visited[vertex] = true;

    while (queue.length) {
      let curVer = queue.shift();
      result.push(curVer);

      this.adjacencyList[curVer].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}
