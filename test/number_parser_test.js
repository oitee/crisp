import * as number_parser from "../src/number_parser.js";
import * as assert from "assert";

function testTokenize() {
  assert.equal(number_parser.tokenize("99"), 99);
  assert.equal(number_parser.tokenize("def"), "def");
  assert.equal(number_parser.tokenize("-99"), -99);
  assert.equal(number_parser.tokenize("("), "(");
  assert.equal(number_parser.tokenize("123"), 123);
  assert.equal(number_parser.tokenize("-123"), -123);
  assert.equal(number_parser.tokenize("def"), "def");
  assert.equal(number_parser.tokenize("-"), "-");
}
describe("Tokenize function", () => {
    it("Test operations", testTokenize);
});

