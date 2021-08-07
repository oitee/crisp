export function Stack() {
    this.head;
    (this.Node = function (data) {
      this.data = data;
      this.next = null;
    }),
      (this.isEmpty = function () {
        return this.head == undefined;
      }),
      (this.push = function (x) {
        if (this.isEmpty()) {
          this.head = new this.Node(x);
          return this.head.data;
        }
        let pushedNode = new this.Node(x);
        pushedNode.next = this.head;
        this.head = pushedNode;
        return this.head.data;
      }),
      (this.pop = function () {
        if (this.isEmpty()) {
          return "underflow";
        }
        let popped = this.head.data;
        this.head = this.head.next;
        return popped;
      }),
      (this.peek = function () {
        if (this.isEmpty()) {
          return "empty stack";
        }
        return this.head.data;
      });
  }
  
  function testStack() {
    let s = new Stack();
    console.log(s.peek());
    console.log(s.pop());
    console.log(s.push(1));
    s.push(2);
    s.push(3);
    console.log(s.isEmpty());
    console.log(s.peek());
    console.log(s.pop());
    console.log(s.peek());
  }
  //testStack();