const { getRandomInt } = require('../../utils');

const input1 = `3 2 2
1 1
2 2`

const input2 = '2 2 0'

const input3 = `4 4 4
1 3
2 1
4 2
4 4`

const r = 100;
const c = 100;

let ms = [];
for (let i = 1; i <= r; i++) for (let j = 1; j <= c; j++) ms.push(`${i} ${j}`);
ms = ms.filter((_, i) => i % getRandomInt(5, 9) === 0)
const inputStress = `${r} ${c} ${ms.length}\n${ms.join('\n')}`

console.time('1');
sapper(input1);
console.timeEnd('1');

console.time('2');
sapper(input2);
console.timeEnd('2');

console.time('3');
sapper(input3);
console.timeEnd('3');

console.time('s');
sapper(inputStress);
console.timeEnd('s');

function sapper(input) {
    const params = input.split('\n');
    const [N, M] = params[0].split(' ').map(n => +n);
    const qp = params.slice(1);

    const mines = new Set(qp.map(i => i.replace(' ', '_')).values());
    const hasMine = (i, j) => mines.has(`${i}_${j}`);
    const numberOfMinesAround = (i, j) => Number(hasMine(i, j));

    const row = [];
    for (let i = 1; i <= N; i++) {
        const col = [];
        for (let j = 1; j <= M; j++) {
            if (hasMine(i, j)) {
                col.push('*');
            } else {
                const lt = numberOfMinesAround(i - 1, j - 1);
                const t = numberOfMinesAround(i - 1, j);
                const rb = numberOfMinesAround(i - 1, j + 1);
                const l = numberOfMinesAround(i, j - 1);
                const r = numberOfMinesAround(i, j + 1);
                const lb = numberOfMinesAround(i + 1, j - 1);
                const b = numberOfMinesAround(i + 1, j);
                const rt = numberOfMinesAround(i + 1, j + 1);

                col.push(t + b + l + r + lt + lb + rt + rb);
            }
        }

        row.push(col.join(' '));
    }

    console.log(row.join('\n'));
}

// let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// process.stdin.on("data", (input) => _input += input);
// process.stdin.on("end", () => sapper(_input));