const { getRandomInt, getRandomNumberArray } = require('../../utils');

const n = getRandomInt(199_999, 200_000);
const ci = getRandomNumberArray(n, 0, 1_000_000).join(' ');
const q = getRandomInt(199_999, 200_000);

function comandGenerator(q) {
    const comands = ['COUNT', 'ENTER', 'LEAVE'];

    return Array.from({ length: q }, () => {
        const comand = comands[getRandomInt(0, 2)];
        const id = getRandomInt(1, n);

        if (comand === 'COUNT') {
            return comand + ` ${id} ${getRandomInt(id, n)}`;
        }

        return comand + ` ${id}`;
    }).join('\n');
}

// const input = `${n}
// ${ci}
// ${q}
// ${comandGenerator(q)}`

const input = `5
2 0 2 3 1
9
COUNT 2 4
ENTER 2
LEAVE 1
COUNT 2 4
LEAVE 5
COUNT 4 5
COUNT 1 2
ENTER 2
COUNT 1 2`

/*
COUNT 2 4   -> 5
ENTER 2     -> 2 1 3 3 1 
LEAVE 1     -> 1 1 3 3 1
COUNT 2 4   -> 6
LEAVE 5     -> 1 1 3 3 0
COUNT 4 5   -> 3
COUNT 1 2   -> 2
ENTER 2     -> 1 2 3 3 0
COUNT 1 2   -> 3
*/

function mergeIntervals(data) {
    const storage = new Map();
    const n = data.length;
    const values = [...data];
    const intervals = parseInt(Math.sqrt(n));

    for (let i = 0; i < n; i++) {
        const interval = parseInt(i / intervals);
        storage.set(interval, (storage.get(interval) || 0) + values[i]);
    }

    return {
        update: (id, operation) => {
            let index = id - 1;
            let interval = parseInt((index) / intervals);
            let value = storage.get(interval) || 0;

            if (operation === '+') {
                value += 1;
                values[index] += 1;
            } else {
                value -= 1;
                values[index] -= 1;
            }

            storage.set(interval, value);
        },
        get: (fromId, toId) => {
            let from = fromId - 1;
            let to = toId - 1;
            let sum = 0;

            while (from <= to) {
                let isStartInterval = from % intervals === 0;
                let isOneInterval = from + intervals <= to;

                if (isStartInterval && isOneInterval) {
                    let interval = parseInt(from / intervals);
                    let value = storage.get(interval) || 0;

                    sum += value;
                    from += intervals;
                } else {
                    sum += values[from];
                    from += 1;
                }
            }

            return sum;
        }
    }
}

function processData(input) {
    const data = input.split('\n');
    const comands = data.slice(3);
    const counts = data[1].split(' ').map(n => +n);
    const intervals = mergeIntervals(counts);

    for (let i = 0; i < comands.length; i++) {
        const params = comands[i].split(' ');
        const comand = params[0];
        const f = +params[1];
        const t = +params[2];

        if (comand === 'ENTER') intervals.update(f, '+')
        if (comand === 'LEAVE') intervals.update(f, '-')
        if (comand === 'COUNT') console.log(intervals.get(f, t))
    }
}


console.time('result2')
processData(input);
console.timeEnd('result2')

// const st = segmentTree([2, 0, 2, 3, 1]);
// console.log(st.sum(1, 2));
// console.log(st.get(2));
// st.update(2, '+')
// console.log(st.get(2));
// console.log(st.sum(1, 2));
