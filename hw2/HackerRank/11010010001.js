/*

1
10
100
1000
...

кожного разу послідовність збільшується 1
1 + (n(n + 1) / 2) = (n^2 + n + 2) / 2

з вікі розділ - "Критерий треугольности числа"
"Натуральное число x является треугольным тогда и только тогда, когда число 8x+1 является полным квадратом."
а 10 100 1000 ... це і є повні квадрати

(n^2 + n + 2) / 2 = x
n^2 + n + 2 = 2x - квадратне рівняння

квадратні рівняння можливо вирішити церез виділення повного квадрату

n^2 - перший доданок не є повним квадратом
n - і другий не парний

можна домножити все рівняння на 4
(n^2 - n + 2 = 2x) * 4 => 4n^2 + 4n + 8 = 8x

з вікі розділ - "Критерий треугольности числа"
4n^2 + 4n + 1 = (2n + 1)^2

переносимо 7 в праву і в лівій частині залишається = 4n^2 + 4n + 1

4n^2 + 4n + 1 = 8x - 7 / ліву частину можемо замінити на (2n + 1)^2
(2n + 1)^2 = 8x - 7
2n + 1 = sqrt(8x - 7)
n = (sqrt(8x - 7) - 1) / 2

*/

const input = `4
3
14
7
6`

function parseInputData(input, delimiter = '\n', fn) {
    const splited = input.split(delimiter).filter(Boolean);

    if (typeof fn === 'function') {
        return splited.map(fn);
    }

    return splited;
}

function processData(input) {
    const data = input.split('\n').filter(Boolean).map(n => +n);
    const indexes = data.slice(1);
    const result = [];

    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const triangularNumberPosition = (Math.sqrt((8 * index) - 7) - 1) / 2;
        result.push(triangularNumberPosition % 1 === 0 ? 1 : 0);
    }

    console.log(result.join(' '));
}

processData(input);


let n = 2
let e = 1 + ((n * (n - 1)) / 2)
n = 3
let ez = 1 + ((n * (n - 1)) / 2)
n = 4
let ek = 1 + ((n * (n - 1)) / 2)

console.log({ e, ez, ek});