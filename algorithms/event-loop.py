import time
from collections import deque
import heapq


class Scheduler:
    def __init__(self) -> None:
        self.ready = deque()  # functions ready for execution
        self.sleeping = []    # sleeping functions

    def call_later(self, delay, func):
        deadline = delay + time.time()
        heapq.heappush(self.sleeping, (deadline, func))

    def call_soon(self, func):
        self.ready.append(func)

    def run(self):
        while self.ready or self.sleeping:
            if not self.ready:
                deadline, func = heapq.heappop(self.sleeping)
                delta = deadline - time.time()
                if delta > 0:
                    time.sleep(delta)
                self.ready.append(func)

            while self.ready:
                func = self.ready.popleft()
                func()


sched = Scheduler()


def countDown(n):
    if n > 0:
        print(f"Down {n}")
        sched.call_later(4, lambda: countDown(n-1))


def countUp(stop, x=0):
    if x < stop:
        print(f"Up {x}")
        sched.call_later(1, lambda: countUp(stop, x + 1))


sched.call_soon(lambda: countDown(5))
sched.call_soon(lambda: countUp(20))
sched.run()
