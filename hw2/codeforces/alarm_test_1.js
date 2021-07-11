const { getRandomNumberArray, getRandomInt } = require('../../utils');

function alarmClock(input) {
    const params = input.split('\n');
    let [n, x, k] = params[0].split(' ').map(n => +n);
    let N = params[1].split(' ').map(n => +n);

    // let R = new Map();
    // for (let i = 0; i < n; i++) {
    //     let val = N[i];
    //     let key = val % x;
    //     let pval = R.get(key);

    //     if (pval) val = Math.min(pval, val);
    //     R.set(key, val);
    // }
    // N = Array.from(R.values());


    let R = new Set();
    N = N
        .sort((a, b) => a - b)
        .filter((a) => {
            return R.has(a % x) ? false : (R.add(a % x) || true)
        })

    n = N.length;

    let bad = 0;
    let good = 9223372036854775807;

    while (good - bad > 1) {
        let mid = parseInt((bad + good) / 2);

        let count = 0;
        for (let i = 0; i < n; i++) {
            count += Math.max(parseInt(((mid - N[i]) / x) + 1), 0);
        }

        if (count >= k) good = mid;
        else bad = mid;
    }

    console.log(good);
}

// alarmClock(7, 5, 12, [5, 22, 17, 13, 8])
// alarmClock(6, 5, 10, [1,2,3,4,5,6])

// let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// process.stdin.on("data", (input) => _input += input);
// process.stdin.on("end", () => alarmClock(_input));

function alarmClock100Correct(x, n, k, N) {
    // const params = input.split('\n');
    // const [n, x, k] = params[0].split(' ').map(n => +n);
    // const N = params[1].split(' ').map(n => +n);

    let sequence = new Set();
    let deep = k;

    N = N.sort((a, b) => a - b)

    while (true) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < deep; j++) {
                sequence.add(N[i] + (x * j))
            }
        }

        let s = Array.from(sequence.values()).sort((a, b) => a - b);
        let r = s[k - 1]
        if (r) {
            return r
        }
    }
}

const Ns = [
    4,
    [234124, 51223, 14543, 1324, 42232, 42334, 23444, 564, 232, 56554],
    12,

    5,
    [5328, 234, 67843, 78909, 234, 634, 23452, 52345],
    34,

    4,
    [42345, 45632, 2124, 4324, 6785, 56789, 9876, 234, 5436, 654],
    120
]

function equal(Ns) {
    for (let i = 0; i < Ns.length; i += 3) {
        const x = Ns[i];
        const N = Ns[i + 1];
        const n = N.length;
        const k = Ns[i + 2];

        const c = alarmClock100Correct(x, n, k, N)
        const a = alarmClock(x, n, k, N)
        const equal = c === a;

        if (equal) {
            console.log(i, { c, a, equal: c === a });
        } else {
            console.log({ c, a, equal: c === a });
            console.log({ x, n, k, N });
            throw 's'
        }
    }
}

const _n = 10 ** 5;
const _k = 10 ** 9;
const _x = parseInt((10 ** 9) / 2);
const _ns = getRandomNumberArray(_n, 1, 10 ** 9).join(' ');
const input = `${_n} ${_k} ${_x}\n${_ns}`;

for (let i = 0; i < 0; i++) {
    console.time('a');
    alarmClock(input)
    console.timeEnd('a');
}

console.log('N', 10 ** 5);
console.log('X,K', 10 ** 9);
console.log('t', 10 ** 9);

let t1 = 10 ** 9
let k = 10 ** 9
let x = 10 ** 9

console.log(t1 + (k * x));