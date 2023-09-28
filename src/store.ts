// Libs
import { produce } from 'immer'

// Store
import { create } from 'zustand'

// Types
import type { Cell, GameState, GameActions } from './@types'

const GRID_SIZE = 50
const OPERATIONS = [
  { row: -1, column: -1 },
  { row: -1, column: 0 },
  { row: -1, column: 1 },
  { row: 0, column: -1 },
  { row: 0, column: 1 },
  { row: 1, column: -1 },
  { row: 1, column: 0 },
  { row: 1, column: 1 }
]

export const useGame = create<GameState & GameActions>((set, get) => ({
  grid: [[]],
  running: false,
  generateGrid: () => {
    set(() => {
      const grid = Array.from(Array(GRID_SIZE), (_, x) =>
        Array.from(Array(GRID_SIZE), (_, y): Cell => ({ alive: false, x, y }))
      )
      return { grid }
    })
  },
  populateGrid: () =>
    set((state) => {
      const grid = state.grid.map((column) =>
        column.map((cell) => ({
          ...cell,
          alive: Math.random() < 0.1 ? true : false
        }))
      )
      return { grid }
    }),
  updateOrganism: (x: number, y: number) => {
    set((state) => {
      return produce(state, ({ grid }) => {
        const organism = grid[x][y]
        organism.alive = !organism.alive
      })
    })
  },
  toggleGame: (isRunning?: boolean) => {
    set((state) => ({ running: isRunning ?? !state.running }))
  },
  reset: () => {
    get().generateGrid()
    get().toggleGame(false)
  },
  run: () =>
    set((state) => {
      return produce(state, ({ grid }) => {
        grid.forEach((column) => {
          column.forEach((cell) => {
            const neighbours = countNeighbours(grid, cell)

            // Any live cell with two or three live neighbours survives.
            if (cell.alive && (neighbours === 2 || neighbours === 3)) {
              return (cell.alive = true)
            }

            // Any dead cell with three live neighbours becomes a live cell.
            if (!cell.alive && neighbours === 3) return (cell.alive = true)

            // All other live cells die in the next generation or stay dead.
            cell.alive = false
          })
        })
      })
    })
}))

function countNeighbours(grid: Cell[][], cell: Cell) {
  return OPERATIONS.reduce((count, operation) => {
    const positionX = cell.x + operation.row
    const positionY = cell.y + operation.column
    const isValidPosition =
      positionX >= 0 &&
      cell.x < grid.length - 1 &&
      positionY >= 0 &&
      positionY < grid[cell.y].length

    if (isValidPosition) {
      const neighbour = grid[positionX][positionY]
      if (neighbour.alive) {
        return (count += 1)
      }
    }

    return count
  }, 0)
}
