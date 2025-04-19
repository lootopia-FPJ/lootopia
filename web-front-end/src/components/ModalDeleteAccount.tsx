/* eslint-disable max-lines-per-function */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Button } from './ui/button'
import axios from 'axios'
import { useUser } from '../hooks/UserContext'
import { toast } from 'react-toastify'

interface ModalDeleteAccountProps {
  open: boolean
  onClose: () => void
}

const ModalDeleteAccount = ({ open, onClose }: ModalDeleteAccountProps) => {
  const { user, setUser } = useUser()

  const handleDelete = async () => {
    if (!user?.id) {
      toast.error('Utilisateur non trouvé.')
      return
    }

    try {
      await axios.delete(`http://localhost:3000/api/users/${user.id}`, {
        withCredentials: true,
      })

      setUser(null)
      onClose()

      window.alert('Votre compte a été supprimé avec succès.')
      window.location.href = '/'
    } catch (error) {
      console.error(error)
      toast.error('Une erreur est survenue lors de la suppression de votre compte.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Oui, supprimer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalDeleteAccount
