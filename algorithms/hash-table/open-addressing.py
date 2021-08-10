class HashTable:
    def __init__(self) -> None:
        self.capacity = 100
        self.load_factor = 0.75
        self.size = 0

        self.table = [None] * self.capacity

    def set(self, key, value) -> None:
        self.__rebuild()

        index = self.__getHash(key)
        existed = self.table[index]

        if (existed == None):
            self.size += 1
            self.table[index] = (key, value)
            return

        if (existed[0] == key):
            self.table[index] = (key, value)
            return

        index = self.__findInsertIndex(index)
        self.size += 1
        self.table[index] = (key, value)

    def get(self, key):
        index = self.__getHash(key)
        existed = self.table[index]

        if (existed == None):
            return -1

        if (existed[0] != key):
            index = self.__findKeyIndex(index, key)

        return self.table[index][1]

    def __findInsertIndex(self, index: int) -> int:
        index = (index + 1) % self.capacity
        while (True):
            value = self.table[index]
            if (value == None):
                return index

            index = (index + 1) % self.capacity

    def __findKeyIndex(self, index: int, key) -> int:
        index = (index + 1) % self.capacity
        while (True):
            value = self.table[index]
            if (value != None and value[0] == key):
                return index

            index = (index + 1) % self.capacity

    def __rebuild(self):
        if (((self.size * 100) / self.capacity) * 0.01 >= self.load_factor):
            tmp_capacity = self.capacity
            tmp_table = self.table.copy()

            self.size = 0
            self.capacity = self.capacity * 2
            self.table = [None] * self.capacity

            for i in range(tmp_capacity):
                if (tmp_table[i] != None):
                    self.set(tmp_table[i][0], tmp_table[i][1])

    def __getHash(self, key):
        return hash(key) % self.capacity

    # def __getHash(self, key):
    #     hash_val = 0
    #     for c in str(key):
    #         hash_val = hash_val * 31 + ord(c)
    #     return int(hash_val) % self.capacity

    def __len__(self):
        return self.size
