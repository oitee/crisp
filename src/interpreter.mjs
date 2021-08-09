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
      if(utils.isString(atom)){
        throw "atoms in an expression cannot contain both digits and numbers: " + atom + presentChar;
      }
      if (atom === undefined) {
        atom = 0;
      }
      atom = atom * 10 + parseInt(presentChar);
    } else if(utils.isAlphabet(presentChar)){
      if(utils.isInteger(atom)){
        throw "atoms in an expression cannot contain both digits and numbers:" + atom + presentChar;
      }
      if(atom == undefined){
        atom = presentChar;
      }
      else{
        atom = atom + presentChar;
      }
    } 
    
    else if (presentChar === " ") {
      if (utils.isInteger(atom) || utils.isString(atom)) {
        s.push(atom);
        atom = undefined;
      }
    } else if (presentChar === ")") {
      if (utils.isInteger(atom) || utils.isString(atom)) {
        s.push(atom);
        atom = undefined;
      }
      
      let tokens = [], poppedValue = s.pop();
      while (poppedValue !== "(") {
        tokens.push(poppedValue);
        poppedValue = s.pop();
      }
      let value = lispEval.lispEval(tokens);
      //the return value of lispEval would be 'null' when the operation involes 'defn'
      //in that case, no value should be pushed to the stack s
      if(value != null){
        s.push(value);
      }
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

