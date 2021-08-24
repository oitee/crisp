# Crisp: A Simple Lisp Interpreter


Lisp was the first programming language to solely rely on s-expressions, to write logic. Lisp, which is loosely derived from the term "List Processor", was developed by [John McCarthy in 1960](http://jmc.stanford.edu/articles/lisp/lisp.pdf). Thereafter, many flavors and dialects of Lisp have emerged. Of these, Common Lisp and Clojure are two of the most well-known dialects of Lisp.  

Clojure is highly prevalent in modern times as seen in the latest [Stackoverflow survey](https://insights.stackoverflow.com/survey/2021#technology-top-paying-technologies). It is a programming language built on top of Java which provides a Lisp syntax for writing programs. The dialect of Lisp for which this project is building an interpreter, relies on part of the Clojure syntax.

## Goal

The goal of this project is to write a tiny version of the Clojure REPL, which can perform certain basic mathematical operations. 

REPL stands for read-eval-print-loop. It refers to an interactive programming environment, that takes an input from the user, evaluates it and prints the result. Once a result is printed, the environment goes back to the read state to accept fresh inputs from the user, thereby creating a loop. The shell prompt on Unix-based systems is like a REPL. 

## Scope

The project will evaluate **valid s-expressions**. If expressions are incomplete (eg., unclosed parenthesis) or if they are not written as per the syntax of an s-expression, an appropriate error message will be displayed.

For the sake of simplicity, the project supports only **basic mathematical operations**, namely, multiplication, division, addition and subtraction. Thus, any s-expression containing any of these operations will be treated as valid. However, if an expression contains any other operator, the entire expression will be treated as invalid.

The project also **handles variables**. To initialize a variable, the keyword `def` should be used. This keyword acts as an operator and accepts  the following two arguments: name of the variable and its value. Here's how variables can be initialized: `(def nameOfVariable 9)`. The same variable can be re-initialized with a new value in a single s-expression. Further, during a REPL session, once a variable has been initialized in one s-expression, it can be re-used in subsequent s-expressions. 

An s-expression may contain two disjointed s-expressions, such that there is more than one resultant value at the end of evaluation. For example, in the following expression, `(+ 7 8) (* 1 10)`, there are two values: `15` and `10`. The project is implemented to only display the **right-most result**. In the above example, `10` will be displayed. 


## Running the Project

To run the code of this project, this Github Repository will need to be cloned:

```sh
git clone git@github.com:oitee/crisp.git
```

The necessary dependencies to run the project needs to be installed:

```sh
npm install
```

To run the project ([Node.js](http://nodejs.dev/) needs to be installed):

```sh
npm run repl
```


## Implementation details

### How expressions are read

The aim is to convert the input string (containing a sequence of characters) into a tree that expressly sets out the structure for evaluating each list in a valid expression. This is called **LR parsing**.  To do this, the input string is read from left-to-right, without ever going back. 

While traversing through each character in an expression, each collection of characters forming an atom is grouped together. This can be achieved as spaces demarcate atoms from one another. Also, a closing parenthesis implies the end of an atom (as it is not mandatory to use a space between an operand and closing parenthesis). 

When an atom is parsed, it will be pushed to a stack. Once all the atoms of a list have been parsed and the list is complete, all the atoms belonging to that list will be popped from the stack. As every list is enclosed between a pair of parentheses, whenever a closing parenthesis is detected (while going from left-to-right of the input string), it would imply the end of a list. Thus, when a `)` is detected, all the atoms pushed to the stack (thus far) will be popped out of the stack. As only the atoms of the current list should be popped, the popping should stop the moment a `(` is popped. This would signify the beginning of the current list. 

Once all the atoms of a list are popped, the list is evaluated. This is done by passing the collection of atoms comprising the list to an evaluator function. This function will first interpret the meaning of each atom. For example, if an atom contains digits, it will call the appropriate function to convert that atom into an integer. Similarly, it will convert the operator symbol to its corresponding function. Once this process is complete, it will call the relevant operator function and pass the set of operands belonging to the current list.  The return value will be pushed back into the stack.

In this way, a **syntax tree** will be created incrementally and from bottom-up. For example, if the input expression is `(* 1 (* 5 6) (+ 7 8 9) 10)` , the atoms and lists will be built as follows:

First, the `*` operator will be pushed to the stack, along with the opening parenthesis `(`. Then, the following atoms will be pushed: `1` `(` `*` `5` and `6`. (For the sake of simplicity, the parentheses are not shown on the syntax tree).


![Syntax Tree and stack 1](https://otee.dev/assets/images/syntax_tree_stack_1.png)


Now that there is a `)`, it will signify the end of the current list. So, all the atoms of the present list will be popped, namely  `6` `5` `*` and `(`. In place of these atoms, the value of `(* 5 6)` will be pushed into the stack. The syntax tree would now look like this:

![Syntax Tree and stack 2](https://otee.dev/assets/images/syntax_tree_stack_2.png)

In a similar manner, the next set of atoms will be pushed, i.e., `(` `+` `7` `8` `9` will be pushed:

![Syntax Tree and stack 3](https://otee.dev/assets/images/syntax_tree_stack_3.png)

Again, the presence of `)` would signify the end of the current list. So, all the atoms of this list will be popped and their result will be pushed into the stack. Finally, the penultimate atom, `10` will be pushed and then all the remaining values in the stack will be passed to the multiplication operator along with `1`.

![Syntax Tree and stack 4](https://otee.dev/assets/images/syntax_tree_stack_4.png)

Now that there is no other element left in the expression, the return value of this function call will be the final output, i.e., `7200`.


### Code arrangement

Some of the important modules in the project are as follows:

- **REPL:** Hosts the REPL, which accepts the input string, passes it to the interpreter and displays the final result.
- **Interpreter:** Parses the input string from left-to-right and pushes each atom to a stack. Once a list is completed, it pops all the atoms belonging to that list and calls the `eval` module to evaluate the list. Finally, it pushes the result of each list back into the stack.
- **Eval:** Converts the operator symbol of each list to its respective function (by calling the `operators` module) and parses integer atoms, if any. Finally, it evaluates the list expression, by calling a reduce function and passing the operator function and the respective operands to it.
- **Operators:** Maintains the table of operator functions and returns the corresponding operator function for a given operator symbol.  It maintains a variable table; each operator function accesses this table to access the value of each initialized variable.

#### Test Coverage

To implement test cases for this project, the [jest](https://jestjs.io/) testing framework was used. Here is the test coverage report:


File              | % Stmts | % Branch | % Funcs | % Lines 
------------------|---------|----------|---------|---------
All files         |   89.92 |    66.67 |   90.91 |    89.6 
 eval.js          |   92.31 |    83.33 |     100 |   90.91 
 interpreter.js   |   93.75 |    84.21 |     100 |   93.55 
 number_parser.js |      96 |    94.12 |     100 |      96 
 operators.js     |   94.74 |    58.33 |     100 |   94.74 
 reduce.js        |     100 |        0 |     100 |     100 
 stack.js         |     100 |      100 |     100 |     100 
 utils.js         |      50 |        0 |      50 |      50 




## Further Improvements

Lisps are vast and have many features that are not implemented in this tiny project. The goal was to have a first version of a Lisp interpreter that could do the basic operations. Some of the main missing features that could be the first to be added to this are:

- **Local scoping:** While the project supports initialization and re-initialization of variables, it does not support initialization of local variables, within a given scope. For example, in Clojure, the keyword `let` allows for initialization of local variables within a given lexical context. The project does not support this feature.

- **User defined functions:** The project does not support function parsing. The program is built only to execute predefined operators. There is no scope to add new operators.

Pull requests for the above improvements (or anything else) would be highly appreciated!
