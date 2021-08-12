n = int(input())
m = list(map(int, input().split()))
e = list(map(int, input().split()))

s = 0

def max_saved_units(indexes):
    s = 0
    for i in range(n):
        c = indexes[i] - 1
        if (m[c] > e[i]):
            s += m[c]

    return s


def gen_swap(n, p=[], sum=0):
    if (len(p) == n):
        return max(sum, max_saved_units(p))

    for i in range(1, n+1):
        if (i not in p):
           sum = gen_swap(n, p + [i], sum)

    return sum

print(gen_swap(n))
