/* eslint-disable max-lines-per-function */
import { useUser } from '../hooks/UserContext'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user } = useUser()
  console.log('user', user?.nickname)
  const navigate = useNavigate()

  if (!user) return null

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Actions</h2>
        <Button
          variant="primary"
          className="w-full text-left"
          onClick={() => navigate('/edit-profile')}
        >
          ✏️ Modifier le profil
        </Button>

        <Button variant="destructive" className="w-full text-left">
          🗑️ Supprimer le compte
        </Button>

        <Button variant="primary" className="w-full text-left">
          ➕ Ajouter une chasse
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">👤 Mon Profil</h1>

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
    </div>
  )
}

export default Profile
