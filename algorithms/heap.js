// TODO

const h = Heap([1, 3, 4, 5, 6, 7, 8, 10]);

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

console.log(h);
console.log(h.parent(1));
console.log(h.parent(4));
console.log(h.parent(5));

h.insert(2);
h.insert(2);
h.insert(2);

h.graph();

function Heap(values = []) {
    let heap = [];
    let size = values.length + 1;

    values = values.sort((a, b) => a - b);

    const parentIndex = (i) => parseInt(i / 2);
    const parent = (i) => heap[parentIndex(i)];
    const leftChildIndex = (i) => 2 * i;
    const rightChildIndex = (i) => 2 * i + 1;
    const leftChild = (i) => heap[leftChildIndex(i)];
    const rightChild = (i) => heap[rightChildIndex(i)];
    const condition = (i) => parent(i) > heap[i];

    function create(index = 1) {
        if (!values[index - 1]) return;

        heap[index] = values[index - 1];

        create(leftChildIndex(index));
        create(rightChildIndex(index));
    }

    function graph(index = 1, level = 1, g = {}) {
        if (!heap[index]) return;

        if (!g[level]) g[level] = [];

        g[level].push(heap[index]);

        graph(leftChildIndex(index), level + 1, g);
        graph(rightChildIndex(index), level + 1, g);

        if (level === 1) console.log(g);
    }

    function sittup(i) {
        while (i > 1 && condition(i)) {
            swap(i);
            i = parseInt(i / 2);
        }
    }

    function swap(i, j = parentIndex(i)) {
        let tmp = heap[j];
        heap[j] = heap[i];
        heap[i] = tmp;
    }

    function insert(value) {
        heap[size] = value;
        sittup(size);
        size++;
    }

    create();

    return {
        heap,
        size,

        graph,

        parent,
        insert,
        leftChild,
        rightChild,
    }
}