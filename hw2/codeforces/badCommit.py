import sys

cache = dict()

bad = 0
good = int(input())

while good - bad > 1:
    mid = (bad + good) // 2
    answer = cache.get(mid)

    if not answer:
        print(mid)
        sys.stdout.flush()
        answer = int(input())
        cache[mid] = answer

    if answer == 0:
        good = mid
    else:
        bad = mid

print("! {}".format(good))
sys.stdout.flush()
sys.exit()
