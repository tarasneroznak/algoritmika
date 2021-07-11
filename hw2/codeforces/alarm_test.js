/*
n = 5
x = 7
k = 12

1 5  10 16
2 7  12 17
3 8  13 18
4 9  14 19
5 10 15 20
6 11 17 21

6 5 7
1 2 3 4 5 6 7

r = 7

k = 12 - [i = 2, j = 5] = 27
k = 10 - [i = , j = ] =
k = 11 - [i = , j = ] =

5, 12, 19, 26, 33
22, 29, 36, 43, 50
17, 24, 31, 38, 45
13, 20, 27, 34, 41
8, 15, 22, 29, 36

1, 2, 3,  4,  5,  6,  7,  8   9   10  11  12  13  14
5, 8, 12, 13, 15, 17, 19, 20, 22, 24, 26, 27, 29, 36

5
8  12
13 15 19
17 20 22 26
22 24 27 29 33
29 31 34 36
36 38 41
43 45
50

0     1   2   3   4
5,  | 12, 19, 26, 33
8,  | 15, 22, 29, 36
13, | 20, 27, 34, 41
17, | 24, 31, 38, 45
22, | 29, 36, 43, 50

K = 12
n = 43

(43 - 7) / 12 = 3
(x - 7) / 12 = y

R = 27

    1    2   3   4   5
    0    1   2   3   4
----------------------
1 | 5,  12, 19, 26, 33 
2 | 6,  13, 20, 27, 34 -
3 | 7,  14, 21, 28, 35 -
4 | 8,  15, 22, 29, 36
5 | 9,  16, 23, 30, 37 -
6 | 10, 17, 24, 31, 38 -
7 | 11, 18, 25, 32, 39 -
8 | 12, 19, 26, 33, 40 -
9 | 13, 20, 27, 34, 41
            |       
            43 / t_1 + (i * X) => 13 + (2 * 7)

9 + (5 - 1) = 13

*/

const { getRandomNumberArray, getRandomInt } = require('../../utils');

const _n = 3;
const _k = 21;
const _x = 25;
const inputStress = `${_n} ${_k} ${_x}\n${getRandomNumberArray(_n, 1, _x).join(' ')}`;

// console.time('s');
// alarmClock(inputStress);
// console.timeEnd('s');

// 12
// 2 + 2
// 4 + 2
// 6 + 2

/* 
3 2 7\n2 4 6

2 4(4) 6(6 6) 8(8 8) 10(10 10) 12(12 12) 14(14 14)

2 4 6  8  10 12
4 6 8  10 12 14
6 8 10 12 14 16

*/

// console.time('1');
// alarmClock('10 5 10\n1 1 1 2 3 4 4 5 5 6 6');
// console.timeEnd('1');

// console.time('1');
// alarmClock('6 5 10\n1 2 3 4 5 6');
// console.timeEnd('1');

// 1 6 11
// 2 7 12
// 3 8 13
// 4 9 14
// 5 10 15
// 6 11 16

// console.time('2');
// alarmClock('5 7 12\n5 22 17 13 8');
// console.timeEnd('2');

// console.time('2');
// alarmClock('10 7 12\n5 5 22 22 17 17 13 13 8 8');
// console.timeEnd('2');

// 1, 2, 3   4,  5,  6,  7,  8,  9 ,10,                                  11, 12, 13
// 5, 8, 12, 13, 15, 17, 19, 20, 22 (2-й и 5-й будильники одновременно), 24, 26, 27

// console.time('t');
// alarmClock('6 1 15\n1 1 1 2 2 2');
// console.timeEnd('t');

// console.time('t');
// alarmClock('5 2 7\n2 4 6 8 10');
// console.timeEnd('t');

