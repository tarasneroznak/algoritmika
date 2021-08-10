class MallocManager:
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity

        self.allocated_memory = [None] * capacity
        self.free_memory = [[0, capacity]]

    def push_free_memory(self, value):
        self.free_memory.append(value)

    def pop_free_memory(self):
        return self.free_memory.pop()

    def malloc(self, count: int) -> int:
        if (len(self.free_memory) == 0):
            return -1

        from_free, to_free = self.pop_free_memory()
        free_count = to_free - from_free

        if (count <= free_count):
            self.allocated_memory[from_free] = count

            if (count < free_count):
                self.push_free_memory([from_free + count, to_free])

            return from_free
        else:
            self.push_free_memory([from_free, to_free])
            return -1

    def free(self, index: int) -> bool:
        if (index > self.capacity):
            return -1

        if (self.allocated_memory[index] != None):
            count = self.allocated_memory[index]

            s = index
            e = index + count

            back = []
            while (len(self.free_memory)):
                si, ei = self.pop_free_memory()
                
                if (si != e and ei != s):
                    back.append([si, ei])
                elif (si == e):
                    e = ei
                elif (ei == s):
                    s = si

            back.append([s, e])

            for fm in back:
                self.push_free_memory(fm)
                
            self.allocated_memory[index] = None

            return 0

        return -1


m = MallocManager(14)

# print(m.malloc(2), '== 0')
# print(m.malloc(2), '== 2')
# print(m.malloc(1), '== 4')
# print(m.free(3), '== 0')

print('malloc(2):',m.malloc(2), '== 0')
print('malloc(2):',m.malloc(2), '== 2')
print('malloc(3):',m.malloc(3), '== 4')
print('malloc(2):',m.malloc(2), '== 7')
print('malloc(2):',m.malloc(2), '== 9')
print('free(2):',m.free(2), '== 0')
print('free(7):',m.free(7), '== 0')
print('malloc(2):',m.malloc(2), '== 7')
print('malloc(3):',m.malloc(3), '== -1')
print('malloc(2):',m.malloc(2), '== 2')
print('malloc(3):',m.malloc(3), '== 11')
