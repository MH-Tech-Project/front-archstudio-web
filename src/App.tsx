import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { initTheme } from './utils/theme'
import { router } from './routes'

function App() {

  useEffect(() => {
    initTheme()
  }, [])

  return (
    <div className="min-h-screen text-[var(--foreground)]" style={{ backgroundColor: 'var(--background)' }}>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
