/* eslint-disable max-lines-per-function */
import TextComponent from '../components/ui/TextComponent'
import ImageComponent from '../components/ui/ImageComponent'
import event1 from '../assets/event-1.jpg'
import event2 from '../assets/event-2.jpg'
import event4 from '../assets/event-4.jpg'

const eventList = [
  {
    title: '🤝 Rencontre avec les organisateurs',
    description:
      'Viens rencontrer l’équipe Lootopia, poser tes questions, proposer des idées de chasses et découvrir les coulisses du projet.',
    date: 'Samedi 15 juin 2025 - Paris',
    imageUrl: event1,
  },
  {
    title: '🛍️ Vente exclusive de goodies',
    description:
      'Casquettes, t-shirts, sacs à dos, stickers... Découvre la collection officielle Lootopia disponible en édition limitée.',
    date: 'Du 20 au 25 juin 2025 - Boutique en ligne',
    imageUrl: event2,
  },
  {
    title: '🗺️ Chasse spéciale : L’artefact perdu',
    description:
      'Un événement géant dans plusieurs villes pour retrouver un artefact légendaire. Récompenses uniques à la clé !',
    date: '1er juillet 2025 - Multi-villes',
    imageUrl: event4,
  },
]

const Events = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-12">
        <TextComponent as="h1" className="text-4xl md:text-5xl font-extrabold text-[#91452e]">
          📅 Événements Lootopia
        </TextComponent>
        <TextComponent as="p" className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
          Participez à nos événements communautaires, rencontrez d'autres aventuriers et vivez
          l'expérience Lootopia en grandeur nature.
        </TextComponent>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {eventList.map((event, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
          >
            <ImageComponent
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <TextComponent as="h2" className="text-xl font-semibold text-[#91452e] mb-2">
              {event.title}
            </TextComponent>
            <TextComponent as="p" className="text-sm text-gray-700 mb-3">
              {event.description}
            </TextComponent>
            <TextComponent as="p" className="text-sm text-gray-500 italic">
              {event.date}
            </TextComponent>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
