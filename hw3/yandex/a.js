function mergeSort(A, compare = (a, b) => a <= b) {
    const merge = (A, Atmp, left, mid, right) => {
        let n = left;
        let i = left;
        let j = mid;

        while (
            (i < mid && j < right) &&
            (A[i] !== undefined && A[j] !== undefined)
        ) {
            if (compare(A[i], A[j])) {
                Atmp[n] = A[i];
                i++;
                n++;
            } else {
                Atmp[n] = A[j];
                j++;
                n++;
            }
        }

        while (i < mid && A[i] !== undefined) {
            Atmp[n] = A[i];
            i++;
            n++;
        }
        while (j < right && A[j] !== undefined) {
            Atmp[n] = A[j];
            j++;
            n++;
        }

        for (let i = left; i < right; i++) {
            if (Atmp[i] !== undefined) A[i] = Atmp[i];
        }
    }

    let len = A.length;
    if (len < 2) return A;

    let Atmp = new Array(len);

    for (let w = 1; w < len; w *= 2) {
        for (let i = 0; i < len; i += 2 * w) {
            let l = i;
            let m = i + w;
            let r = i + 2 * w;

            merge(A, Atmp, l, m, r);
        }
    }

    return A;
}

function observingStudents(n, m, intervals) {
    let points = [[-1, 1], [n, 0]];

    for (let i = 0; i < m; i++) {
        points.push([intervals[i][0], 0], [intervals[i][1], 1]);
    }

    mergeSort(points, (a, b) => {
        if (a[0] === b[0]) {
            return a[1] < b[1];
        }

        return a[0] < b[0];
    });

    let interval = -1;
    let count = 0;
    for (let i = 1; i < points.length; i++) {
        let curr = points[i];
        let prev = points[i - 1];

        if (curr[1] === 0) interval += 1;
        else interval -= 1;

        let diff = curr[0] - prev[0];
        let gap = curr[1] === 0 && prev[1] === 1 && diff > 1;

        if (gap && interval === 0) {
            count += diff - 1;
        }
    }

    // console.log(count);
    return count;
}

function onEndStdin(input) {
    const params = input.split('\n').filter(Boolean);
    const [n, m] = params[0].split(' ').map(n => +n);
    const intervals = params.slice(1).map(line => line.split(' ').map(n => +n));

    observingStudents(n, m, intervals);
}

// let _input = "";
// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// process.stdin.on("data", (input) => _input += input);
// process.stdin.on("end", () => onEndStdin(_input));

/* TEST */

const { getArray, getRandomNumberArray, getRandomInt } = require('../../utils');
const { testExecutor } = require('../../test');

function correct_observingStudents(n, m, intervals) {
    const set = new Set();

    for (let i = 0; i < m; i++) {
        let a = intervals[i][0];
        let b = intervals[i][1];
        if (b - a > 1) {
            for (let j = a; j <= b; j++) set.add(j);
        }
        else {
            set.add(intervals[i][0]);
            set.add(intervals[i][1]);
        }
    }

    return n - set.size
}

testExecutor(
    () => {
        // return [10, 5, [[5, 5], [2, 2], [3, 3], [1, 8], [2, 3]]]

        let n = 1000 // getRandomInt(1, 10 ** 6);
        let m = 584 // getRandomInt(1, 10 ** 3);
        let M = getArray(m).map(() => {
            let b = getRandomInt(0, n - 1);
            let e = getRandomInt(b, n - 1);
            return [b, e];
        })
        return [n, m, M];
    },
    (params) => correct_observingStudents(...params),
    (params) => observingStudents(...params),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
    // { limit: 100 }
)