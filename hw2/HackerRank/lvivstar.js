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

const parseInputData = (input, delimiter = '\n') => input.split(delimiter).filter(Boolean);

// function sum(arr, from, to) {
//     if (from === to) {
//         return arr[from];
//     }

//     let s = 0;
//     let i = from;

//     while (from <= i && i <= to) {
//         s += arr[i];
//         i++;
//     }

//     return s;
// }

// function processData(input) {
//     const data = parseInputData(input);
//     const q = +data[2];
//     const counts = parseInputData(data[1], ' ').map(n => +n);
//     const comands = data.slice(3);

//     for (let i = 0; i < q; i++) {
//         const params = parseInputData(comands[i], ' ');
//         const comand = params[0];
//         const f = +params[1] - 1;
//         const t = +params[2] - 1;

//         if (comand === 'ENTER') {
//             counts[f] += 1;
//         }
//         if (comand === 'LEAVE') {
//             counts[f] -= 1;
//         }

//         if (comand === 'COUNT') {
//             const s = sum(counts, f, t);
//             // console.log(s);
//         }
//     }
// }


function segmentTree(values) {
    const n = values.length - 1;
    const tree = [];

    create();

    function _getWay(index, left, right) {
        const middle = Math.floor((left + right) / 2);
        const leftIndex = index * 2;
        const rightIndex = leftIndex + 1;

        return {
            middle,
            leftIndex,
            rightIndex
        }
    }

    /*
    values = [2 0 2 3 1]
            /[0 1 2 3 4] - indexes

                            ([0,4] = 8)                             -> 0 + 4 / 2
                            /         \ 
                ([0,2] = 4)          ([3,4] = 4)
                /         \           /         \
        ([0,1] = 2)    ([2,2] = 2)  ([3,3] = 3)    ([4,4] = 1)
        /       \
    ([0,0]=2)  ([1,1]=0)

    tree = [empty, 8, 4, 4, 2, 2 3, 1, 2, 0]
    */
    function create(index = 1, left = 0, right = n) {
        if (left === right) return tree[index] = values[left];

        const { middle, leftIndex, rightIndex} = _getWay(index, left, right);

        create(leftIndex, left, middle);
        create(rightIndex, middle + 1, right);

        tree[index] = tree[leftIndex] + tree[rightIndex];
    }

    // (log n)
    function update(id, operation, index = 1, left = 0, right = n) {
        // коли left === right то ми дійшли до кінця дерева
        if (left === right) {
            return tree[index] = operation === '+'
                ? tree[index] + 1
                : tree[index] - 1;
        }

        // отрумуємо середину дерева
        const { middle, leftIndex, rightIndex } = _getWay(index, left, right);

        // якщо id менщий або рівний середині то переходимо на ліву сторону дерева
        if (id <= middle) update(id, operation, leftIndex, left, middle);
        else update(id, operation, rightIndex, middle + 1, right);

        // після обновлення значення по id перераховуємо значення інтерварів
        tree[index] = tree[leftIndex] + tree[rightIndex];
    }

    // пошук аналогічний 'update' (log n)
    function get(id, index = 1, left = 0, right = n) {
        if (left === right) return tree[index]

        const { middle, leftIndex, rightIndex } = _getWay(index, left, right);

        if (id <= middle) return get(id, leftIndex, left, middle);
        else return get(id, rightIndex, middle + 1, right);
    }

    // (2 log n)
    function sum(fromId, toId, index = 1, left = 0, right = n) {
        /*
            наприклад sum(1,2)
            
            перша ітерація
            index = 1, fromId = 1, toId = 1, left = 0, right = 4
            => не виходить за гранці інтервалу + 
            => не входить в межі інтервалу
            / перехід до дітей першої вершини

                права сторона [3,4] виходить за межі [1,2] повертаємо 0

                ліва сторона
                index = 2, fromId = 0, toId = 1, left = 0, right = 2
                => не виходить за гранці інтервалу + 
                => не входить в межі інтервалу
                / перехід до дітей другої вершини

                    права сторона [1,1] не покриває межі [1,2] повертаємо 0

                    ліва сторона
                    index = 4, fromId = 0, toId = 1, left = 0, right = 1
                    => не виходить за гранці інтервалу
                    => повністю співпадає з інтервалом, повертаємо 2
                    
            => 0 + 0 + 2 = 2
        */
        
        // якщо заданий не правильний інтервал повертаємо нуль
        if (left > toId || right < fromId) return 0;
        // Якщо інтервал [fromId,toId] входить в [left, rigth] то повертаемо значення
        if (fromId <= left && right <= toId) return tree[index];

        const { middle, leftIndex, rightIndex } = _getWay(index, left, right);

        const sLeft = sum(fromId, toId, leftIndex, left, middle);
        const sRight = sum(fromId, toId, rightIndex, middle + 1, right);
        return sLeft + sRight;
    }

    return {
        get,
        sum,
        update
    }
}

function processData(input) {
    const data = parseInputData(input);
    const q = +data[2];
    const comands = data.slice(3);

    const counts = parseInputData(data[1], ' ').map(n => +n);
    const st = segmentTree(counts);

    for (let i = 0; i < q; i++) {
        const params = parseInputData(comands[i], ' ');
        const comand = params[0];
        const f = +params[1] - 1;
        const t = +params[2] - 1;

        if (comand === 'ENTER') st.update(f, '+')
        if (comand === 'LEAVE') st.update(f, '-')
        if (comand === 'COUNT') console.log(st.sum(f, t))
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
