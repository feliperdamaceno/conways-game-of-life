// Store
import { useGame } from '../store'

// Types
import type { Cell } from '../@types'

interface OrganismProps {
  cell: Cell
}

export default function Organism({ cell }: OrganismProps) {
  const updateOrganism = useGame((state) => state.updateOrganism)
  const isAlive = cell.alive ? 'bg-zinc-800' : 'bg-zinc-50'
  return (
    <div
      onClick={() => updateOrganism(cell.x, cell.y)}
      className={`${isAlive} w-4 aspect-square border border-zinc-200`}
    />
  )
}
