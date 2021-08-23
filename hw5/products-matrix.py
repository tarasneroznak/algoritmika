n, k = map(int, input().split())


def counts(n, mid):
    c = 0
    for i in range(1, n + 1):
        c += min(n, mid // i)

    return c


def bs(n, k):
    bad = 1
    good = (n ** 2) + 1

    while(good > bad):
        mid = (good + bad) // 2
        count = counts(n, mid)
    
        print(mid, count, good, bad)

        if (count >= k):
            good = mid
        else:
            bad = mid + 1

        print( good, bad)
        print( '++')


    return bad



if (False):
    ki = 1
    ni = 150
    while(True):
        if (ki > ni * ni):
            break

        v = valid(ni, ki)
        b = bs(ni, ki)

        if (v != b):
            print("ERROR", f"v={v} b={b} ::: k={ki}")
            break

        if (ki % 100 == 0):
            print('result:', v == b)

        ki += 1

else:
    def valid(n, k):
        a = []
        for i in range(1, n + 1):
            for j in range(i, n + 1):
                p = i * j
                if (i == j):
                    a.append(p)
                else:
                    a.append(p)
                    a.append(p)

        return sorted(a)[k - 1]

    v = valid(n, k)
    b = bs(n, k)

    print('valid:', v)
    print('bs:', b)
    print('result:', v == b)
