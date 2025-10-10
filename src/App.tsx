import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { initTheme } from './utils/theme'
import { router } from './routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  useEffect(() => {
    initTheme()
  }, [])

  return (
    <AuthProvider>
      <div className="min-h-screen text-[var(--foreground)]" style={{ backgroundColor: 'var(--background)' }}>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  )
}

export default App
