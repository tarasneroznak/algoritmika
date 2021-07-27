class LRUCache {
    constructor(capacity) {
        this._capacity = capacity;

        this._cache = new Map();

        this._head = this._newNode();
        this._tail = this._newNode();
        this._head.next = this._tail;
        this._tail.prev = this._head;
    }

    get(key) {
        if (this._cache.has(key)) {
            const n = this._cache.get(key);

            this._removeNode(n);
            this._addNode(n);

            return n.value;
        }

        return -1;
    }

    put(key, value) {
        if (this._cache.has(key)) {
            this._removeNode(this._cache.get(key));
            this._addNode(this._newNode(value, key));
            return;
        }

        if (this._cache.size === this._capacity) {
            this._removeNode();
        }

        this._addNode(this._newNode(value, key));
    }

    _newNode(value, key, next = null, prev = null) {
        return { value, key, prev, next };
    }

    _addNode(n) {
        n.next = this._head.next;
        n.prev = this._head;
        n.next.prev = n;
        this._head.next = n;

        this._cache.set(n.key, n);
    }

    _removeNode(n = this._tail.prev) {
        const next = n.next;
        const prev = n.prev;
        prev.next = next;
        next.prev = prev;

        this._cache.delete(n.key);
    }
}


// let m = ["put", "put", "get", "put", "get", "put", "get", "get", "get"]
// let a = [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

// const l = new LRUCache(2)

// for (let i = 0; i < m.length; i++) {
//     const method = m[i];
//     const args = a[i];

//     console.log(`${method}(${args}) => ${l[method](...args)}`);
// }