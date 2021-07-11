n, x, k = map(int, input().split())
N = list(map(int, input().split()))

d = dict()
for a in N:
    ai = a % x

    if (d.get(ai)):
        d[ai] = min(d[ai], a)
    else:
        d[ai] = a

A = d.values()

bad = 0
good = 1000000001000000001

while good - bad > 1:
    m = (bad + good) // 2
    c = 0

    for a in A:
        c += max(((m - a) // x) + 1, 0)

    if c >= k:
        good = m
    else:
        bad = m

print(good)
