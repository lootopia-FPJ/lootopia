/* eslint-disable max-lines-per-function */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'
import '../styles/navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="py-4 shadow-md fixed top-0 left-0 w-full z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="navbar-link title text-xl font-bold">
          Lootopia
        </Link>

        <ul className="hidden lg:flex space-x-8">
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
        </ul>

        <Button
          variant="ghost"
          className="navbar-button lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>
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
        </div>
      </div>
    </nav>
  )
}
