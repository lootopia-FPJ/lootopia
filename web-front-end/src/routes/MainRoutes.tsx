/* eslint-disable max-lines-per-function */
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
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import PrivateRoute from '../components/PrivateRoute'
import EditProfile from '../pages/EditProfile'
import AddTreasureHunt from '../pages/AddTreasureHunt'
import MyHunts from '../pages/MyHunts'
import Wallet from '../pages/Wallet'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="evenement" element={<Events />} />
        <Route path="partenariat" element={<Partnership />} />
        <Route path="boutique" element={<Boutique />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="/auth/activate" element={<AccountActivationPage />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="add-hunt"
          element={
            <PrivateRoute>
              <AddTreasureHunt />
            </PrivateRoute>
          }
        />
        <Route
          path="my-hunts"
          element={
            <PrivateRoute>
              <MyHunts />
            </PrivateRoute>
          }
        />
        <Route
          path="wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        />
        <Route
          path="success"
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />
        <Route
          path="cancel"
          element={
            <PrivateRoute>
              <Cancel />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default MainRoutes
