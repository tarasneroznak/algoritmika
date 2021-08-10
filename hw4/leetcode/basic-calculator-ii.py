import math

class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        return self.stack.pop()

    def __len__(self):
        return len(self.stack)


class Solution:
    def __init__(self):
        self.stack = Stack()

    def calculate(self, s: str) -> int:
        l = len(s)
        n = []
        operator = ''

        for i in range(l):
            c = s[i]

            if (i + 1 == l):
                n.append(c)

            if (i + 1 == l or c == '+' or c == '-' or c == '/' or c == '*'):
                num = int("".join(n))
                if (operator == '-'):
                    num = -num

                if (operator != ''):
                    if (operator == '/'):
                        pn = self.stack.pop()
                        r = pn / num
                        if (r < 0):
                            r = math.ceil(r)
                        else:
                            r = math.floor(r)

                        self.stack.push(r)

                    if (operator == '*'):
                        pn = self.stack.pop()
                        self.stack.push(pn * num)

                if (operator != '*' and operator != '/'):
                    self.stack.push(num)

                operator = c
                n = []
            else:
                n.append(c)

        while(len(self.stack) > 1):
            a = self.stack.pop()
            b = self.stack.pop()

            self.stack.push(a + b)

        return self.stack.pop()


c = Solution()

"14-3/2"

print("14-3/2", "->", c.calculate("14-3/2"), "==", 13)
# print("0-2147483647", "->", c.calculate("0-2147483647"), "==", -2147483647)
# print("1-1+1", "->", c.calculate("1-1+1"), "==", 1)
# print("4/2+1", "->", c.calculate("4/2+1"), "==", 3)
# print("3+2*5", "->", c.calculate("3+2*2"), "==", 7)
# print("3+2*22", "->", c.calculate("33+2*22*3"), "==", 165)
# print(" 3/2 ", "->", c.calculate(" 3/2 "), "==", 1)
# print(" 3+5 / 2 ", "->", c.calculate(" 3+5 / 2 "), "==", 5)
# print("42", "->", c.calculate("42"), "==", 42)
