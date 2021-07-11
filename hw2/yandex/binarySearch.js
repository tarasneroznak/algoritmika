const { getRandomNumberArray, getRandomInt } = require('../../utils');

const input1 = `10 10
1 61 126 217 2876 6127 39162 98126 712687 1000000000
100 6127 1 61 200 -10000 1 217 10000 1000000000`

const input2 = `10 10
-8 -6 -4 -4 -2 -1 0 2 3 3
8 3 -3 -2 2 -1 2 9 -8 0`

const input3 = `10 5
1 2 3 4 5 6 7 8 9 10
-2 0 4 9 12`

const n = getRandomInt(99_999, 100_000)
const inputStress = `${n} ${n}
${getRandomNumberArray(n, -100000, 100000).sort((a, b) => a - b).join(' ')}
${getRandomNumberArray(n, -10000, 10000).join(' ')}`

// console.time('1');
// binarySearch(input1);
// console.timeEnd('1');

console.time('2');
binarySearch(input2);
console.timeEnd('2');

// console.time('3');
// binarySearch(input3);
// console.timeEnd('3');

// console.time('s');
// binarySearch(inputStress);
// console.timeEnd('s');

function binarySearch(input) {
    const params = input.trim().split('\n');
    const [n, k] = params[0].split(' ').map(n => +n);
    const N = params[1].split(' ').map(n => +n);
    const K = params[2].split(' ').map(n => +n);

    const nFirst = N[0];
    const nLast = N[n - 1];
    const finded = new Map();

    function search(x, elements, bad = -1, good = n) {
        if (finded.has(x)) return finded.get(x);

        while (good - bad > 1) {
            const mid = Math.ceil((bad + good) / 2);
            const el = elements[mid];
            if (el === x) {
                finded.set(x, mid);
                return mid;
            }
            if (el > x) good = mid; else bad = mid;
        }

        finded.set(x, -1);
        return -1;
    }

    let result = [];
    for (let i = 0; i < k; i++) {
        const el = K[i];

        if (el < nFirst || el > nLast) {
            result.push('NO');
        } else {
            const index = search(el, N);
            if (index === -1) result.push('NO');
            else result.push('YES');
        }
    }

    console.log(result.join('\n'));
}

// let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// process.stdin.on("data", (input) => _input += input);
// process.stdin.on("end", () => binarySearch(_input));

// let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// process.stdin.on("data", (input) => _input += input);
// process.stdin.on("end", () => binarySearch(_input));
