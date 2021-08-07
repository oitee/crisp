const charCodeZero = "0".charCodeAt(0);
const charCodeNine = "9".charCodeAt(0);
export function isDigit(char) {
  if (typeof char != "string" || char.length != 1) {
    throw "not a digit: " + char;
  }
  let charCode = char.charCodeAt(0); // for identifying if presentChar is an integer
  return (charCode >= charCodeZero && charCode <= charCodeNine);
}

export function isInteger(n){
    return typeof n === "number";
}