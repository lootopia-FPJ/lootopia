import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TextComponent from '../components/ui/TextComponent'

const Success = () => {
  const navigate = useNavigate()

  useEffect(() => {
    toast.success('🎉 Paiement réussi ! Couronnes ajoutées.')
    setTimeout(() => {
      navigate('/wallet')
    }, 3000)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <TextComponent as="h2" className="text-green-700 font-bold text-center px-4 text-2xl">
        ✅ Paiement validé ! Redirection en cours...
      </TextComponent>
    </div>
  )
}

export default Success
