from typing import List, Tuple, Set

DIRECTIONS = [(0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)]


class GameOfLifeMatrix:

    def __init__(self, initial_state=None):
        if initial_state is None:
            initial_state = []
        self.sparse_matrix_current = set(initial_state)
        self.sparse_matrix_new = set()
        self.checked_dead_cell = set()
        self.iteration_count = 0

    def find_alive_neighbours(self, cord: Tuple[int, int]) -> Set[Tuple[int, int]]:
        alive_neighbours = set()
        for direction in DIRECTIONS:
            new_cord = (cord[0] + direction[0], cord[1] + direction[1])
            if new_cord in self.sparse_matrix_current:
                alive_neighbours.add(new_cord)
        return alive_neighbours

    def live_cell_alive(self, cord: Tuple[int, int]) -> bool:
        alive_neighbours = self.find_alive_neighbours(cord)
        if len(alive_neighbours) == 2 or len(alive_neighbours) == 3:
            return True
        return False

    def live_cells_alive(self):
        for cell in self.sparse_matrix_current:
            if self.live_cell_alive(cell):
                self.sparse_matrix_new.add(cell)

    def find_dead_neighbours(self, cord: Tuple[int, int]):
        all_neighbours = set()
        for direction in DIRECTIONS:
            new_cord = (cord[0] + direction[0], cord[1] + direction[1])
            all_neighbours.add(new_cord)
        alive_neighbours = self.find_alive_neighbours(cord)
        return set(all_neighbours.difference(alive_neighbours))

    def dead_cells_alive(self):
        for cell in self.sparse_matrix_current:
            dead_neighbours = self.find_dead_neighbours(cell)
            for dead_cell in dead_neighbours:
                if dead_cell in self.checked_dead_cell:
                    continue
                alive_around_dead = self.find_alive_neighbours(dead_cell)
                if len(alive_around_dead) == 3:
                    self.sparse_matrix_new.add(dead_cell)
                self.checked_dead_cell.add(dead_cell)

    def complete_iteration(self):
        self.sparse_matrix_current = self.sparse_matrix_new
        self.sparse_matrix_new = set()
        self.checked_dead_cell = set()

    def run_iteration(self):
        self.iteration_count += 1
        self.live_cells_alive()
        self.dead_cells_alive()
        self.complete_iteration()

    def __str__(self):
        return str(self.sparse_matrix_current) + "\t" + str(self.iteration_count)

# obj = GameOfLifeMatrix(initial_state=[(1, 0), (2, 1), (1, 2)])
# print(obj)
# obj.run_iteration()
# print(obj)
# obj.run_iteration()
# print(obj)
