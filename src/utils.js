const charCodeZero = "0".charCodeAt(0);
const charCodeNine = "9".charCodeAt(0);

export function isDigit(char) {
  if (typeof char != "string" || char.length != 1) {
    return false;
  }
  let charCode = char.charCodeAt(0); // for identifying if presentChar is an integer
  return charCode >= charCodeZero && charCode <= charCodeNine;
}

export function isInteger(n) {
  return typeof n === "number";
}

const charCodea = "a".charCodeAt(0);
const charCodez = "z".charCodeAt(0);
const charCodeA = "A".charCodeAt(0);
const charCodeZ = "Z".charCodeAt(0);

export function isAlphabet(char) {
  if (typeof char != "string" || char.length != 1) {
    return false;
  }
  let charCode = char.charCodeAt(0);
  return (
    (charCode >= charCodea && charCode <= charCodez) ||
    (charCode >= charCodeA && charCode <= charCodeZ)
  );
}

export function isString(str) {
  return typeof str === "string";
}
