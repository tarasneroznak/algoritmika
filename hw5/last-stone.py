s, m, n = map(int, input().split())
t = list(map(int, input().split()))

wins = [0] * (n+1)

for i in range(1, n+1):
    for ti in t:
        if (i - ti >= 0 and wins[i - ti] == 0):
            wins[i] = 1
            break

print(sum(wins[m::]))
