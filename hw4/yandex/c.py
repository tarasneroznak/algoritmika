"""
4 3
0
1
10
9
1
3
0
"""

n, m = map(int, input().split())

i = set()
a = set()
b = set()

for i in range(n):
    a.add(int(input()))

for i in range(m):
    b.add(int(input()))


intersection = a & b
a_unique = a - b
b_unique = b - a

print(len(intersection))
print(" ".join(map(str, sorted(intersection))))

print(len(a_unique))
print(" ".join(map(str, sorted(a_unique))))

print(len(b_unique))
print(" ".join(map(str, sorted(b_unique))))
