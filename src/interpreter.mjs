import * as operators from "./operators.mjs";
import * as reduce from "./reduce.mjs";
import * as Stack from "./stack.mjs";
import * as lispEval from "./eval.mjs";

function lisp(input_str) {
  let input_arr = [...input_str];
  let stack = new Stack.Stack();
  let atom;
  for (let i = 0; i < input_arr.length; i++) {
    let presentChar = input_arr[i];
    let charCodePresentChar = presentChar.charCodeAt(); // for identifying if presentChar is an integer
    if (charCodePresentChar >= 48 && charCodePresentChar <= 57) {
      if (atom === undefined) {
        atom = 0;
      }
      atom = atom * 10 + parseInt(presentChar);
    } else if (presentChar === " ") {
      if (typeof atom === "number") {
        stack.push(atom);
        atom = undefined;
      }
    } else if (presentChar === ")") {
      if (typeof atom === "number") {
        stack.push(atom);
        atom = undefined;
      }
      let tokens = [];
      let poppedValue = stack.pop();
      while (poppedValue !== "(") {
        tokens.push(poppedValue);
        poppedValue = stack.pop();
      }
      let value = lispEval.lispEval(tokens);
      stack.push(value);
    } else {
      stack.push(presentChar);
    }
  }
  //after the for-loop is complete, the stack should contain the value of the entire expression
  //if there are more than one item, there is an error
  //if the only item in the stack is not a number, there is an error
  let finalPop = stack.pop();
  if (!stack.isEmpty()) {
    throw "error: the resultant value is not the last item. Suspect: unopened brackets";
  }

  if (typeof finalPop === "number") {
    return finalPop;
  }
  throw "error: the resultant value is not an integer";
}
console.log(lisp("(* 10 (+ 11 12) 13)") == 2990);
console.log(lisp("(* 5 4 3 2 1)") == 120);
console.log(lisp("(+ 1 (* 2 3) (* 4 2))") == 15);
//console.log(lisp("(+ & 6)"));
