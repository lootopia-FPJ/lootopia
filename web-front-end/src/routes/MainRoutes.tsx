import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import About from '../pages/About'
import Events from '../pages/ Events'
import Partnership from '../pages/Partnership'
import Boutique from '../pages/Boutique'
import Contact from '../pages/ Contact'

export default function MainRoutes() {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen flex flex-col justify-between">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/evenement" element={<Events />} />
            <Route path="/partenariat" element={<Partnership />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  )
}
