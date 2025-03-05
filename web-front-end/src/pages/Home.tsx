/* eslint-disable max-lines-per-function */
import { Button } from '../components/ui/button'
import Img from '../components/ui/ImageComponent'
import TextComponent from '../components/ui/TextComponent'
import logo from '../assets/logo-lootopia.png'
import androidIcone from '../assets/icons/android-3.png'
import ios from '../assets/icons/app-store.png'
import coffre from '../assets/coffre-2.png'
import '../styles/home.css'

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-screen bg-white">
        <div className="w-full max-w-screen grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-8 lg:px-16">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <TextComponent as="h1" className="text-[#913E25]">
              LOOTOPIA
            </TextComponent>
            <TextComponent as="p" className="text-2xl font-semibold mt-2">
              Find teaser hunt games near you
            </TextComponent>
            <div className="mt-6 flex gap-4">
              <Button className="text-white px-6 py-3 shadow-md home-button">Se connecter</Button>
              <Button className="bg-black text-white px-6 py-3 shadow-md hover:bg-gray-800 home-btn">
                S'inscrire
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Img
              src={logo}
              alt="Lootopia Logo"
              className="w-2/3 max-w-xs md:max-w-md lg:max-w-lg"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-4 py-6 px-4">
          <Button className="bg-black text-white px-6 py-3 flex items-center gap-3 shadow-md home-button w-full md:w-auto">
            <Img src={androidIcone} alt="Android" className="w-5 h-5" />
            Télécharger sur Android
          </Button>
          <Button className="text-black px-6 py-3 flex items-center gap-3 shadow-md home-btn2 w-full md:w-auto">
            <Img src={ios} alt="iOS" className="w-5 h-5" />
            Télécharger sur iOS
          </Button>
        </div>
        <div className="max-w-screen bg-gray-100 flex flex-wrap justify-center gap-4 py-10 px-4">
          <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-4">
            <div>
              <TextComponent as="p" className="max-w-md text-b">
                Découvrez les règles du jeu et préparez-vous pour l’aventure !
              </TextComponent>
              <Button className=" text-white shadow-md home-button">Règles de jeu</Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Img src={coffre} alt="Coffre" className="w-64 h-64" />
          </div>
        </div>
      </div>
    </>
  )
}
