def factorial(n):
    if (n < 2): return 1

    a = 1
    for t in range(2, n + 1):
        a *= t

    return a


print(factorial(14))
