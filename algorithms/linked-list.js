function linkedList() {
    let size = 0;
    let sentinel = Node();

    function Node(payload = null, next = null) {
        return {
            payload,
            next
        }
    }

    function add(payload) {
        let last = sentinel;
        while (last.next !== null) {
            last = last.next
        }

        size++;
        last.next = Node(payload);
    }

    function addFirst(payload) {
        sentinel.next = Node(payload, sentinel.next);
        size++;
    }

    function getFirst() {
        return (sentinel.next || {}).payload;
    }
    function getLast() {
        let last = sentinel;
        while (last.next !== null) {
            last = last.next;
        }

        return last.payload;
    }

    function toArray() {
        let array = Array.from({ length: size });

        let item = sentinel;
        let index = 0;

        while (item.next !== null) {
            array[index]= item.next.payload;
            item = item.next;
            index++;
        }

        return array;
    }

    return {
        getFirst,
        getLast,
        add,
        addFirst,
        toArray
    }
}


const ll = linkedList();

ll.add(12)
ll.add(13)
ll.addFirst(11)
ll.add(123)

console.log(ll.toArray());
console.log(ll.getFirst());
console.log(ll.getLast());

ll.addFirst(111)

console.log(ll.getFirst());
console.log(ll.toArray());
