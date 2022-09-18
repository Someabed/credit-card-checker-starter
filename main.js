// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
const validateCred = arr => {     // Function with an array parameter.
    let newString = arr.join(''); // joins the numbers together with no spaces into a new string.
    //console.log(arr);
    //console.log(newString);
    let j = 1;  // the first number from the left should be multiplied by 1.
    let total = 0; // a variable to store the total.
    for (let i = newString.length - 1; i >= 0; i--) {  // this loops from the end of the array backwards.
        let sum = 0; // a variable to store the sum(product) of the number * j.
        sum = Number(newString.charAt(i)) * j;
        //console.log(sum);
        if (sum > 9) { // based on LUHN algorithm, if the number is double digits we should subtract by 9.
            sum = sum - 9;
        }
        total = total + sum;
        if (j === 1){ // each odd position should be multiplied by 2 not 1.
            j = 2;
        } else {
            j = 1;
        }
    }
    //console.log(total);
    return (total % 10) === 0; // to check if the the number is valid based on LUHN algorithm.
}

const findInvalidCards = nestedArr => { // takes a batch of CC numbers.
    newArr = []; // to store the invalid CC numbers.
    nestedArr.forEach(element => {  // to loop on each element of the array.
        let isValid = validateCred(element); // calling another function which checks the validity and returns true or false
        //console.log(isValid);
        if (!isValid){
            //console.log(element);
            newArr.push(element); // if the number is invalid the element should be pushed to the new array.
            //console.log(newArr);
        }
    });
    return newArr;
}

const idInvalidCardCompanies = nestInvalidArr => {
    let newInvalidArr = [];
    nestInvalidArr.forEach(element => {
        switch (element[0]) {  // to check which company owns the CC based on the first number.
            case 3:
                newInvalidArr.push('Amex');
                break;
            case 4:
                newInvalidArr.push('Visa');
                break;
            case 5:
                newInvalidArr.push('Mastercard');
                break;
            case 6:
                newInvalidArr.push('Discover');
                break;
            default:
                newInvalidArr.push('Company not found');
        }
    });
    let cleanInvalidArr = []; // to store the final array after removing duplicates.
    newInvalidArr.forEach((item) => {
        if (!cleanInvalidArr.includes(item)){ // if the item is already there, no need to move it again.
            cleanInvalidArr.push(item);
        }
    });
    return cleanInvalidArr;
}

console.log(`The invalid Credit Card numbers are:`);
console.log(findInvalidCards(batch));
let invalidCreditCards = findInvalidCards(batch);
console.log(`The Companies with Invalid CCs are:`);
console.log(idInvalidCardCompanies(invalidCreditCards));
/* console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3));
console.log(validateCred(valid4));
console.log(validateCred(valid5));
console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));
console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5)); */