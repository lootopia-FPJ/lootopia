/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import TextComponent from '../components/ui/TextComponent'

const AccountActivationPage = () => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')

    if (token) {
      const activateAccount = async () => {
        try {
          await axios.get(`http://localhost:3000/api/auth/activate?token=${token}`)
        } catch (error) {}
      }

      activateAccount()
    } else {
    }
  }, [searchParams])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <TextComponent as="h2" className="text-green-500 text-center text-2xl font-bold mb-4">
        Compte activé avec succès 🎉
      </TextComponent>
      <TextComponent className="text-center text-gray-700">
        Votre compte a été activé. Vous pouvez maintenant vous connecter et profiter de nos
        services.
      </TextComponent>
    </div>
  )
}

export default AccountActivationPage
