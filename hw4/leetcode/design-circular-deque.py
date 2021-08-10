class _MyCircularDeque:

    def __init__(self, k: int):
        self.capacity = k

        self.head = self.node(-1)
        self.tail = self.node(-1)

        self.head['next'] = self.tail
        self.tail['prev'] = self.head

        self.size = 0

    def node(self, value):
        return {
            'value': value,
            'next': None,
            'prev': None
        }

    def insertFront(self, value: int) -> bool:
        if (self.isFull()): 
            return False

        n = self.node(value)

        n['next'] = self.head['next']
        n['prev'] = self.head
        n['next']['prev'] = n
        self.head['next'] = n

        self.size += 1

        return True

    def insertLast(self, value: int) -> bool:
        if (self.isFull()):
            return False
        
        n = self.node(value)

        n['next'] = self.tail
        n['prev'] = self.tail['prev']
        n['prev']['next'] = n
        self.tail['prev'] = n

        self.size += 1

        return True

    def deleteFront(self) -> bool:
        if (self.isEmpty()):
            return False

        f = self.head['next']
        nf = f['next']
        nf['prev'] = self.head
        self.head['next'] = nf 

        self.size -= 1

        return True

    def deleteLast(self) -> bool:
        if (self.isEmpty()):
            return False

        l = self.tail['prev']
        pl = l['prev']    
        pl['next'] = self.tail
        self.tail['prev'] = pl

        self.size -= 1

        return True

    def getFront(self) -> int:
        return self.head['next']['value']

    def getRear(self) -> int:
        return self.tail['prev']['value']

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.capacity


class MyCircularDeque:

    def __init__(self, k: int):
        self.capacity = k
        self.ll = [None] * k

        self.head = 0
        self.tail = 0
        self.size = 0

    def insertFront(self, value: int) -> bool:
        if (self.isFull()):
            return False

        self.ll[self.head] = value
        self.head = (self.head - 1) % self.capacity
        self.size += 1

        return True

    def insertLast(self, value: int) -> bool:
        if (self.isFull()):
            return False

        self.tail = (self.tail + 1) % self.capacity
        self.ll[self.tail] = value
        self.size += 1

        return True

    def deleteFront(self) -> bool:
        if (self.isEmpty()):
            return False

        self.head = (self.head + 1) % self.capacity
        self.ll[self.head] = None
        self.size -= 1

        return True

    def deleteLast(self) -> bool:
        if (self.isEmpty()):
            return False

        self.ll[self.tail] = None
        self.tail = (self.tail - 1) % self.capacity
        self.size -= 1

        return True

    def getFront(self) -> int:
        el = self.ll[(self.head + 1) % self.capacity]
        if (el == None):
            return -1

        return el

    def getRear(self) -> int:
        el = self.ll[self.tail]
        if (el == None):
            return -1

        return el

    def isEmpty(self) -> bool:
        return self.size == 0

    def isFull(self) -> bool:
        return self.size == self.capacity


# Your MyCircularDeque object will be instantiated and called as such:

q = MyCircularDeque(3)
print("insertLast:", q.insertLast(1), '->', True)
print("insertLast:", q.insertLast(2), '->', True)
print("insertFront:", q.insertFront(3), '->', True)
print("insertFront:", q.insertFront(4), '->', False)
print("getRear:", q.getRear(), '->', 2)
print("isFull:", q.isFull(), '->', True)
print("deleteLast:", q.deleteLast(), '->', True)
print("insertFront:", q.insertFront(4), '->', True)
print("getFront:", q.getFront(), '->', 4)

print("==============")
q2 = MyCircularDeque(4)
print("insertFront:", q2.insertFront(9), '->', True)
print("deleteLast:", q2.deleteLast(), '->', True)
print("getRear:", q2.getRear(), '->', -1)
print("getFront:", q2.getFront(), '->', -1)
print("getFront:", q2.getFront(), '->', -1)
print("deleteFront:", q2.deleteFront(), '->', False)
print("insertFront:", q2.insertFront(6), '->', True)
print("insertLast:", q2.insertLast(5), '->', True)
print("insertFront:", q2.insertFront(9), '->', True)
print("getFront:", q2.getFront(), '->', 9)
print("insertFront:", q2.insertFront(6), '->', True)

print("==============")
q3 = MyCircularDeque(3)
print("insertFront:", q3.insertFront(8), '->', True)
print("insertLast:", q3.insertLast(8), '->', True)
print("insertLast:", q3.insertLast(2), '->', True)
print("getFront:", q3.getFront(), '->', 8)
print("deleteLast:", q3.deleteLast(), '->', True)
print("getRear:", q3.getRear(), '->', 8)
print("insertFront:", q3.insertFront(9), '->', True)
print("deleteFront:", q3.deleteFront(), '->', True)
print("getRear:", q3.getRear(), '->', 8)
print("insertLast:", q3.insertLast(2), '->', True)
print("isFull:", q3.isFull(), '->', True)
