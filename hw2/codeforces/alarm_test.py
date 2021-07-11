n = 5
x = 7
k = 12
N = [5, 22, 17, 13, 8]

# n = 6
# x = 5
# k = 10
# N = [1, 2, 3, 4, 5, 6]

# 6 5 10
# 1 2 3 4 5 6

print("{:10.10f}".format(((1 / 3) % 1)))
print("{:10.10f}".format(((10 / 3) % 1)))

T = 27
counts = 0
mod = dict()

for i in range(n):
    c = max(((T - N[i]) / x) + 1, 0)
    key = "{:10.15f}".format(c % 1)

    counts += int(c)

    # print('a: {}'.format(N[i]))
    print('c: {}'.format(c % 1))
    # print('key: {}'.format(key))

    if (mod.get(key)):
        mod[key].append(c)
    else:
        mod[key] = [c]

for (_, value) in mod.items():
    if (len(value) > 1):
        counts -= sum(map(lambda x: int(x), sorted(value)[0::-1]))
        # print(value.sort()[1::len(value) - 1])

# print(mod)
# print('counts: {}'.format(counts))
# print('=======================')

# n, k, x = map(int, input().split())
# N = list(map(int, input().split()))

# def get_counts(T, x, n, N):
#     counts = 0

#     for i in range(n):
#         a = N[i]
#         c = max(((T - a) / x) + 1, 0)
#         ac = c % 1
#         key = "{:10.15f}".format(ac)

#         if (d.get(key)):
#             d[key].append(c)
#         else:
#             d[key] = [c]

#         counts += int(c)

#     for (_, value) in d.items():
#         if (len(value) > 1):
#             counts -= sum(map(lambda x: int(x), sorted(value)[0::-1]))

#     return counts

# bad = 0
# good = 10 ** 9

# while good - bad > 1:
#     m = (bad + good) // 2
#     c = get_counts(m, x, n, N)

#     if (c == x):
#         good = m
#         break

#     if c > x: good = m
#     else: bad = m

# print(good)
