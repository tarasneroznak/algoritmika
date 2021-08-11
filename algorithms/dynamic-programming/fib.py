def fib(n):
    if (n < 2): return n

    a = 1
    b = 1
    for t in range(2, n):
        t = b
        b = b + a
        a = t

    return b

print(fib(100))