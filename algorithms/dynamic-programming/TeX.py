text1 = tuple("This may be a difficult example".split(' '))
text2 = tuple("Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.  Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.".split(' '))


def memoization(f):
    def memf(*x):
        if x not in memf.cache:
            memf.cache[x] = f(*x)
        return memf.cache[x]

    memf.cache = {}
    return memf


def dp_breaks(wlist, startCol, maxWidth):
    if (len(wlist)) == 0:
        return "", 0


    word = wlist[0]
    rest = wlist[1:]
    endCol = len(word) + startCol

    if endCol > maxWidth:
        return "", 1e9
    
    # no line break. rest of words placed starting after curr word
    t1, c1 = dp_breaks(rest, endCol + 1, maxWidth)
    t1 = word + " " + t1

    # line break after word. rest of words placed starting on the new line
    t2, c2 = dp_breaks(rest, 0, maxWidth)
    t2 = word + "\n" + t2
    c2 += (maxWidth - endCol) ** 3

    return (t1, c1) if c1 <= c2 else (t2, c2)

# determine breaks by adding words until line is full. returns (paragraph_string,cost)
def greedy_breaks(wlist, maxWidth):
    cost = 0
    result = ""
    col = 0
    for word in wlist:
        endCol = col + len(word)
        if col != 0:
            endCol += 1
        if endCol > maxWidth:
            cost += (maxWidth - col) ** 3
            result += '\n'
            col = 0
        if col != 0:
            result += ' '
            col += 1
        result += word
        col += len(word)
    return result, cost


def breaks(wlist, width):
    result, cost = dp_breaks(wlist, 0, width)
    print('\n*** dynamicBreaks cost = {}'.format(cost))
    print(result)

    result, cost = greedy_breaks(wlist, width)
    print('\n*** greedyBreaks cost = {}'.format(cost))
    print(result)

dp_breaks = memoization(dp_breaks)
breaks(text2, 40)
