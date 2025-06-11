/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../hooks/UserContext'
import TextComponent from '../components/ui/TextComponent'
import ImageComponent from '../components/ui/ImageComponent'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { toast, ToastContainer } from 'react-toastify'

interface UserArtefact {
  id: number
  quantity: number
  artefact: {
    id: number
    name: string
    rarity: string
    imageUrl?: string
  }
}

const MyArtefacts = () => {
  const { user } = useUser()
  const [items, setItems] = useState<UserArtefact[]>([])

  useEffect(() => {
    const fetchArtefacts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_MY_ARTEFACT_URL}/me`, {
          withCredentials: true,
        })
        setItems(res.data)
      } catch (err) {
        toast.error('Erreur lors de la récupération de vos artefacts')
      }
    }

    if (user?.id) fetchArtefacts()
  }, [user?.id])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">
      <ToastContainer />
      <TextComponent as="h1" className="text-3xl text-[#91452e] font-bold mb-8 text-center">
        Mes Artefacts
      </TextComponent>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((ua) => (
          <Card key={ua.id} className="flex flex-col justify-between shadow-md p-4">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{ua.artefact.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <ImageComponent
                src={ua.artefact.imageUrl || '/placeholder.png'}
                alt={ua.artefact.name}
                className="w-28 h-28 object-contain"
              />
              <TextComponent as="p" className="text-sm text-gray-600">
                Rareté : {ua.artefact.rarity}
              </TextComponent>
              <TextComponent as="p" className="text-base text-green-600 font-semibold">
                Quantité : {ua.quantity}
              </TextComponent>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyArtefacts
