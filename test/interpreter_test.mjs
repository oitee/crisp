import * as interpreter from "../src/interpreter.mjs";
import * as assert from "assert";

function checkInvalidExpression(expr){
    try{
        interpreter.lisp(expr);
    }
    catch(e){
        return true;
    }
    return false;
}

describe("Valid lisp expressions", () => {
  
  it("Simple expressions", () => {
    assert.equal(interpreter.lisp("(* 8 9)"), 72);
    assert.equal(interpreter.lisp("(+ 8 9)"), 17);
    assert.equal(interpreter.lisp("(* 5 4 3 2 1)"), 120);
  });

  it("Nested expressions", () => {
    assert.equal(interpreter.lisp("(+ (* 8 9) 9)"), 81);
    assert.equal(interpreter.lisp("(* 10 (+ 11 12) 13)"), 2990);
    assert.equal(interpreter.lisp("(+ 1 (* 2 3) (* 4 2))"), 15);
  });

  it("Invalid expressions", () => {
    assert.ok(checkInvalidExpression ("(* 9"));
    assert.ok(checkInvalidExpression ("(* (+ 9"));
    assert.ok(checkInvalidExpression ("(+ & 6)"));
    assert.ok(checkInvalidExpression("(! 5 4 3 2 1)"));
    assert.ok(checkInvalidExpression("(* 5 4 3 2 1))"));   
  });
});
 



