/*  
[1, 3, 4, 5, 6, 7, 8, 10]

                    1(1)
                    /  \
                 3(2)    4(3)
                /   \     /   \
              5(4)  6(5) 7(6)  8(7)
              /   \
            10(8)  n-2
*/

const h = Heap([1, 3, 4, 5, 6, 7, 8, 10]);

// console.log(h.heap);
console.log(h.extract());
// console.log(h.heap);
// console.log(h.insert(1));
// console.log(h.heap);

function Heap(init) {
    let heap = [];
    let size = 0;

    const getElement = (i) => heap[i];
    const removeElement = (i) => heap.length = heap.length - 1;
    const parentIndex = (i) => parseInt(i / 2);
    const parent = (i) => heap[parentIndex(i)];
    const leftChildIndex = (i) => 2 * i;
    const rightChildIndex = (i) => 2 * i + 1;
    const leftChild = (i) => heap[leftChildIndex(i)];
    const rightChild = (i) => heap[rightChildIndex(i)];
    const swap = (i, j) => [heap[i], heap[j]] = [heap[j], heap[i]];

    function siftup(i) {
        while (i > 1 && parent(i) > heap[i]) {
            swap(i, parentIndex(i));
            i = parseInt(i / 2);
        }
    }

    function siftdown(i) {
        while (i * 2 <= size) {
            let min = i;
            let element = getElement(i);
            let leftI = leftChildIndex(i);
            let left = leftChild(i);
            let rightI = rightChildIndex(i);
            let right = rightChild(i);

            if (left < element) min = leftI;
            if (rightI <= size && right < element) min = rightI;

            if (min === i) break;
            swap(min, i);
            i = min;
        }
    }

    function insert(value) {
        size += 1;
        heap[size] = value;
        siftup(size);
    }

    function extract() {
        let element = getElement(1);
        swap(1, size);
        removeElement(size);
        size -= 1;
        siftdown(1);
        return element;
    }

    function create(values) {
        values = values.sort((a, b) => a - b);
        size = values.length;

        const recursive = (index = 1) => {
            if (!values[index - 1]) return;
            heap[index] = values[index - 1];
            recursive(leftChildIndex(index));
            recursive(rightChildIndex(index));
        }

        recursive();
    }

    if (Array.isArray(init)) create(init);

    return {
        heap,
        extract,
        insert
    }
}



/* 2 */

function Heap_() {
    let heap = [];
    let size = 0;

    const swap = (i, j) => [heap[i], heap[j]] = [heap[j], heap[i]];

    function insert(data) {
        size++;
        heap[size] = data;
        siftup(size);
    }

    function extract() {
        let element = heap[1];
        swap(1, size);
        heap.length = size;
        size--;
        siftdown(1);

        return element;
    }

    function siftup(index) {
        let i = index;
        let p = parseInt(i / 2);

        while (i > 1 && heap[p].tweetId < heap[i].tweetId) {
            swap(i, p);
            i = parseInt(i / 2);
            p = parseInt(i / 2);
        }
    }

    function siftdown(index) {
        let i = index;

        while (i * 2 <= size) {
            let min = i;
            let element = heap[i];

            let li = (i * 2);
            let ri = (i * 2) + 1;
            let l = heap[li];
            let r = heap[ri];

            if (l.tweetId > element.tweetId) min = li;
            if (r && r.tweetId > element.tweetId && l.tweetId < r.tweetId) min = ri;
            if (min === i) break;

            swap(min, i);
            i = min;
        }
    }

    return {
        length: () => size,
        extract,
        insert
    }
}

// const h = Heap();
// h.insert(232)
// h.insert(1)
// h.insert(2)
// console.log(h.heap)
// console.log(h.extract())
// console.log(h.extract())
// console.log(h.extract())
// console.log(h.heap)