// Queue - first in first out

function queue() {
    let data = [];
    let size = 0;

    function enqueue(payload) {
        data[size++] = payload;
    }

    function dequeue() {
        if (size === 0) return;
        
        --size;
        return data.shift();
    }

    return {
        enqueue,
        dequeue
    }
}


const q = queue();

q.enqueue(1)
q.enqueue(2)
console.log(q.dequeue())
console.log(q.dequeue())
