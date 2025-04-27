import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import TextComponent from '../components/ui/TextComponent'

interface ModalConfirmDeleteProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ModalConfirmDelete = ({ open, onClose, onConfirm }: ModalConfirmDeleteProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
        </DialogHeader>
        <TextComponent className="text-gray-600 mt-2">
          Es-tu sûr de vouloir supprimer cette chasse ? Cette action est irréversible.
        </TextComponent>
        <DialogFooter className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalConfirmDelete
