import tracemalloc

tracemalloc.start()

def quickSort(
    A,
    compare=lambda a, pivot, pointer: a < pivot if pointer == 0 else a > pivot,
    left=None,
    right=None
):
    if left == None:
        left = 0
    if right == None:
        right = len(A) - 1
    if (left >= right):
        return A

    pivot = A[(right + left) // 2]
    l = left
    r = right

    while (l <= r):
        while (compare(A[l], pivot, 0)):
            l += 1
        while (compare(A[r], pivot, 1)):
            r -= 1

        if (l <= r):
            A[l], A[r] = A[r], A[l]
            l += 1
            r -= 1

    quickSort(A, compare, left, l - 1)
    quickSort(A, compare, l, right)

    return A

def compare(a,b,p):
    if (p ==0):
        return a[1] < b[1] if a[0] == b[0] else a[0] < b[0]
    else:
        return a[1] > b[1] if a[0] == b[0] else a[0] > b[0]


N, M = map(int, input().split())

points = []
for j in range(N):
    x1, x2 = map(int, input().split())
    points.append((x1, 0))
    points.append((x2, 2))

P = list(map(int, input().split()))
for i in range(M):
    points.append((P[i], 1, i))

points = quickSort(points)

count = 0
for k in range(len(points)):
    point = points[k]
    if (point[1] == 1):
        P[point[2]] = str(count)
    if (point[1] == 0):
        count += 1
    if (point[1] == 2):
        count -= 1

print(" ".join(P))


current, peak = tracemalloc.get_traced_memory()
print(
    f"Current memory usage is {current / 10**6}MB; Peak was {peak / 10**6}MB")
tracemalloc.stop()
