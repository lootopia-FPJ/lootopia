/* eslint-disable max-lines-per-function */
import { FaInstagram, FaFacebook, FaYoutube, FaTwitch } from 'react-icons/fa'
import TextComponent from '../components/ui/TextComponent'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className=" text-black py-8 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4">
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white hover:bg-gray-300 transition"
          >
            <FaInstagram className="w-6 h-6 text-gray-900" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white hover:bg-gray-300 transition"
          >
            <FaFacebook className="w-6 h-6 text-gray-900" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white hover:bg-gray-300 transition"
          >
            <FaYoutube className="w-6 h-6 text-gray-900" />
          </a>
          <a
            href="https://www.twitch.tv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white hover:bg-gray-300 transition"
          >
            <FaTwitch className="w-6 h-6 text-gray-900" />
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-center">
          <a href="/conditions-utilisation" className="href-footer">
            <TextComponent>Conditions d'utilisation</TextComponent>
          </a>
          <a href="/politique-confidentialite" className="href-footer">
            <TextComponent>Politique de confidentialité</TextComponent>
          </a>
          <a href="/politique-copyright" className="href-footer">
            <TextComponent>Politique de copyright</TextComponent>
          </a>
        </div>

        <TextComponent className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Lootopia. Tous droits réservés.
        </TextComponent>
      </div>
    </footer>
  )
}
