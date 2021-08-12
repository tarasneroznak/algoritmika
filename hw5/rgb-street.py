n = int(input())
c = [None] * n

for i in range(n):
    c[i] = list(map(int, input().split()))

def search(c, h=0, pcol=-1, sum=0):
    if (h == n): return sum

    rgb = c[h]
    s = float("inf")
    for j in range(3):
        if (pcol != j):
            s = min(s, search(c, h + 1, j, rgb[j]))

    sum += s
    return sum

print(search(c))
