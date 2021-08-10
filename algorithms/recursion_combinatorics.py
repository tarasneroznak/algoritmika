# всі комбінації
def gen(p, n, x):
    if (len(p) == n):
        print(p)
        return p

    for i in range(x):
        gen(p + [i], n, x)

# gen([], 2, 10)

# [0,0,0]
# [0,0,1]
# [0,1,0]
# [1,0,0]
# [1,1,0]
# ...

# перестановки
def gen_swap(p, n):
    if (len(p) == n):
        print(p)
        return p

    for i in range(1,n+1):
        if (i not in p): 
            gen_swap(p + [i], n)


gen_swap([], 3)

# [1,2,3]
# [1,3,2]
# [2,1,3]
# [2,3,1]
# ...