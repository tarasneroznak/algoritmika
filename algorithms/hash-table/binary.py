class BinaryHashTable:
    def __init__(self) -> None:
        self.store: int = 0

    def set(self, key: str, value) -> None:
        index = self.hash(key)
        list = self.table[index]

        node = self.find(list, key)
        if (node):
            node['value'] = value
        else:
            self.insert(list, key, value)

    def get(self, key: str):
        index = self.hash(key)
        list = self.table[index]
        node = self.find(list, key)

        if (node):
            return node['value']

        return node

    def hash(self, key):
        pass

bht = BinaryHashTable()

bht.set('a', 1)
bht.set('b', 2)
bht.set('c', 3)
bht.set('d', 4)
bht.set('4', 4)
bht.set('2', 4)

print(bht.get('a'))
print(bht.get('b'))
print(bht.get('c'))
print(bht.get('d'))
print(bht.get('4'))
print(bht.get('2'))
