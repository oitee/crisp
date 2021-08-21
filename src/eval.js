import * as operators from "./operators.js";
import * as reduce from "./reduce.js";
import * as number_parser from "./number_parser.js";
export function lispEval(atoms) {
  if (atoms.length == 0) {
    throw "Empty expression is invalid";
  }
  for (let i = 0; i < atoms.length; i++) {
    atoms[i] = number_parser.tokenize(atoms[i]);
  }
  //the atoms are in LIFO- so operator will be the last item in atoms
  let operationFn = operators.findOperator(atoms[atoms.length - 1]);
  let operands = [];
  for (let i = atoms.length - 2; i >= 0; i--) {
    if (typeof atoms[i] === "number" || typeof atoms[i] == "string") {
      operands.push(atoms[i]);
    } else {
      throw "Operand is not valid: " + atoms[i];
    }
  }
  return reduce.reduce(operationFn, operands);
}
