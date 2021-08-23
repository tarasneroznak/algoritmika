def lcs(a: str, b: str) -> int:
    n = len(a)
    m = len(b)

    F = [[0 for j in range(m + 1)] for i in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i-1] == b[j - 1]:
                F[i][j] = 1 + F[i - 1][j - 1]
            else:
                F[i][j] = max(F[i][j - 1], F[i-1][j])

    ans = ''
    i = n
    j = m
    while F[i][j] > 0:
        if F[i][j] == F[i-1][j]:
            i -= 1
        elif F[i][j] == F[i][j-1]:
            j -= 1
        else:
            ans = a[i-1] + ans
            i -= 1
            j -= 1
    return ans

print(lcs("baccbca", "abcabaac"))
