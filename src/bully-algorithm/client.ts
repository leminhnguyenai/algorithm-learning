import Node from "./nodes";

// Initiate the cluster
const nodes = [
  new Node(1),
  new Node(2),
  new Node(3),
  new Node(4),
  new Node(5),
  new Node(6),
];

// Introduce the nodes to each other
for (let i = 0; i < nodes.length; i++) {
  nodes[i].setPeers(nodes.slice(i));
}

// Assume an event crash node 6
nodes[5].alive = false;

// That event presumably trigger node 3 to start an election
nodes[2].initiateElection();
