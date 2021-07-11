const m = 2; // money
const n = 2; // count of types
const ci = [1, 2, 3, 4, 5]; // prices

const input = `2
4
5
1 4 5 3 2
4
4
2 2 4 3`

// 2 (t) - count of trips
// 4 (m) - money
// 5 (n) - count of types
// 1 4 5 3 2 (ci) - prices by type

function processData(input = '') {
    const data = input.split('\n').filter(Boolean).slice(1);

    for (let t = 0; t < data.length; t += 3) {
        const n = +data[t + 1];
        const ci = data[t + 2].split(' ').map(n => +n);
        const m = +data[t + 0];

        calculate(n, m, ci);
    }

    function calculate(n, m, ci) {
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (ci[i] + ci[j] === m) {
                    return console.log([i + 1, j + 1].join(' '));
                }
            }
        }
    }
}

function processData2(input = '') {
    const data = input.split('\n').filter(Boolean).slice(1);

    for (let t = 0; t < data.length; t += 3) {
        const m = +data[t + 0];
        const n = +data[t + 1];
        const ci = data[t + 2].split(' ').map(n => +n);
        const cache = new Map();

        for (let i = 0; i < n; i++) {
            const remainder = m - ci[i];
            const cached = cache.get(remainder);
            if (cached !== undefined) {
                console.log([cached + 1, i + 1].join(' '));
                break;
            }
            cache.set(ci[i], i);
        }
    }
}

// const at = [];
// const bt = [];

// for (let i = 0; i < 1000; i++) {
//     let sa = Date.now();
//     processData(input);
//     at.push(Date.now() - sa);

//     let sb = Date.now();
//     processData2(input);
//     bt.push(Date.now() - sb);
// }

// console.log(
//     'a:',
//     at.reduce((a, i) => a + i) / at.length
// );


// console.log(
//     'b:',
//     bt.reduce((a, i) => a + i) / bt.length
// );

// processData(input);
// console.timeEnd('a');
// console.time('b');
// processData2(input);
// console.timeEnd('b');