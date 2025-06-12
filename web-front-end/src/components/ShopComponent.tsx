/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import TextComponent from './ui/TextComponent'
import ImageComponent from './ui/ImageComponent'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useUser } from '../hooks/UserContext'

interface Artefact {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

const ShopComponent = () => {
  const [artefacts, setArtefacts] = useState<Artefact[]>([])
  const { user } = useUser()

  useEffect(() => {
    const fetchArtefacts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_ARTEFACT_URL}/shop`, {
          withCredentials: true,
        })
        setArtefacts(res.data)
      } catch {
        toast.error('Erreur lors du chargement des artefacts')
      }
    }

    fetchArtefacts()
  }, [])

  const handleBuy = async (artefact: Artefact) => {
    if (!user?.id) {
      toast.warn('Veuillez vous connecter pour acheter des artefacts.')
      return
    }

    try {
      const balanceRes = await axios.get(`${import.meta.env.VITE_WALLET_URL}/${user.id}`, {
        withCredentials: true,
      })
      const balance = balanceRes.data

      if (balance < artefact.price) {
        toast.info('Solde insuffisant. Achetez des couronnes dans votre portefeuille.')
        return
      }

      // Étape 3 : débiter le montant
      await axios.post(
        `${import.meta.env.VITE_WALLET_URL}/${user.id}/debit`,
        {
          amount: artefact.price,
          description: `Achat de l'artefact : ${artefact.name}`,
        },
        { withCredentials: true }
      )

      toast.success(`Vous avez acheté : ${artefact.name} 🎉`)
    } catch {
      toast.error("Erreur lors de l'achat de l'artefact")
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />

      <TextComponent as="h1" className="text-3xl font-bold text-center mb-8">
        Boutique des Artefacts
      </TextComponent>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artefacts.map((item) => (
          <Card key={item.id} className="h-full flex flex-col shadow-md p-4">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{item.name}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-between items-center flex-grow space-y-4">
              <ImageComponent
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-contain"
              />

              <TextComponent as="p" className="text-sm text-center text-gray-700">
                {item.description}
              </TextComponent>

              <TextComponent as="p" className="text-lg font-semibold text-green-600">
                {item.price} 👑
              </TextComponent>

              <Button onClick={() => handleBuy(item)} className="w-full text-black">
                Acheter
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ShopComponent
