import * as interpreter from "../src/interpreter.js";
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
    assert.equal(interpreter.lisp("(* 5 \n 4 \n 3 2 1)"), 120);
    assert.equal(interpreter.lisp("(/ 2 3)"), 2/3);
  });

  it("Nested expressions", () => {
    assert.equal(interpreter.lisp("(+ (* 8 9) 9)"), 81);
    assert.equal(interpreter.lisp("(* 10 (+ 11 12) 13)"), 2990);
    assert.equal(interpreter.lisp("(+ 1 (* 2 3) (* 4 2))"), 15);
    assert.equal(interpreter.lisp("(+ -1 (* -2 3) (* 4 2))"), 1);
    assert.equal(interpreter.lisp("(- (+ 1 2 3) (+ 1 2 3))"), 0);
    assert.equal(interpreter.lisp("(* (+ 1 2 3) (+ 1 2 3))"), 36);
    assert.equal(interpreter.lisp("(/ (+ 1 2 3) (+ 1 2 3))"), 1);
  });

  it("Valid Expressions with variables", () => {
    assert.equal(interpreter.lisp("(def n 11) (def m 100) (* n m)"), 1100);
    assert.equal(interpreter.lisp("(def height 10) (def width (+ height 4)) (def height 11) (* height width)"), 154);
    assert.equal(interpreter.lisp("(+ 1 (def nine 9) (* 4 2) nine)"), 27);
    assert.equal(interpreter.lisp("(* 1 (def nine 9) (* 4 -2) nine)"), -648);
    assert.equal(interpreter.lisp("(def nine 9)"), 9);
    assert.equal(interpreter.lisp("(+ (def nine 9) (def n nine))"), 18);
    assert.equal(interpreter.lisp("(def nine 9) (def n nine)"), 9); 
  });

  it("Invalid expressions", () => {
    assert.ok(checkInvalidExpression ("(* 9"));
    assert.ok(checkInvalidExpression ("(* (+ 9"));
    assert.ok(checkInvalidExpression ("(+ & 6)"));
    assert.ok(checkInvalidExpression("(! 5 4 3 2 1)"));
    assert.ok(checkInvalidExpression("(* 5 4 3 2 1))"));
    assert.ok(checkInvalidExpression("((def nine 9) (def n nine))"));
    assert.ok(checkInvalidExpression("(* 11 11"));
    assert.ok(checkInvalidExpression("(((("));
    assert.ok(checkInvalidExpression("((())"));
  });
});
 



