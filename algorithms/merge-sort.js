const { getRandomNumberArray, getRandomInt } = require('../utils');
const { testExecutor } = require('../test');

function mergeSort(A, compare = (a, b) => a <= b) {
    const merge = (A, Atmp, left, mid, right) => {
        let n = left;
        let i = left;
        let j = mid;
        // console.log();
        // console.log({ left, mid, right });
        // console.log(A);

        while (
            (i < mid && j < right) &&
            (A[i] !== undefined && A[j] !== undefined)
        ) {
            // console.log({ i, j });
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

        while (i < mid && A[i] !== undefined) { // copy from left
            Atmp[n] = A[i];
            i++;
            n++;
        }
        while (j < right && A[j] !== undefined) { // copy from right
            Atmp[n] = A[j];
            j++;
            n++;
        }

        // copy to origin
        // console.log(Atmp, left, right);
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
    // console.log(A);
    return A;
}

module.exports = { mergeSort };

// testExecutor(
//     () => getRandomNumberArray(getRandomInt(5, 1000), -100, 100),
//     (nums) => [...nums].sort((a, b) => a - b),
//     (nums) => mergeSort([...nums]),
//     (a, b) => JSON.stringify(a) === JSON.stringify(b),
//     // { limit: 1 }
// )