import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TextComponent from '../components/ui/TextComponent'

const Cancel = () => {
  const navigate = useNavigate()

  useEffect(() => {
    toast.warn('⛔ Paiement annulé.')
    setTimeout(() => {
      navigate('/wallet')
    }, 3000)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <TextComponent as="h2" className="text-red-600 font-bold text-center px-4 text-2xl">
        ❌ Paiement annulé. Redirection en cours...
      </TextComponent>
    </div>
  )
}

export default Cancel
