def bs(n, k):
    bad = 0
    good = n - 1

    while(good - bad > 1):
        mid = (bad + good) // 2

        if (n < k):
            good = mid
        else:
            bad = mid

    return good
