const { getRandomNumberArray, getRandomInt } = require('../../utils');
const { testExecutor } = require('../../test');

function _sortArrayByParity(nums) {
    return nums.sort((a) => a % 2 === 0 ? -1 : 1);
};

function sortArrayByParity(nums) {
    if (nums.length === 1) {
        return nums;
    }

    let sorted = [];

    function sort(n) {
        if (n.length < 2) {
            let num = n[0];

            if (num % 2 === 0) sorted.unshift(num);
            else sorted.push(num);

            return;
        }

        let mid = Math.floor(n.length / 2);

        sort(n.slice(0, mid), 0, mid);
        sort(n.slice(mid, n.length), mid);
    }

    sort(nums);

    return sorted;
};

function sortArrayByParityTwoPointers(nums) {
    if (nums.length === 1) {
        return nums;
    }

    let left = 0;
    let right = nums.length - 1;
    let sorted = [];

    while (right >= left) {
        if (left === right) {
            let n = nums[left];
            if (n % 2 === 0) sorted.unshift(n); else sorted.push(n);
        } else {
            let l = nums[left];
            let r = nums[right];
           
            if (l % 2 === 0) sorted.unshift(l); else sorted.push(l);
            if (r % 2 === 0) sorted.unshift(r); else sorted.push(r);
        }
        
        left++;
        right--;
    }

    return sorted;
};

// swap to start elements if % 2 === 0
function sortArrayByParity_best(nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            [nums[i], nums[index]] = [nums[index], nums[i]];
            index++;
        }
    }
    return nums;
}

testExecutor(
    () => getRandomNumberArray(getRandomInt(5, 5), 0, 100).sort((a, b) => a - b),
    (nums) => _sortArrayByParity([...nums]),
    (nums) => sortArrayByParityTwoPointers([...nums]),
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
)