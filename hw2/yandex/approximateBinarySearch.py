n, k = map(int, input().split())
N = list(map(int, input().split()))
K = list(map(int, input().split()))

result = []

def bs(x, arr):
    bad = -1
    good = len(arr)
    while good - bad > 1:
        m = (bad + good) // 2
        if arr[m] >= x:
            good = m
        else:
            bad = m

    return good

for ke in K:
    index = bs(ke, N)

    l = -100000000000 if index - 1 < 0 else N[index - 1]
    r = 100000000000 if index > k -1 else N[index]
    dl = abs(ke - l)
    dr = abs(ke - r)

    value = 0
    if dl == dr:
        value = min(l, r)
    else:
        value = r if dl > dr else l

    result.append(str(value))

print('\n'.join(result))
