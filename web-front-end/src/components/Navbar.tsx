/* eslint-disable max-lines-per-function */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, X, UserCheck, LogOut } from 'lucide-react'
import { useUser } from '../hooks/UserContext'
import '../styles/navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useUser()

  return (
    <nav className="py-4 shadow-md fixed top-0 left-0 w-full z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="navbar-link title text-xl font-bold">
          Lootopia
        </Link>

        <ul className="hidden lg:flex space-x-8 items-center">
          {['À propos', 'Événement', 'Partenariat', 'Événements', 'Boutique', 'Contact'].map(
            (item, index) => (
              <li key={index}>
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="navbar-link">
                  <Button variant="ghost" className="navbar-button">
                    {item}
                  </Button>
                </Link>
              </li>
            )
          )}
          {user && (
            <>
              <li>
                <Link to="/profil" className="navbar-link">
                  <Button variant="ghost" className="navbar-button flex items-center space-x-2">
                    <UserCheck size={22} />
                    <span className="text-sm">Profil</span>
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/login" className="navbar-link">
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="navbar-button flex items-center "
                  >
                    <LogOut size={20} />
                    <span>Déconnexion</span>
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/*burger */}
        <Button
          variant="ghost"
          className="navbar-button lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>

      {/* Menu mobile */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-md transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col space-y-6">
          <Button
            variant="ghost"
            className="navbar-button self-end"
            onClick={() => setIsOpen(false)}
          >
            <X size={28} />
          </Button>

          {['À propos', 'Événement', 'Partenariat', 'Événements', 'Boutique', 'Contact'].map(
            (item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="navbar-link text-lg"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            )
          )}

          {/* Mobile user profile & logout */}
          {user && (
            <>
              <Link
                to="/profil"
                className="navbar-link text-lg flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <UserCheck size={20} />
                <span>Mon profil</span>
              </Link>

              <Link
                to="/login"
                className="navbar-link flex items-center space-x-2"
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
              >
                <LogOut className="text-red-400" size={20} />
                <span className="text-red-400">Déconnexion</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
