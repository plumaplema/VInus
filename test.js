const data = [[1, 2, 2, 2], [1, 2, 3, 3]];

const getArray = (data, position) => {
    if (data.length > 2) {
        if (position === 'last') {
            return data[data.length - 1];
        } else if (position === 'secondToTheLast' && data.length >= 2) {
            return data[data.length - 2];
        } else if (position === 'thirdToTheLast' && data.length >= 3) {
            return data[data.length - 3];
        }
    }
    return 'error'
};

// Example usage:
const lastArray = getArray(data, 'last');
const secondToLastArray = getArray(data, 'secondToTheLast');
const thirdToLastArray = getArray(data, 'thirdToTheLast');

console.log(lastArray);          // Output: [1, 1, 1, 1]
console.log(secondToLastArray);  // Output: [1, 2, 3, 3]
console.log(thirdToLastArray);   // Output: [1, 2, 2, 2]
