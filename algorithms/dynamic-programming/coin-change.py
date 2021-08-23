def coinChange(coins: list[int], amount: int) -> int:
    f = [0] * (amount + 1)
    oo = float('inf')
    for x in range(1, amount + 1):
        ans = oo
        for coin in coins:
            if coin <= x:
                ans = min(ans, 1 + f[x - coin])
        f[x] = ans
    return -1 if f[amount] == oo else f[amount]
