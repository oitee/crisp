import * as utils from "./utils.js";
let variableTable = {};
function ifNumber(a){
    if(typeof a == "number"){
        return a;
    }
    if(variableTable.hasOwnProperty(a)){
      return variableTable[a];
    }
    throw "operand is not a number: " + a;
}

const operators = {
  "*": function (n, m = 1) {
    return ifNumber(n) * ifNumber(m);
  },
  "+": function (n, m = 0) {
    return ifNumber(n) + ifNumber(m);
  },
  "/": function (n, m = 1) {
    return ifNumber(n) / ifNumber(m);
  },
  "-": function (n, m = 0) {
    return ifNumber(n) - ifNumber(m);
  },
  "def": function(variable, value){
    if(utils.isString(variable)){
      variableTable[variable] = ifNumber(value);
    }
    else{
      throw "variable name is not a string: " + variable;
    }
    return null;
  }
};

export function findOperator(str) {
  if (operators.hasOwnProperty(str)) {
    return operators[str];
  }
  throw "invalid operator: " + str;
}

