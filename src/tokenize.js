
export function tokenize(str){
    if(typeof str !== "string"){
        throw "Present token is not a string " + str;
    }

    let charcodeMinus = "-".charCodeAt(0);
    let charcodeZero = "0".charCodeAt(0);//48
    let charcodeNine = "9".charCodeAt(0);//57
    let currentCharCode = str[0].charCodeAt(0);
    let num = 0;
    
    if(currentCharCode === charcodeMinus || (currentCharCode >= charcodeZero && currentCharCode <= charcodeNine)) {
        let i = 0;
        let isNegative = false;
        if(currentCharCode === charcodeMinus){
            isNegative = true;
            i++;
        }
        for (i; i < str.length; i++){
            currentCharCode = str[i].charCodeAt(0);
            if(currentCharCode >= charcodeZero && currentCharCode <= charcodeNine){
                let digit = currentCharCode - charcodeZero;
                num = num * 10 + digit;
            }
            else{
                throw "Incompatible types: " + str;
            }
        }
        if(isNegative){
            return -num;
        }
        return num;
    }
    return str;
}
