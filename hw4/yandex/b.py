a = [1,3,2]
b = [4,3,2]
# a = set([1, 2,2, 6, 4, 5, 7])
# b = set([10, 3, 2, 4, 8])

# a = set(map(int, input().split()))
# b = set(map(int, input().split()))
# print(" ".join(list(map(str, a & b))))

i = []
d = {}

for ea in a:
	d[ea] = ea

for eb in b:
	if (eb in d):
		i.append(eb)

print(" ".join(map(str, sorted(i))))
