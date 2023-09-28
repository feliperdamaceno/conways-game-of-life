export type Cell = {
  alive: boolean
  x: number
  y: number
}

export type GameState = {
  grid: Cell[][]
  running: boolean
}

export type GameActions = {
  generateGrid: () => void
  populateGrid: () => void
  updateOrganism: (x: number, y: number) => void
  toggleGame: (isRunning?: boolean) => void
  reset: () => void
  run: () => void
}
