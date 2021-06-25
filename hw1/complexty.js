const n = 120
const c = {}
function db_call(n) {
    c[n] = (c[n] || 0) + 1;
}

// a
for (let i = n; i > 1; i /= 2) db_call('a')
/*
i = n -> n
i = n/4 -> n/2
i = n/4 -> n/4
... 
i = 1 -> 1

n + n/2 + n/4 + ... + 1 = n
*/

// b
for (let i = 0; i * i < n; i++) db_call('b')
/*
i = 0 -> n
i = 1 -> n - 1 
i = 2 -> n - 4
...
i = n -> n - 2n

n + n - 1 + n - 4 + n - 2n = n(n + 1) / 2 =? n^2
*/

// c
for (let i = 0; i < n; i++)
    for (let j = 0; j < 256; j++)
        db_call('c')
/*
i = 0 -> n + 256
i = 1 -> n - 1 + 256
i = 2 -> n - 2 + 256
...
i = n - 1 -> 1 + 256

n + 256 + n - 1 + 256 + n - 2 + 256 + ... + 1 + 256 = n + 256 = n
*/

// d
for (let i = 1; i <= n * n - 10; i++)
    for (let j = 1; j <= i; j++)
        db_call('d')
/*
i = 1 -> n * n - 10 - 1
i = 2 -> n * n - 10 - 2
...
i = n -> n * n - 10 - n

n^2 - 11 + n^2 - 12 + ... + n^2 - 10 - n = n^4
*/

// e
for (let i = 1; i <= n; i++)
    for (let j = 1; j <= i; j++)
        for (let k = 1; k <= j; k++)
            db_call('e')
/*
i = 1 -> 1^2
i = 2 -> 2^2
...
i = n -> n^2

1^2 + 2^2 + ... + n^2 = n^3
*/

// f
for (let i = 1; i <= n; i++)
    for (let j = 1; j < i; j *= 2)
        db_call('f')
/*
i = 1 -> log n
i = 2 -> log n
...
i = n -> log n

log n + log n + ... = n log n
*/

// g
for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j += i) {
        db_call('g')
    }
}
/*
i = 1 -> n - 1
i = 2 -> n - 2
...
i = n -> 1

n + n - 1 + n - 2 + ... + 1
1 + 2 + 3 + n

n(n + 1) / 2 = 1/2 * n^2 + 1/2 * n = n^2
*/

// h
function compute(n) {
    if (Math.round(n) === 0) return;
    for (let i = 0; i < n; i++) db_call('h')
    compute(n / 2)
    compute(n / 2)
}
compute(n)
/*
        f(n) -> n
        /  \
    f(n/2)  f(n/2) -> n^2
    /    \     \    \
f(n/4) f(n/4) f(n/4) f(n/4) -> n^4
                            ....   
                                -> n^log n

n + n^2 + n^4 + n^log n = n log n
*/

console.log(n, c);
