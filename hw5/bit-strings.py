N, Z, O = map(int, input().split())

R = [0] * N
S = [None] * N

for i in range(N):
    s = input()
    z = 0
    o = 0
    for j in range(len(s)):
        if (s[j] == '0'):
            z += 1
        else:
            o += 1

    S[i] = (z, o)


def knapsack_problem(n, s, z, o):
    m = [[0] * (o+1) for _ in range(z+1)]

    for si in range(n):
        zi, oi = s[si]

        for i in range(z, zi-1, -1):
            for j in range(o, oi-1, -1):
                print(i,j)
                m[i][j] = max(m[i][j], 1 + m[i-zi][j-oi])

            for l in range(z+1):
                print(m[l])

    return m[z][o]


print(knapsack_problem(N, S, Z, O))
