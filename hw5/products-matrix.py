n, m = map(int, input().split())

all = []
for i in range(1, n + 1):
    t = []
    for j in range(1, n + 1):
        t.append(i * j)
        all.append(i * j)

    print(t)

all = sorted(all)
print(all, all[m])

# def fac(n):
#     if (n < 2):
#         return 1

#     return n * fac(n - 1)


# nf = fac(n)
# mf = fac(m)
# nmf = fac(n - m)

# print(n, m)
# print(nf, mf, nmf)
# print(nf / (mf * nmf))
# # print(fac(n) / (fac(k) * fac(n - k)))
