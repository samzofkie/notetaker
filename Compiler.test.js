import Compile from "./Compiler.js";

test("compile empty string", () => {
  expect(Compile("")).toBe("");
});

test("compile word", () => {
  expect(Compile("word")).toBe("word");
});

test("compile words", () => {
  expect(Compile("two words")).toBe("two words");
});
