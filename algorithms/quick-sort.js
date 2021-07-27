/*
Quicksort algorithm – Lomuto partition scheme
*/
function quickSort(
    A,
    compare = (a, pivot) => a < pivot,
    left = 0,
    right = A.length - 1
) {
    if (left >= right) {
        return;
    }

    let pivot = A[right];
    let swap = left;

    for (let i = left; i < right; i++) {
        if (compare(A[i], pivot)) {
            [A[swap], A[i]] = [A[i], A[swap]];
            swap++;
        }
    }

    [A[swap], A[right]] = [A[right], A[swap]];

    quickSort(A, compare, left, swap - 1);
    quickSort(A, compare, swap + 1, right);

    return A;
}

function quickSort_random(
    A,
    compare = (a, pivot) => a <= pivot,
    left = 0,
    right = A.length - 1
) {
    if (left >= right) return;

    let randomPivot = Math.floor(Math.random() * (right - left)) + left;

    [A[left], A[randomPivot]] = [A[randomPivot], A[left]];

    let pivot = left;
    let swap = left + 1;
    let end = right + 1;

    for (let i = swap; i < end; i++) {
        if (compare(A[i], A[pivot])) {
            [A[swap], A[i]] = [A[i], A[swap]];
            swap++;
        }
    }

    swap = swap - 1;
    [A[pivot], A[swap]] = [A[swap], A[pivot]];

    quickSort_random(A, compare, left, swap - 1);
    quickSort_random(A, compare, swap + 1, right);

    return A;
}

function quickSort_tp(
    A,
    compare = (a, pivot, pointer) => pointer === 0 ? a < pivot : a > pivot,
    left = 0,
    right = A.length - 1
) {
    if (left >= right) return;

    let pivot = A[parseInt((right + left) / 2)];
    let l = left;
    let r = right;

    while (l <= r) {
        while (compare(A[l], pivot, 0)) l++;
        while (compare(A[r], pivot, 1)) r--;

        if (l <= r) {
            [A[l], A[r]] = [A[r], A[l]];
            l++;
            r--;
        }
    }

    quickSort_tp(A, compare, left, l - 1);
    quickSort_tp(A, compare, l, right);

    return A;
}

function quickSort_tp_2(A) {
    function partition(left, right) {
        let pivot = A[parseInt((right + left) / 2)];
        let l = left;
        let r = right;

        while (l <= r) {
            while (A[l] < pivot) l++;
            while (A[r] > pivot) r--;

            if (l <= r) {
                [A[l], A[r]] = [A[r], A[l]];
                l++;
                r--;
            }
        }

        return l;
    }

    function qs(left, right) {
        while (right > left) {
            let p = partition(left, right);
            qs(p, right);
            right = p - 1;
        }
    }

    qs(0, A.length - 1);

    return A;
}

module.exports = { quickSort };


/* TEST */
const { getRandomNumberArray, getArray } = require('../utils');
const { testExecutor } = require('../test');

const sort = (arr) => arr.sort((a, b) => a - b);

testExecutor(
    () => getRandomNumberArray(10000, -100000, 100000),
    (arr) => sort([...arr]),
    (arr) => quickSort([...arr]),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
    {
        title: 'Lomuto partition scheme - default',
        disable: true
    }
)

testExecutor(
    () => getArray(10000).map((_, i) => i % 2 === 0 ? 0 : 1), // getRandomNumberArray(10000, -100000, 100000),
    (arr) => sort([...arr]),
    (arr) => quickSort_random([...arr]),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
    {
        title: 'Lomuto partition scheme - random',
        disable: true
    }
)

testExecutor(
    () => getArray(10000).map((_, i) => i % 2 === 0 ? 0 : 1), // getRandomNumberArray(10000, -100000, 100000),
    (arr) => sort([...arr]),
    (arr) => quickSort_tp([...arr]),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
    {
        title: 'Two pointers scheme',
        disable: true
    }
)

testExecutor(
    // () => [8, 4, 3, 1, 4, 5, 2, 4],
    () => getRandomNumberArray(10000, -100000, 100000),
    (arr) => sort([...arr]),
    (arr) => quickSort_tp_2([...arr]),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
    {
        // limit: 1,
        title: 'Two pointers + alexandrescu scheme',
        disable: false
    }
)