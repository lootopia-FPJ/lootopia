/* eslint-disable max-lines-per-function */
import TextComponent from '../components/ui/TextComponent'
import ImageComponent from '../components/ui/ImageComponent'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faede9] via-white to-[#f5dcd4] py-12 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-12">
        <TextComponent as="h1" className="text-4xl md:text-5xl font-extrabold text-[#91452e]">
          🌍 À propos de Lootopia
        </TextComponent>
        <TextComponent as="p" className="text-lg mt-4 text-gray-700 max-w-2xl mx-auto">
          Le monde est votre terrain de jeu. Explorez, collectionnez, créez et défiez vos amis dans
          l’univers palpitant de Lootopia.
        </TextComponent>
      </div>

      <div className="flex justify-center mb-10">
        <ImageComponent
          src="https://media.istockphoto.com/id/611868178/fr/photo/carte-au-tr%C3%A9sor-pirate.jpg?s=612x612&w=0&k=20&c=g-SbuZE0wA7criKg85Gd70z0mF5g_fCCbjo-WvYh9ss="
          alt="Carte Lootopia"
          className="rounded-xl shadow-lg w-full max-w-4xl h-auto"
        />
      </div>

      <div className="space-y-14">
        <div>
          <TextComponent as="h2" className="text-3xl font-bold text-[#91452e] mb-4">
            🎯 Objectif du jeu
          </TextComponent>
          <TextComponent as="p" className="text-gray-800 leading-relaxed">
            Dans Lootopia, vous partez à la chasse aux trésors cachés autour de vous grâce à une
            carte interactive. Explorez, dénichez des artefacts, collectionnez des couronnes 👑 et
            devenez le chasseur de trésors le plus renommé !
          </TextComponent>
        </div>

        <div>
          <TextComponent as="h2" className="text-3xl font-bold text-[#91452e] mb-4">
            🚀 Fonctionnalités
          </TextComponent>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>Carte géolocalisée interactive sur mobile</li>
            <li>Création de vos propres chasses sur le site web</li>
            <li>Boutique d’artefacts pour booster vos capacités</li>
            <li>Portefeuille intégré avec paiement sécurisé</li>
            <li>Évolution de profil et classement communautaire</li>
          </ul>
        </div>

        <div>
          <TextComponent as="h2" className="text-3xl font-bold text-[#91452e] mb-4">
            🤝 Une expérience sociale
          </TextComponent>
          <TextComponent as="p" className="text-gray-800 leading-relaxed">
            Lootopia n’est pas seulement un jeu : c’est un lien entre amis, familles et passionnés
            de découvertes. Créez des événements, organisez des chasses à plusieurs et partagez vos
            victoires.
          </TextComponent>
        </div>

        <div>
          <TextComponent as="h2" className="text-3xl font-bold text-[#91452e] mb-4">
            🌟 Vision
          </TextComponent>
          <TextComponent as="p" className="text-gray-800 leading-relaxed">
            Notre ambition est de transformer votre quotidien en aventure. Lootopia évolue
            constamment, avec des saisons, des artefacts spéciaux, et des événements surprises !
            Préparez-vous à l’inattendu...
          </TextComponent>
        </div>
      </div>

      <div className="mt-16 text-center">
        <TextComponent as="h2" className="text-2xl text-[#91452e] font-semibold mb-2">
          Prêt à rejoindre l'aventure ? 🎒
        </TextComponent>
        <TextComponent as="p" className="text-gray-700 mb-6">
          Créez votre compte, équipez-vous et partez à la conquête de Lootopia.
        </TextComponent>
        <a
          href="/register"
          className="inline-block bg-[#91452e] hover:bg-[#7a3825] font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          <span className="text-white "> S’inscrire maintenant</span>
        </a>
      </div>
    </div>
  )
}

export default About
