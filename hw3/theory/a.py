import time


def resolve_collision(data):
   s = dict()
   l = len(data)

   low = 0
   high = l - 1

   mi = min(a)
   ma = max(a)

   print('min:', mi)
   print('max:', ma)

   for i in range(l):
      n = (data[i] % m)
      j = (n // l)
      print(data[i], '-','n:', n, 'j:', j)

      mid = low + ((data[i] - mi) * (high - low)) / (ma - mi)

      print('mid: ', mid)


        # if (data[i] < data[i + 1]):
        #    result[i] = data[i]
        #    # data[i], data[i + 1] = data[i + 1], data[i]
        # else:
        #    s.add(data[i])

   # print(s)


# a = [9, 8, 1, 2, 3, 5, 7, 6]
a = [12, 15, 13, 145, 300, 201, 993, 1302]
m = max(a)

# print('1 - ', (1 % m) * m, ': ', m / 1)
# print('2 - ', (2 % m) * m, ': ', m / 2)
# print('3 - ', (3 % m) * m, ': ', m / 3)
# print('5 - ', (5 % m) * m, ': ', m / 5)
# print('7 - ', (7 % m) * m, ': ', m / 7)

print('a', a)
resolve_collision(a)
