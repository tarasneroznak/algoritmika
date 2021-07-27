# import random

def bs(x, data, v):
   ops = 0
   bad = -1
   good = len(data)

   while (good - bad > 1):
      ops += 1

      mid = (bad + good) // 2

      if (x == data[mid]):
         print('find', v, ops)
         return

      if (x < data[mid]):
         good = mid
      else:
         bad = mid

   print('not_find', v, ops)

   return good

users = []
for i in range(10000): users.append(i + 1)

all = users
good = users[:4000]
bad = users[4000:]

bs(1, all, 'all') # ops 12
bs(50, good, 'good')  # ops 10

print(' ')
print('g + b')
bs(8000, good, 'good') # not find - 12 ops
bs(8000, bad, 'bad') # find - 13 ops
