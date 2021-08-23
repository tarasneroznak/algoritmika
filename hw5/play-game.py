n = int(input())
m = sorted(list(map(int, input().split())))
e = sorted(list(map(int, input().split())), reverse=True)

k = [None] * n

while(m):
    s = m.pop()

    for i in range(n):
        t = e[i]

        if (s > t and k[i] == None):
            k[i] = s
            break

print(sum(filter(bool, k)))
