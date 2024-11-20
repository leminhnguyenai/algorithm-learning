class Node {
  private nodeId: number;
  private leader: boolean;
  private peers: Node[];
  public alive: boolean;
  constructor(nodeId: number) {
    this.nodeId = nodeId;
    this.leader = false;
    this.peers = [];
    this.alive = true;
  }

  getNodeId() {
    return this.nodeId;
  }

  isLeader(): boolean {
    return this.leader;
  }

  setLeader(): void {
    this.leader = true;
    console.log(`node ${this.nodeId} is the new leader`);
  }

  setPeers(nodes: Node[]) {
    this.peers = nodes;
  }

  initiateElection() {
    console.log(`Node ${this.nodeId} initiate election`);
    // Sort the nodes descending based on the node id
    this.peers.sort((a: Node, b: Node) => b.getNodeId() - a.getNodeId());
    for (let i = 0; i < this.peers.length; i++) {
      if (this.peers[i].getNodeId() < this.nodeId) continue;
      // The first node to be responsive will be the new leader
      const res = this.peers[i].receieveElectionMessage(this);
      if (!res) continue;
      this.peers[i].setLeader();
      return;
    }

    // If no node is responsive the current node "bully" and become new leader
    this.setLeader();
  }

  receieveElectionMessage(sender: Node) {
    if (this.alive)
      console.log(
        `Node ${this.nodeId} receive eletion message from node ${sender.getNodeId()}`,
      );
    else console.log(`Node ${this.nodeId} is currently unresponsive`);
    return this.alive;
  }
}

export default Node;
