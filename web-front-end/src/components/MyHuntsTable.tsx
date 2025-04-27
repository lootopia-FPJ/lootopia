/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../hooks/UserContext'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'
import { Button } from '../components/ui/button'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Badge } from '../components/ui/badge'
import ModalConfirmDelete from '../components/ModalConfirmDelete'
import '../styles/myHuntsTable.css'
import { Pencil, Trash2 } from 'lucide-react'
import ModalEditHunt from './ModalEditHunt'

type TreasureHunt = {
  id: number
  name: string
  is_draft: boolean
  ended_at: string
}

const MyHuntsTable = () => {
  const { user } = useUser()
  const [hunts, setHunts] = useState<TreasureHunt[]>([])
  const [selectedHuntId, setSelectedHuntId] = useState<number | null>(null)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedHunt, setSelectedHunt] = useState<TreasureHunt | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const fetchHunts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_HUNT_URL}/user/${user?.id}`, {
        withCredentials: true,
      })
      setHunts(res.data)
    } catch {
      toast.error('Erreur lors du chargement des chasses')
    }
  }

  const handlePublish = async (huntId: number) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_HUNT_URL}/${huntId}`,
        { is_draft: false },
        { withCredentials: true }
      )
      toast.success('Chasse publiée avec succès 🎉')
      fetchHunts()
    } catch {
      toast.error('Erreur lors de la publication')
    }
  }

  const handleDelete = async () => {
    if (!selectedHuntId) return

    try {
      await axios.delete(`${import.meta.env.VITE_HUNT_URL}/${selectedHuntId}`, {
        withCredentials: true,
      })
      toast.success('Chasse supprimée avec succès 🗑️')
      setOpenDeleteModal(false)
      setSelectedHuntId(null)
      fetchHunts()
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  const getStatus = (hunt: TreasureHunt) => {
    if (hunt.is_draft) return 'Brouillon'

    const now = new Date()
    const endedAt = new Date(hunt.ended_at)

    return endedAt > now ? 'En cours' : 'Terminé'
  }

  useEffect(() => {
    if (user?.id) fetchHunts()
  }, [user])

  if (!hunts.length) {
    return <p className="text-gray-500">Aucune chasse trouvée.</p>
  }

  return (
    <div className="w-full px-4 sm:px-8 py-6">
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <ToastContainer />
        <ModalConfirmDelete
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDelete}
        />
        <ModalEditHunt
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          hunt={selectedHunt as any}
          onSuccess={fetchHunts}
        />

        <Table className="min-w-full text-sm sm:text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%] text-gray-600">Nom</TableHead>
              <TableHead className="text-gray-600">État</TableHead>
              <TableHead className="text-gray-600">Date de fin</TableHead>
              <TableHead className="text-right text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hunts.map((hunt) => (
              <TableRow key={hunt.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-800">{hunt.name}</TableCell>
                <TableCell>
                  {getStatus(hunt) === 'Brouillon' && <Badge variant="secondary">Brouillon</Badge>}
                  {getStatus(hunt) === 'En cours' && <Badge variant="default">En cours</Badge>}
                  {getStatus(hunt) === 'Terminé' && <Badge variant="destructive">Terminé</Badge>}
                </TableCell>
                <TableCell>{new Date(hunt.ended_at).toLocaleString('fr-FR')}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    {hunt.is_draft && (
                      <>
                        <Button
                          className="btnTable"
                          size="sm"
                          onClick={() => handlePublish(hunt.id)}
                        >
                          Publier
                        </Button>
                        <Pencil
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          size={20}
                          onClick={() => {
                            setSelectedHunt(hunt)
                            setOpenEditModal(true)
                          }}
                        />

                        <Trash2
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          size={20}
                          onClick={() => {
                            setSelectedHuntId(hunt.id)
                            setOpenDeleteModal(true)
                          }}
                        />
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MyHuntsTable
