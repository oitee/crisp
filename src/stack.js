class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export class Stack {
  constructor() {
    this.head;
  }
  isEmpty() {
    return this.head == undefined;
  }
  push(x) {
    if (this.isEmpty()) {
      this.head = new Node(x);
      return this.head.data;
    }
    let pushedNode = new Node(x);
    pushedNode.next = this.head;
    this.head = pushedNode;
    return this.head.data;
  }
  pop() {
    if (this.isEmpty()) {
      throw "Underflow";
    }
    let popped = this.head.data;
    this.head = this.head.next;
    return popped;
  }
  peek() {
    if (this.isEmpty()) {
      throw "Empty stack";
    }
    return this.head.data;
  }
}
