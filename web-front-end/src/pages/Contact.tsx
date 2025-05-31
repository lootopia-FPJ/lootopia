/* eslint-disable max-lines-per-function */
import TextComponent from '../components/ui/TextComponent'
import ImageComponent from '../components/ui/ImageComponent'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Button } from '../components/ui/button'
import contact from '../assets/contact.jpg'

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-16 lg:px-32">
      <div className="text-center mb-12">
        <TextComponent as="h1" className="text-4xl md:text-5xl font-extrabold text-[#91452e]">
          📬 Contactez-nous
        </TextComponent>
        <TextComponent as="p" className="text-lg mt-4 text-gray-600 max-w-2xl mx-auto">
          Une question ? Une suggestion ? Ou tout simplement envie de nous dire bonjour ?
          Écrivez-nous et rejoignez la communauté des explorateurs Lootopia.
        </TextComponent>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <form className="w-full md:w-1/2 bg-gray-100 p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" type="text" placeholder="Votre nom" />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="exemple@lootopia.com" />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} placeholder="Votre message..." />
          </div>

          <Button
            type="submit"
            className="bg-[#91452e] hover:bg-[#7a3825] text-black font-bold py-3 px-6 rounded-md transition duration-300"
          >
            Envoyer le message
          </Button>
        </form>

        <div className="w-full md:w-1/2 flex justify-center">
          <ImageComponent
            src={contact}
            alt="illustration contact"
            className="rounded-lg shadow-xl max-w-md"
          />
        </div>
      </div>
    </div>
  )
}

export default Contact
