import { BrowserRouter as Router } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import { UserProvider } from './hooks/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <MainRoutes />
      </UserProvider>
    </Router>
  )
}

export default App
