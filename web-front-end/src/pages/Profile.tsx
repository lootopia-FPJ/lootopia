/* eslint-disable max-lines-per-function */
import { useUser } from '../hooks/UserContext'
import { Button } from '../components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ModalDeleteAccount from '../components/ModalDeleteAccount'
import { ListChecks, Pencil, PlusCircle, Trash2 } from 'lucide-react'

const Profile = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  if (!user) return null

  const profileUrl =
    user.profile_picture ||
    'https://res.cloudinary.com/dfqxbwfnc/image/upload/v1744917478/307ce493-b254-4b2d-8ba4-d12c080d6651_nwu9zy.jpg'

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-gray-50">
      <aside className="w-full lg:w-1/4 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Actions</h2>
        <Button
          variant="primary"
          className="w-full text-left"
          onClick={() => navigate('/edit-profile')}
        >
          <Pencil size={18} />
          Modifier le profil
        </Button>

        <Button
          variant="destructive"
          className="w-full text-left"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 size={18} />
          Supprimer le compte
        </Button>

        <Button
          variant="primary"
          className="w-full text-left"
          onClick={() => navigate('/add-hunt')}
        >
          <PlusCircle size={18} />
          Ajouter une chasse
        </Button>
        <Button
          variant="primary"
          className="w-full text-left flex items-center gap-2"
          onClick={() => navigate('/my-hunts')}
        >
          <ListChecks size={18} />
          Mes chasses
        </Button>
      </aside>

      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">👤 Mon Profil</h1>

          <div className="flex justify-center mb-6">
            <Avatar className="w-28 h-28">
              <AvatarImage src={profileUrl} alt="Photo de profil" className="object-cover" />
              <AvatarFallback>{user.nickname?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">Adresse email :</span>
              <span className="text-gray-900">{user.email}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">Pseudo :</span>
              <span className="text-gray-900">{user.nickname}</span>
            </div>
          </div>
        </div>
      </main>
      <ModalDeleteAccount open={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
    </div>
  )
}

export default Profile