function alarmClock(input) {
    const params = input.split('\n');
    const [n, x, k] = params[0].split(' ').map(n => +n);
    const N = params[1].split(' ').map(n => +n);

    // N - количество будильников
    // X - периодичность звонков 
    // K - количество будильников которое нужно отключить
    // t_i, t_i + X, t_i + 2 * X -> t_i + (i * X) = T - момент часу
    /*
        t_1 + (i * X) = T
        5 + (0 * 7) = 5
        5 + (1 * 7) = 12
        5 + (2 * 7) = 19
        5 + (3 * 7) = 26
        S = n * (t_1 + t_n) / 2 = 3 * (5 + 19) / 2 = 36

        i = (T - t_1) / X - кількість викликів
        i = (26 - 5) / 7 = 3
        i = (27 - 5) / 7 = 3
    */


    // 36 = ((10 + 7(n-1)) * n) / 2

    // a + (x * (n - 1)) = T
    // x * (n - 1) = T - a
    // n - 1 = (T - a) / x
    // n = ((T - a) / x) + 1

    // 1, 2, 3,  4,  5,  6,  7,  8   9   10  11  12  13  14
    // 5, 8, 12, 13, 15, 17, 19, 20, 22, 24, 26, 27, 29, 36

    /*
    1     2   3   4   5
    5,  | 12, 19, 26, 33 40
    8,  | 15, 22, 29, 36
    13, | 20, 27, 34, 41
    17, | 24, 31, 38, 45
    // 22, | 29, 36, 43, 50
                                                                    12
                                                                    |
    5, 8(8), 12, 13, 15(15,15), 17, 19, 20, 22(22,22,22), 24, 26, 27, 29
                                                                    | 
                                                                    17

    4.142857142857142 ; 5
    1.7142857142857144 ; 22 (22) - 7142857142857144
    2.428571428571429 ; 17
    3 0 ; 13
    3.7142857142857144 ; 8 (22) - 7142857142857144 // залишок рівний

    sum 15

    15 - 1.7142857142857144 = 13.2857142857
    15 - = 3.7142857142857144 11.2857142857

    */

    const filterSameAlarms = (n, N) => {
        const entries = N.map((a) => [((a / x) % 1).toFixed(10), a]);
        const remainders = {};

        for (let i = 0; i < n; i++) {
            const [r, value] = entries[i];

            if (remainders[r]) {
                remainders[r] = remainders[r] < value ? remainders[r] : value;
            } else {
                remainders[r] = value;
            }
        }
        console.log(remainders);
        return Object.values(remainders);
    }
    const getCountOfAlarms = (T, alarm) => parseInt(Math.max(((T - alarm) / x) + 1, 0));
    const getSumOfAlarmsCount = (A, T) => A.reduce((s, a) => s + getCountOfAlarms(T, a), 0);

    const A = filterSameAlarms(n, N);

    if (k === 12) console.log(k, ';', '27', ';', getSumOfAlarmsCount(A, 27));
    if (k === 10) console.log(k, ';', '10', ';', getSumOfAlarmsCount(A, 10));
    if (k === 15) console.log(k, ';', '15', ';', getSumOfAlarmsCount(A, 15));
    if (k === 7) console.log(k, ';', '14', ';', getSumOfAlarmsCount(A, 14));
}


const filterSameAlarms = (n, N, x, f = 1) => {
    const remainders = {};

    for (let i = 0; i < n; i++) {
        const val = N[i];
        const r = ((val / x) % 1).toFixed(f);
        if (remainders[r] !== undefined) {
            remainders[r] = Math.min(remainders[r], val);
        } else {
            remainders[r] = val;
        }
    }

    console.log(remainders);

    return Object.values(remainders);
}

let x = 10 ** 9;
let arr = Array.from({ length: 100 }, (_, i) =>  getRandomInt(1,x));
// let arr = [5, 22, 17, 13, 8];
let l = arr.length;

let deep = 4;
arr.forEach(n => {
    let v = []
    for (let i = 0; i <= deep; i++) {
        // a + (x * (n - 1)) = T
        v.push(n + (x * i));
    }

    console.log(v.join(', '));
})

console.log(
    filterSameAlarms(l, arr, x, 1),
    filterSameAlarms(l, arr, x, 10)
);
