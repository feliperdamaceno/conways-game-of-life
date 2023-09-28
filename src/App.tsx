// Components
import { Controls, Grid } from './components'

// Store
import { useGame } from './store'

// Hooks
import { useEffect } from 'react'

const TICK = 100

export default function App() {
  const generateGrid = useGame((state) => state.generateGrid)
  const running = useGame((state) => state.running)
  const run = useGame((state) => state.run)

  useEffect(() => {
    generateGrid()
  }, [])

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      run()
    }, TICK)

    return () => clearInterval(interval)
  }, [running])

  return (
    <main className="grid min-h-screen gap-4 place-content-center justify-items-center">
      <Controls />
      <Grid />
    </main>
  )
}
