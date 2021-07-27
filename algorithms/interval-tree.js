// TODO

function intervalTree(intervals) {
    const T = create(intervals);

    function create(intervals) {
        if (intervals.length === 0) return null;

        let result = {};
        let mid = getMid(intervals);

        let L = [];
        let M = [];
        let R = [];

        for (let i = 0; i < intervals.length; i++) {
            const interval = intervals[i];
            if (isHigh(mid, interval)) L.push(interval);
            if (isLow(mid, interval)) R.push(interval);
            if (isBetween(mid, interval)) M.push(interval);
        }

        result.mid = mid;

        result.L = create(L);
        result.R = create(R);
        result.M = M;

        return result;
    }

    function cross(x) {
        let count = 0;

        const search = (tree) => {
            if (tree === null) {
                return;
            }

            count += isBetweens(x, tree.M);

            if (x < tree.mid) {
                search(tree.L);
            }

            if (x > tree.mid) {
                search(tree.R);
            }

            return;
        }

        search(T);

        return count;
    }

    function getMin(intervals) {
        return intervals.sort((a, b) => a[0] - b[0])[0][0];
    }

    function getMax(intervals) {
        return intervals.sort((a, b) => a[1] - b[1])[intervals.length - 1][1];
    }

    function getMid(intervals) {
        let min = getMin(intervals);
        let max = getMax(intervals);
        return min + parseInt((max - min) / 2);
    }

    function isBetweens(x, intervals) {
        return intervals.reduce((acc, interval) => isBetween(x, interval) ? (acc + 1) : acc, 0)
    }

    function isBetween(x, interval) {
        return interval[0] <= x && x <= interval[1];
    }

    function isLow(x, interval) {
        return x < interval[0]
    }

    function isHigh(x, interval) {
        return x > interval[1]
    }

    return {
        cross
    }
}

const it = intervalTree([[-3, 2], [0, 5], [1, 2], [3, 4], [7, 10]]);

// -3, 0, 2, 5, 7, 10

console.log(it.cross(1));
console.log(it.cross(6));
console.log(it.cross(8));