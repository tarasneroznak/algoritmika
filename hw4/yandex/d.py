class HashTable:
    def __init__(self) -> None:
        self.capacity = 10
        self.load_factor = 0.75
        self.size = 0

        self.table = [None] * self.capacity
        self.keys = [None] * self.capacity

    def set(self, key: str, value) -> None:
        if (self.need_rebuild()):
            self.rebuild()

        index = self.pHash(str(key))
        if (self.table[index] != None):
            index = self.find_insert_index(index, key)

        if (self.keys[index] == key):
            self.table[index] = value
            return

        self.keys[index] = key
        self.table[index] = value

        self.size += 1

    def get(self, key: str):
        index = self.pHash(str(key))
        if (self.keys[index] != key):
            index = self.find_value_index(index, key)

        return self.table[index]

    def find_insert_index(self, i: int, key: str) -> int:
        while (True):
            if (self.keys[i] == key):
                return i

            if (self.table[i] == None):
                return i

            i = (i + 1) % self.capacity

    def find_value_index(self, i: int, key: str) -> int:
        while (True):
            if (self.keys[i] == key):
                return i

            i = (i + 1) % self.capacity

    def need_rebuild(self):
        return (((self.size + 1) * 100) / self.capacity) * 0.01 >= self.load_factor

    def rebuild(self):
        tmp_keys = self.keys.copy()
        tmp_values = self.table.copy()
        capacity = self.capacity

        self.capacity = capacity * 2
        self.size = 0
        self.keys = [None] * self.capacity
        self.table = [None] * self.capacity

        for i in range(capacity):
            self.set(tmp_keys[i], tmp_values[i])

    def hash(self, key: str):
        return sum(map(ord, key)) % self.capacity

    def pHash(self, key):
        hash_val = 0
        for c in str(key):
            hash_val = hash_val * 31 + ord(c)

        return int(hash_val) % self.capacity

    def __len__(self):
        return self.size

f = open('input.txt')
data = f.readlines()

words = HashTable()

for item in data:
    for w in item.split(' '):
        c = "".join(w.split())
        if (c): words.set(c, True)

print(len(words))
