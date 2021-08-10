import * as reduce from "../src/reduce.js";
import * as operators from "../src/operators.js";
import * as assert from "assert";


describe("Reduce", () => {
    it("Multiplication", () => {
        let x = reduce.reduce(operators.findOperator('*'), [4, 10, 5, 2]);
        assert.equal(x, 400);
    });
    it("Subtraction", () => {
        let x = reduce.reduce(operators.findOperator('-'), [4, 10, 5, 2]);
        assert.equal(x, -13);
    });

});

    