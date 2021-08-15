import * as stack from "./stack.js";
import * as lispEval from "./eval.js";
import * as utils from "./utils.js";
import * as tokenize from "./tokenize.js";

export function lisp(expr) {
  let chars = [...expr],
    s = new stack.Stack();
  let atom = "";

  for (let i = 0; i < chars.length; i++) {
    let presentChar = chars[i];
    if (presentChar != " " && presentChar != ")" && presentChar != "\n") {
      if(presentChar === "("){
        s.push(presentChar);
        atom = "";
      }
      else{
        atom = atom + presentChar;
      }
    } else {
      if (atom !== "") {
        atom = tokenize.tokenize(atom);
        s.push(atom);
        atom = "";
      }
      if (presentChar === ")") {
        let tokens = [], poppedValue = s.pop();
        while (poppedValue !== "(") {
          tokens.push(poppedValue);
          poppedValue = s.pop();
        }
        let value = lispEval.lispEval(tokens);
        //the return value of lispEval would be 'null' when the operation involes 'def'
        //in that case, no value should be pushed to the stack s
        if (value != null) {
          s.push(value);
        }
      }
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