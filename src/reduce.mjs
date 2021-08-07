import * as operators from "./operators.mjs";
export function reduce(f, data = []){
    let acc = data[0];
    for (let i = 1; i < data.length; i++){
        acc = f(acc, data[i]);
    }
    return acc;
}
function test(){
let f  = operators.operators['*'];
    let arr = [4, 10, 5, 2];
    let acc = 3;
console.log(reduce(f, acc, arr));
}
//test();
