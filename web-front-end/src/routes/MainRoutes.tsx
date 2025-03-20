// src/routes/MainRoutes.tsx
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import About from '../pages/About'
import Events from '../pages/Events'
import Partnership from '../pages/Partnership'
import Boutique from '../pages/Boutique'
import Contact from '../pages/Contact'
import Register from '../pages/Register'
import AccountActivationPage from '../pages/AccountActivation'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="evenement" element={<Events />} />
        <Route path="partenariat" element={<Partnership />} />
        <Route path="boutique" element={<Boutique />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="/auth/activate" element={<AccountActivationPage />} />
      </Route>
    </Routes>
  )
}

export default MainRoutes
