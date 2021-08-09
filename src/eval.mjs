import * as operators from "./operators.mjs";
import * as reduce from "./reduce.mjs";
export function lispEval(tokens){
    if(tokens.length == 0){
        throw "empty expression is invalid";
    }
    //the tokens are in LIFO- so operator will be the last item in tokens
    let operationFn = operators.findOperator(tokens[tokens.length - 1]);
    let operands = [];
    for(let i = tokens.length - 2; i >= 0; i--){
        if (typeof tokens[i] === "number" || typeof tokens[i] == "string") {
            operands.push(tokens[i]);
        }
        else{
            throw "operand is not valid: " + tokens[i];
        }
    }
    return reduce.reduce(operationFn, operands);
}


