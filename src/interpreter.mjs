import * as operators from "./operators.mjs";
import * as reduce from "./reduce.mjs";
import * as stack from "./stack.mjs";
import * as lispEval from "./eval.mjs";
import * as utils from "./utils.mjs";

export function lisp(expr) {
  let chars = [...expr], s = new stack.Stack(), atom;

  for (let i = 0; i < chars.length; i++) {
    let presentChar = chars[i];
    if (utils.isDigit(presentChar)) {
      if (atom === undefined) {
        atom = 0;
      }
      atom = atom * 10 + parseInt(presentChar);
    } else if (presentChar === " ") {
      if (utils.isInteger(atom)) {
        s.push(atom);
        atom = undefined;
      }
    } else if (presentChar === ")") {
      if (utils.isInteger(atom)) {
        s.push(atom);
        atom = undefined;
      }
      
      let tokens = [], poppedValue = s.pop();
      while (poppedValue !== "(") {
        tokens.push(poppedValue);
        poppedValue = s.pop();
      }
      let value = lispEval.lispEval(tokens);
      s.push(value);
    } else {
      s.push(presentChar);
    }
  }
  //s should contain the value of the entire expression
  let result = s.pop();
  if (!s.isEmpty()) {
    //if there are more than one item, there is an error
    throw "error: the resultant value is not the last item. Suspect: unopened brackets";
  }
  
  if (utils.isInteger(result)) {
    //if result is not an integer, there is an error
    return result;
  }
  throw "error: the resultant value is not an integer";
}
