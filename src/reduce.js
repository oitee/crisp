import * as operators from "./operators.js";
export function reduce(f, data = []){
    let acc = data[0];
    for (let i = 1; i < data.length; i++){
        acc = f(acc, data[i]);
    }
    return acc;
}