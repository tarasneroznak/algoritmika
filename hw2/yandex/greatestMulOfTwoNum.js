const { getRandomNumberArray } = require('../../utils');

const input1 = '4 3 5 2 5';
const input2 = '-4 3 -5 2 5';
const input3 = '12288 -10075 29710 15686 -18900 -17715 15992 24431 6220 28403 -23148 18480 -22905 5411 -7602 15560 -26674 11109 -4323 6146 -1523 4312 10666 -15343 -17679 7284 20709 -7103 24305 14334 -12281 17314 26061 25616 17453 16618 -24230 -19788 21172 11339 2202 -22442 -20997 1879 -8773 -8736 5310 -23372 12621 -25596 -28609 -13309 -13 10336 15812 -21193 21576 -1897 -12311 -6988 -25143 -3501 23231 26610 12618 25834 -29140 21011 23427 1494 15215 23013 -15739 8325 5359 -12932 18111 -72 -12509 20116 24390 1920 17487 25536 24934 -6784 -16417 -2222 -16569 -25594 4491 14249 -28927 27281 3297 5998 6259 4577 12415 3779 -8856 3994 19941 11047 2866 -24443 -17299 -9556 12244 6376 -13694 -14647 -22225 21872 7543 -6935 17736 -2464 9390 1133 18202 -9733 -26011 13474 29793 -26628 -26124 27776 970 14277 -23213 775 -9318 29014 -5645 -27027 -21822 -17450 -5 -655 22807 -20981 16310 27605 -18393 914 7323 599 -12503 -28684 5835 -5627 25891 -11801 21243 -21506 22542 -5097 8115 178 10427 25808 10836 -11213 18488 21293 14652 12260 42 21034 8396 -27956 13670 -296 -757 18076 -15597 4135 -25222 -19603 8007 6012 2704 28935 16188 -20848 13502 -11950 -24466 5440 26348 27378 7990 -11523 -26393';
const inputStress = getRandomNumberArray(10, -1000, 1000).join(' ');

// console.time('1');
// greatestMulOfTwoNum(input1);
// console.timeEnd('1');

// console.time('1s');
// greatestMulOfTwoNum_sort(input1);
// console.timeEnd('1s');

// console.time('2');
// greatestMulOfTwoNum(input2);
// console.timeEnd('2');

// console.time('2s');
// greatestMulOfTwoNum_sort(input2);
// console.timeEnd('2s');

// console.time('3');
// greatestMulOfTwoNum(input3);
// console.timeEnd('3');

// console.time('3s');
// greatestMulOfTwoNum_sort(input3);
// console.timeEnd('3s');

console.time('s');
greatestMulOfTwoNum(inputStress);
console.timeEnd('s');

console.time('ss');
greatestMulOfTwoNum_sort(inputStress);
console.timeEnd('ss');

function greatestMulOfTwoNum(input) {
    const numbers = input.trim().split(' ').map(n => +n);
    console.log(numbers);

    let greatest1 = numbers[0];
    let greatest2 = numbers[1];
    let mult = greatest1 * greatest2;

    for (let i = 2; i < numbers.length; i++) {
        const number = numbers[i];

        const mult1 = greatest1 * number;
        const mult2 = greatest2 * number;

        if (mult1 > mult && mult1 > mult2) {
            mult = mult1;
            greatest2 = number;
        }
        if (mult2 > mult && mult2 > mult1) {
            mult = mult2;
            greatest1 = number;
        }
    }

    const result = greatest1 > greatest2
        ? `${greatest2} ${greatest1}`
        : `${greatest1} ${greatest2}`;

    console.log(result);
}

function greatestMulOfTwoNum_sort(input) {
    const numbers = input.trim().split(' ').map(n => +n).sort((a, b) => a - b);
    const count = numbers.length;

    const result = numbers[0] * numbers[1] > numbers[count - 2] * numbers[count - 1]
        ? `${numbers[0]} ${numbers[1]}`
        : `${numbers[count - 2]} ${numbers[count - 1]}`;

    console.log(result);
}

// let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// process.stdin.on("data", (input) => _input += input);
// process.stdin.on("end", () => greatestMulOfTwoNum(_input));