export let operators = {
    "*": function (n, m = 1) {
      return n * m;
    },
    "+": function (n, m = 0) {
      return n + m;
    },
    "/": function (n, m = 1) {
      return n / m;
    },
    "-": function (n, m = 0) {
      return n - m;
    },
  };
  
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
  