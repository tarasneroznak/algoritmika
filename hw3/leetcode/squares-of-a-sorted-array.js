const { getRandomNumberArray, getRandomInt } = require('../../utils');
const { testExecutor } = require('../../test');

function _sortedSquares(nums) {
    return nums.map(n => n ** 2).sort((a, b) => a - b);
};

function sortedSquaresTwoPointers(nums) {
    let len = nums.length;
    let sorted = new Array(len);

    let left = 0;
    let right = len - 1;
    let i = len - 1

    while (right >= left) {
        let l = nums[left] ** 2;
        let r = nums[right] ** 2;

        if (l > r) {
            sorted[i] = l;
            left++;
        }
        else {
            sorted[i] = r;
            right--;
        }

        i--;
    }

    return sorted;
};

testExecutor(
    () => getRandomNumberArray(getRandomInt(1, 10), -100, 100).sort((a, b) => a - b),
    (nums) => _sortedSquares([...nums]),
    (nums) => sortedSquaresTwoPointers([...nums]),
    (a, b) => JSON.stringify(a) === JSON.stringify(b),
    { disable: false }
)