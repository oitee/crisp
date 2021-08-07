import * as stack from "../src/stack.mjs";
import * as assert from "assert";

function checkInvalidStack(f) {
  try {
    f();
  } catch (e) {
    return true;
  }
  return false;
}

function testStack() {
  let s = new stack.Stack();
  assert.ok(checkInvalidStack(() => s.peek()));
  assert.ok(checkInvalidStack(() => s.pop()));
  s.push(1);
  s.push(2);
  s.push(3);
  assert.ok(!s.isEmpty());
  assert.equal(s.peek(), 3);
  assert.equal(s.pop(), 3);
  assert.equal(s.peek(), 2);
}

describe("Stack operations", () => {
  it("Simple operations", testStack);
});
