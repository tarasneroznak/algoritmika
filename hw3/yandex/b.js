const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', onInputLine)

let lines = 0;
let N;
let M;
let points = [];

function onInputLine(line) {
    let nums = line.split(' ').map(Number);

    if (lines === 0) {
        N = nums[0];
        M = nums[1];
    }
    else if (lines <= N) {
        points.push(
            { x: Math.min(nums[0], nums[1]), t: 0 },
            { x: Math.max(nums[0], nums[1]), t: 2 }
        );
    }
    else if (lines === N + 1) {
        points.push(...nums.map((x, i) => ({ x, t: 1, i })));
        pointsAndLines(N, M, points);
    }

    lines++;
}

function quickSort_tp(A) {
    function partition(left, right) {
        let pivot = A[parseInt((right + left) / 2)];
        let l = left;
        let r = right;

        while (l <= r) {
            while (A[l].x === pivot.x ? A[l].t < pivot.t : A[l].x < pivot.x) l++;
            while (A[r].x === pivot.x ? A[r].t > pivot.t : A[r].x > pivot.x) r--;

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

    return qs(0, A.length - 1);
}

function pointsAndLines(N, M, points) {
    quickSort_tp(points);

    let count = 0;
    let result = Array.from({ length: M }, () => '0');
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (point.t === 1) result[point.i] = count.toString();
        if (point.t === 0) count += 1;
        if (point.t === 2) count -= 1;
    }

    console.log(result.join(' '));
}