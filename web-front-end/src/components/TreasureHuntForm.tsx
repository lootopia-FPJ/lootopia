/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../components/ui/select'
import treasure from '../assets/treasure-c.png'
import ImageComponent from '../components/ui/ImageComponent'
import { Textarea } from './ui/textarea'
import { useUser } from '../hooks/UserContext'
import '../styles/treasureHuntForm.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const TreasureHuntForm = () => {
  const { user } = useUser()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      is_real_world: true,
      is_public: true,
      ended_at: '',
      max_players: 1,
      entry_fee: 0,
      reward_type: '',
      digging_delay: 1,
      digging_cost: 1,
      difficulty: 0,
      is_draft: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Le titre est requis'),
      description: Yup.string().required('La description est requise'),
      is_real_world: Yup.boolean().required(),
      is_public: Yup.boolean().required(),
      ended_at: Yup.date()
        .min(new Date(), 'La date de fin doit être dans le futur')
        .required('La date de fin est requise'),
      max_players: Yup.number()
        .min(1, 'Le nombre de joueurs doit être supérieur à 0')
        .required('Le nombre de joueurs est requis'),
      entry_fee: Yup.number()
        .min(0, 'Les frais de participation ne peuvent pas être négatifs')
        .required('Les frais de participation sont requis'),
      reward_type: Yup.string()
        .oneOf(['internal', 'external'])
        .required('La récompense est requise'),
      digging_delay: Yup.number().min(1, 'Le délai doit être au moins 1').required(),
      digging_cost: Yup.number().min(1, 'Le coût doit être au moins 1').required(),
      difficulty: Yup.number().oneOf([0, 1]).required('La difficulté est requise'),
    }),
    onSubmit: async (values) => {
      if (!user || !user.id) {
        toast.error('Utilisateur introuvable. Veuillez vous reconnecter.')
        return
      }
      try {
        const HUNT_URL = import.meta.env.VITE_HUNT_URL
        const payload = {
          ...values,
          ended_at: values.ended_at ? new Date(values.ended_at).toISOString() : undefined,
          created_by: user.id,
        }

        await axios.post(HUNT_URL, payload, {
          withCredentials: true,
        })

        toast.success('🎉 Chasse créée avec succès !')
        formik.resetForm()
      } catch (error) {
        const message =
          (error as any).response?.data?.message || 'Erreur lors de la création de la chasse'
        toast.error(message)
      }
    },
  })

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <ToastContainer />
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 md:px-8 lg:px-16 py-8 overflow-y-auto">
        <Card className="w-full max-w-3xl p-6 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="text-center text-xl md:text-2xl">
              Créer une Chasse au Trésor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Titre</Label>
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="Décris ta chasse au trésor..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Monde réel ?</Label>
                  <Select
                    value={formik.values.is_real_world.toString()}
                    onValueChange={(val) => formik.setFieldValue('is_real_world', val === 'true')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Oui</SelectItem>
                      <SelectItem value="false">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Mode</Label>
                  <Select
                    value={formik.values.is_public.toString()}
                    onValueChange={(val) => formik.setFieldValue('is_public', val === 'true')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Public</SelectItem>
                      <SelectItem value="false">Privé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="ended_at">Date et heure de fin</Label>
                <Input
                  id="ended_at"
                  name="ended_at"
                  type="datetime-local"
                  value={formik.values.ended_at}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max_players">Nombre max de joueurs</Label>
                  <Input
                    id="max_players"
                    name="max_players"
                    type="number"
                    min={1}
                    value={formik.values.max_players}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="entry_fee">Frais de participation</Label>
                  <Input
                    id="entry_fee"
                    name="entry_fee"
                    type="number"
                    min={0}
                    value={formik.values.entry_fee}
                    onChange={formik.handleChange}
                  />
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="digging_delay">Délai entre les fouilles</Label>
                  <Input
                    id="digging_delay"
                    name="digging_delay"
                    type="number"
                    min={1}
                    value={formik.values.digging_delay}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="digging_cost">Coût d'une fouille</Label>
                  <Input
                    id="digging_cost"
                    name="digging_cost"
                    type="number"
                    min={1}
                    value={formik.values.digging_cost}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div>
                <Label>Difficulté</Label>
                <Select
                  value={formik.values.difficulty.toString()}
                  onValueChange={(val) => formik.setFieldValue('difficulty', Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Facile</SelectItem>
                    <SelectItem value="1">Difficile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                <Button
                  type="button"
                  className="create-btn w-full sm:w-auto"
                  onClick={() => {
                    formik.setFieldValue('is_draft', true)
                    formik.handleSubmit()
                  }}
                >
                  Enregistrer comme brouillon
                </Button>
                <Button
                  type="submit"
                  className="create-btn w-full sm:w-auto"
                  onClick={() => formik.setFieldValue('is_draft', false)}
                >
                  Publier la chasse
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2 h-full items-center justify-center bg-white">
        <ImageComponent src={treasure} alt="Illustration Chasse" className="img-logo" />
      </div>
    </div>
  )
}

export default TreasureHuntForm
