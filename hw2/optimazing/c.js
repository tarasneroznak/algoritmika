const { getRandomNumberArray, getRandomInt } = require('../../utils');

function _sinx(N, terms, x = [], result = []) {
    for (let i = 0; i < N; i++) {
        let value = x[i];
        let number = x[i] * x[i] * x[i];
        let denom = 6;
        let sign = -1;

        for (let j = 1; j <= terms; j++) {
            value += (sign * number) / denom;
            number *= x[i] * x[i];
            denom *= (2 * j + 2) * (2 * j + 3);
            sign *= -1;
        }

        result[i] = value;
    }

    return result
}

// кеш факторіалу
const f_cache = [1 / 6];
// кеш степенів X, не придумав варіанту як реалізувати через масив, тому зробив через обєкт
/*
x - ключ до масиву 
{
    3: [27, 243, ...]
}
*/
const x_cache = {};

function sinx(N, terms, x = [], result = []) {
    for (let i = 0; i < N; i++) {
        let value = x[i];
        // отримання з кешу, код не супер читабельний
        // перевіряємо чи є в кеші якщо ні то розраховуємо
        let number = (x_cache[x[i]] && x_cache[x[i]][0]) || (x_cache[x[i]] = [x[i] * x[i] * x[i]]);
        let denom = f_cache[0];
        let sign = -1;

        for (let j = 1; j <= terms; j++) {
            value += (sign * number) * denom;
            // так само як і в попередньому
            number = x_cache[x[i]][j] || (x_cache[x[i]][j] = x_cache[x[i]][j - 1] * x[i] * x[i]);
            // отримання з кешу факторіалу (1 / факторіал), або ж розраховується 
            // для 5! беремо 1/6 і ділемо на 4 і 5 = 1 / 5!
            denom = f_cache[j] || (f_cache[j] = f_cache[j - 1] / (2 * j + 2) / (2 * j + 3));
            sign = -sign;
        }

        result[i] = value;
    }

    return result
}

function sinx_best(N, terms, x = [], result = []) {
    let denoms = [-(1 / 6)];
    let sign = -1;
    // кешуємо факторіали
    for (let j = 1; j <= terms; j++) {
        denoms[j] = sign * (denoms[j - 1] / (2 * j + 2) / (2 * j + 3));
        sign = -sign;
    }
    console.log(denoms);
    for (let i = 0; i < N; i++) {
        let value = x[i];
        let number = x[i] * x[i] * x[i];
        let numberSquare = x[i] * x[i];
        let denom = denoms[0];

        for (let j = 1; j <= terms; j++) {
            value += number * denom;
            number = number * numberSquare
            denom = denoms[j];
        }

        result[i] = value;
    }

    return result
}

const n = getRandomInt(1, 30);
const t = 7 //getRandomInt(3, 7);
const x = getRandomNumberArray(n, 1, 300);

console.time('_sinx');
let r1 = _sinx(n, t, x);
console.log(r1);
console.timeEnd('_sinx');

console.time('sinx');
let r2 = sinx(n, t, x);
console.log(r2);
console.timeEnd('sinx');

console.time('sinx_best');
let r3 = sinx_best(n, t, x);
console.log(r3);
console.timeEnd('sinx_best');

