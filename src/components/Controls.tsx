// Store
import { useGame } from '../store'

export default function Controls() {
  const populateGrid = useGame((state) => state.populateGrid)
  const toggleGame = useGame((state) => state.toggleGame)
  const running = useGame((state) => state.running)
  const reset = useGame((state) => state.reset)

  return (
    <div className="flex gap-4">
      <button onClick={populateGrid}>Populate</button>
      <button onClick={() => toggleGame()}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
