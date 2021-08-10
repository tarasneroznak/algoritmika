class HashTable:
    def __init__(self) -> None:
        self.capacity = 10
        self.table = [self.node()] * self.capacity

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

    def hash(self, key: str):
        return sum(map(ord, key)) % self.capacity

    def node(self, value=None, key=None, next=None):
        return {'value': value, 'key': key, 'next': next}

    def insert(self, list, key, value):
        list['next'] = self.node(value,  key, list['next'])

    def find(self, list, key):
        item = list['next']
        while (item != None):
            if (item['key'] == key):
                return item

            item = item['next']

        return None

ht = HashTable()

ht.set('a', 1)
ht.set('b', 2)
ht.set('c', 3)
ht.set('d', 4)
ht.set('4', 4)
ht.set('2', 4)

print(ht.table)
print(ht.get('a'))
print(ht.get('b'))
print(ht.get('c'))
print(ht.get('d'))
print(ht.get('4'))
print(ht.get('2'))
