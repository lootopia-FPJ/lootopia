/* eslint-disable max-lines-per-function */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Button } from './components/ui/button'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Test ShadCN/UI avec Tailwind v4
                </h1>
                <Button variant="secondary">Clique-moi</Button>
              </div>
            }
          />

          {/* Autres pages de navigation */}
          <Route path="/circuit-go" element={<div>Page Circuit Go</div>} />
          <Route path="/actualités" element={<div>Page Actualités</div>} />
          <Route path="/saisons" element={<div>Page Saisons</div>} />
          <Route path="/événements" element={<div>Page Événements</div>} />
          <Route
            path="/carte-journée-communauté"
            element={<div>Page Carte Journée Communauté</div>}
          />
          <Route path="/classement" element={<div>Page Classement</div>} />
          <Route path="/boutique" element={<div>Page Boutique</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
