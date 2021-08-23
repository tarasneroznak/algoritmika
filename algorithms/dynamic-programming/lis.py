def lis(a):
    n = len(a)
    F = [1] * n
    prev = [-1] * n
    for i in range(n):
        curr_max = 0
        for j in range(i):
            if a[j] < a[i] and F[j] > curr_max:
                curr_max = F[j]
                prev[i] = j
        F[i] = curr_max + 1
    
    ans = []
    i = F.index(max(F))
    ans.append(a[i])

    while prev[i] != -1:
        i = prev[i]
        ans.append(a[i])
