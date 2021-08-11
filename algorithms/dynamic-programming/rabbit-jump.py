def jump(n):
    a = ([1] * 2) + ([0] * (n - 1))
    print("jump", a)

    for i in range(2, n + 1):
        a[i] = a[i-1] + a[i-2]

    print("jump", a)


"""
Для початку потрібно заповнити перші K-1 елементів одиницями
Виконувати ітерування з K до N та сумувати i-1 з i-k
"""

# def jump_k(n, k):
#     a = ([1] * (k - 1)) + ([0] * (n - k + 2))
#     print("jump_k", a)

#     for i in range(k - 1, n + 1):
#         a[i] = a[i-1] + a[i-k]

#     print("jump_k", a)


def jump_k(n, k):
    a = [1] + ([0] * n)
    print("jump_k", a)

    for i in range(1, n+1):
        for j in range(min(i, k)):
            a[i] += a[i-j]
    
    print("jump_k", a)


jump(9)
jump_k(9, 3)
