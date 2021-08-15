import * as lisp from "./interpreter.js";
import * as readline from "readline";
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
repl();
function repl() {
  reader.question("> ", (expr) => {
    if (expr == "q") {
      reader.close();
      return;
    }
    try {
      console.log(lisp.lisp(expr));
    } catch (e) {
      console.log("Found an error: " + e);
    }
    repl();
  });
}
