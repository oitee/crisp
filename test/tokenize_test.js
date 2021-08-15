import * as tokenize from "../src/tokenize.js";
import * as assert from "assert";

function testTokenize() {
  assert.equal(tokenize.tokenize("99"), 99);
  assert.equal(tokenize.tokenize("def"), "def");
  assert.equal(tokenize.tokenize("-99"), -99);
  assert.equal(tokenize.tokenize("("), "(");
}
describe("Tokenize function", () => {
    it("Test operations", testTokenize);
});
