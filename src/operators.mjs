function ifNumber(a){
    if(typeof a == "number"){
        return a;
    }
    throw "operand is not a number: " + a;
}

let operators = {
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
};

export function findOperator(str) {
  if (operators.hasOwnProperty(str)) {
    return operators[str];
  }
  throw "invalid operator: " + str;
}

function testing() {
  console.log(operators.hasOwnProperty(" "));
  let str = "(* 9 (+ 8 7) 9)";
  let arr = [...str];
  let i = 0;
  while (i < arr.length) {
    console.log("is " + arr[i] + "  a property of operators?");
    console.log(operators.hasOwnProperty(arr[i]));
    i++;
  }
}
//testing();
