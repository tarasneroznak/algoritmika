function stack() {
    let data = [];
    let size = 0;

    function push(payload) {
        data[size++] = payload;
    }

    function pop() {
        if (size === 0) return;

        let payload = data[--size];
        data.length = size;
        return payload;
    }

    return {
        push,
        pop
    }
}


const s = stack();

s.push(12)
s.push(13)
console.log(s.pop())
console.log(s.pop())
s.push(123)
console.log(s.pop())
