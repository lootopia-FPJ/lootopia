/* eslint-disable max-lines-per-function */
import { Button } from '../components/ui/button'
import Img from '../components/ui/ImageComponent'
import TextComponent from '../components/ui/TextComponent'
import NewsCard from '../components/ui/NewsCard'
import logo from '../assets/logo-lootopia.png'
import androidIcone from '../assets/icons/android-3.png'
import ios from '../assets/icons/app-store.png'
import coffre from '../assets/coffre-2.png'
import news1 from '../assets/epée.png'
import news2 from '../assets/mode-jeu.png'
import news3 from '../assets/price.jpg'
import hunt from '../assets/hunt.png'
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

        <div className="w-full  py-10">
          <div className="container mx-auto px-6">
            <TextComponent as="h2" className="text-3xl font-bold text-center mb-6">
              Actualité récente
            </TextComponent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <NewsCard
                title="Nouvelle mise à jour : Artefacts cachés"
                date="5 Mars 2025"
                image={news1}
              />
              <NewsCard
                title="Lootopia : Nouveau mode de jeu annoncé !"
                date="3 Mars 2025"
                image={news2}
              />
              <NewsCard
                title="Événement spécial : Gagnez des récompenses exclusives"
                date="2 Mars 2025"
                image={news3}
              />
            </div>
            <div className="text-center mt-8">
              <Button className="home-button">Plus d'actualités</Button>
            </div>
          </div>
        </div>

        <div className="relative w-full flex items-center justify-center mt-10">
          <div className="absolute inset-0 bg-[#913E25] clip-diagonal"></div>
          <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-16">
            <div className="text-white text-center lg:text-left lg:max-w-lg">
              <TextComponent as="h2" className="text-3xl font-bold mb-4">
                Explorez le monde et trouvez des trésors cachés !
              </TextComponent>
              <TextComponent as="p" className="text-lg mb-6 text-black">
                Parcourez des lieux mystérieux, suivez des indices et résolvez des énigmes pour
                découvrir des artefacts rares dans Lootopia.
              </TextComponent>
              <Button className=" text-black px-6 py-3 shadow-md home-btn2">
                Démarrer votre chasse
              </Button>
            </div>
            <div className="relative hidden lg:block w-1/2">
              <Img
                src={hunt}
                alt="Chasse au trésor"
                className="w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
