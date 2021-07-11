const input1 = `5 5
1 3 5 7 9
2 4 8 1 6`

const input2 = `6 11
1 1 4 4 8 120
1 2 3 4 5 6 7 8 63 64 65`

const input3 = `10 10
-5 1 1 3 5 5 8 12 13 16
0 3 7 -17 23 11 0 11 15 7`

let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
process.stdin.on("data", (input) => _input += input);
process.stdin.on("end", () => approximateBinarySearch(_input));

// console.time('1');
// approximateBinarySearch(input1);
// console.timeEnd('1');

// console.time('2');
// approximateBinarySearch(input2);
// console.timeEnd('2');

// console.time('3');
// approximateBinarySearch(input3);
// console.timeEnd('3');

function approximateBinarySearch(input) {
    const params = input.trim().split('\n');
    const N = params[1].split(' ').map(n => +n);
    const K = params[2].split(' ').map(n => +n);
    const output = [];

    function getInsertPosition(x, arr) {
        let bad = -1;
        let good = arr.length;

        while (good - bad > 1) {
            const mid = parseInt((bad + good) / 2);
            if (arr[mid] >= x) good = mid;
            else bad = mid;
        }

        return good;
    }

    for (let i = 0; i < K.length; i++) {
        const ke = K[i];

        const index = getInsertPosition(ke, N);
        
        const l = N[index - 1] || Number.MIN_VALUE;
        const r = N[index] || Number.MAX_VALUE;
        const dl = Math.abs(ke - l); // left distance
        const dr = Math.abs(ke - r); // right distance

        let value;
        if (dl === dr) value = Math.min(l, r);
        else value = dl > dr ? r : l;

        output.push(`${value}`);
    }

    console.log(output.join('\n'));
}