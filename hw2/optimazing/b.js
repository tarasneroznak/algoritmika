function calc(a = [], x = 1) {
    // y = a_n * x ^ n + 
    //     a_n-1 * x ^ (n-1) + 
    //     ... + 
    //     a_2 * x ^ 2 + 
    //     a_1 * x +
    //     a_0

    let y = a[0]
    let xi = 1
    let n = a.length;

    // console.log({ y, xi, n });

    for (let i = 1; i < n; i++) {
        xi = x * xi
        y = y + a[i] * xi
    }

    return y;
}

function horner(a, x) {
    let y = a[0];
    let n = a.length;

    for (let i = 1; i < n; i++) {
        y = y * x + a[i];
    }

    return y;
}

const x = 2;
const a = Array.from({ length: 5 }, (_, i) => ++i);

// console.time('a')
// console.log('calc', calc([2, -6, 2, -1], 3));
// console.log('1', calc(a, x));
// console.timeEnd('a')

// console.time('h')
// console.log("horner", horner([2, -6, 2, -1], 3));
// console.log("horner", horner(a, x));
// console.timeEnd('h')
