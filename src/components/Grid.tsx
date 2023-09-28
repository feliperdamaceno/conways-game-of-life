// Components
import Organism from './Organism'

// Store
import { useGame } from '../store'

export default function Grid() {
  const grid = useGame((state) => state.grid)

  return (
    <section
      className="grid"
      style={{ gridTemplateColumns: `repeat(${grid.length}, min-content)` }}
    >
      {grid.map((column) =>
        column.map((cell) => (
          <Organism key={`cell-${cell.x}-${cell.y}`} cell={cell} />
        ))
      )}
    </section>
  )
}
