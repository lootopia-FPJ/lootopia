/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'

type EditModalProps = {
  open: boolean
  onClose: () => void
  hunt: {
    id: number
    name: string
    description: string
    ended_at: string
    max_players: number
    entry_fee: number
    reward_type: string
    digging_delay: number
    digging_cost: number
    difficulty: number
    is_real_world: boolean
    is_public: boolean
  } | null
  onSuccess: () => void
}

const ModalEditHunt = ({ open, onClose, hunt, onSuccess }: EditModalProps) => {
  if (!hunt) return null

  const formik = useFormik({
    initialValues: {
      name: hunt.name || '',
      description: hunt.description || '',
      ended_at: hunt.ended_at ? hunt.ended_at.substring(0, 16) : '',
      max_players: hunt.max_players || 1,
      entry_fee: hunt.entry_fee || 0,
      reward_type: hunt.reward_type || '',
      digging_delay: hunt.digging_delay || 1,
      digging_cost: hunt.digging_cost || 1,
      difficulty: hunt.difficulty || 0,
      is_real_world: hunt.is_real_world,
      is_public: hunt.is_public,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Titre requis'),
      description: Yup.string().required('Description requise'),
      ended_at: Yup.date().required('Date de fin requise'),
      max_players: Yup.number().min(1, 'Minimum 1 joueur').required('Champ requis'),
      entry_fee: Yup.number().min(0, 'Ne peut pas être négatif').required('Champ requis'),
      reward_type: Yup.string().oneOf(['internal', 'external']).required('Champ requis'),
      digging_delay: Yup.number().min(1).required('Champ requis'),
      digging_cost: Yup.number().min(1).required('Champ requis'),
      difficulty: Yup.number().oneOf([0, 1]).required('Champ requis'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_HUNT_URL}/${hunt.id}`,
          { ...values },
          { withCredentials: true }
        )
        toast.success('🎯 Chasse modifiée avec succès !')
        onSuccess()
        onClose()
      } catch {
        toast.error('❌ Erreur lors de la modification')
      }
    },
  })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>✏️ Modifier la chasse</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Titre</Label>
            <Input id="name" {...formik.getFieldProps('name')} />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...formik.getFieldProps('description')} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ended_at">Date de fin</Label>
              <Input id="ended_at" type="datetime-local" {...formik.getFieldProps('ended_at')} />
            </div>
            <div>
              <Label htmlFor="max_players">Nombre max de joueurs</Label>
              <Input id="max_players" type="number" {...formik.getFieldProps('max_players')} />
            </div>
          </div>

          <div>
            <Label>Type de récompense</Label>
            <Select
              value={formik.values.reward_type}
              onValueChange={(val) => formik.setFieldValue('reward_type', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Interne</SelectItem>
                <SelectItem value="external">Externe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" variant="secondary">
              Mettre à jour
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalEditHunt
