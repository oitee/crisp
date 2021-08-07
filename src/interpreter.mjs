import * as operators from "./operators.mjs";
import * as reduce from "./reduce.mjs";
import * as Stack from "./stack.mjs";

function lisp(input_str) {
  let input_arr = [...input_str];
  let stack = new Stack.Stack();
  let atom;
  for (let i = 0; i < input_arr.length; i++) {
    let presentChar = input_arr[i];
    let charCodePresentChar = presentChar.charCodeAt(); // for identifying if presentChar is an integer

    //when presentChar is open bracket, just push it
    if (presentChar === "(") {
      stack.push(presentChar);
    }

    //when presentChar is an operator, just push it
    else if (operators.operators.hasOwnProperty(presentChar)) {
      stack.push(presentChar);
    }

    //when presentChar is an integer digit, add it to 'atom'
    else if (charCodePresentChar >= 48 && charCodePresentChar <= 57) {
      if (atom === undefined) {
        atom = 0;
      }
      atom = atom * 10 + parseInt(presentChar);
    }

    //when presentChar is a space, lets see if there is an atom
    //if yes, lets push atom and make atom undefined
    else if (presentChar === " ") {
      if (typeof atom === "number") {
        stack.push(atom);
        atom = undefined;
      }
    }

    //lastly, lets set out what needs to be done when presentChar is ')'
    else if (presentChar === ")") {
      if (typeof atom === "number") {
        stack.push(atom);
        atom = undefined;
      }
      let operands = [];
      let indexOfOperands = 0;
      let poppedValue = stack.pop();
      let operation;
      let firstOperand;
      while (poppedValue !== "(") {
        //first if under while-
        //to check if popped item is an operator
        if (operators.operators.hasOwnProperty(poppedValue)) {
          operation = operators.operators[poppedValue]; //operation is now a function
          let isOpenBracket = stack.pop(); //checking to see if the next item on the stack is '('
          if (isOpenBracket !== "(") {
            throw "error: operator is not preceded by an open bracket";
          } else {
            poppedValue = isOpenBracket;
          }
        }
        //second else-if
        //the following else-if will see if the poppedValue is an integer
        else if (typeof poppedValue === "number") {
          operands[indexOfOperands++] = poppedValue;
          poppedValue = stack.pop();
          //now that we have popped another item
          //we should see if that popped item is '('
          //this would mean an error (no integer should be preceded by a bracket)
          //but this will close the while loop and our function to pass to reduce() will be undefined
          if (poppedValue === "(") {
            throw "error: opening bracket immediately preceded by an integer";
          }
        }
        //third else --> to return error
        else {
          throw "error: pushed item is neither an integer,  nor an operator!";
        }
      }
      //now we *should* have the operands, and the operation
      //operation will always be defined by now- if an unknown operator is mentioned, an error message will be displayed above
      //but we need to see if the operands array is empty
      let value;
      firstOperand = operands.shift();
      value = reduce.reduce(operation, firstOperand, operands);
      stack.push(value);
    }
    //now, present character is neither a space, nor a closing bracket, nor an opening bracket.
    //assuming the expression to only contain integers (ie, operands), operators, and brackets,
    else {
      throw "error: present character is neither an operator, nor a bracket nor an integer";
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

