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
} from '@/components/ui/select'
import treasure from '../assets/treasure-c.png'
import ImageComponent from '../components/ui/ImageComponent'

const TreasureHuntForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      is_real_world: true,
      is_public: true,
      duration: '',
      max_players: '',
      entry_fee: '',
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
      duration: Yup.number().min(1).required('La durée est requise'),
      max_players: Yup.number().min(1).required('Le nombre de joueurs est requis'),
      entry_fee: Yup.number().min(0).required('Les frais de participation sont requis'),
      reward_type: Yup.string()
        .oneOf(['internal', 'external'])
        .required('La récompense est requise'),
      digging_delay: Yup.number().min(1).required(),
      digging_cost: Yup.number().min(1).required(),
      difficulty: Yup.number().oneOf([0, 1]).required('La difficulté est requise'),
    }),
    onSubmit: (values) => {
      console.log('Formulaire soumis avec les valeurs :', values)
    },
  })

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center bg-gray-100 px-4 md:px-16 overflow-auto">
        <Card className="w-full max-w-2xl p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg">Créer une Chasse au Trésor</CardTitle>
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
                <textarea
                  id="description"
                  name="description"
                  className="w-full border rounded p-2"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <Label htmlFor="max_players">Nombre max de joueurs</Label>
                <Input
                  id="max_players"
                  name="max_players"
                  type="number"
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
                  value={formik.values.entry_fee}
                  onChange={formik.handleChange}
                />
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
                    <SelectItem value="internal">Interne (monnaie virtuelle, objets)</SelectItem>
                    <SelectItem value="external">
                      Externe (biens matériels, offres partenaires)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="digging_delay">Délai entre les fouilles (secondes)</Label>
                  <Input
                    id="digging_delay"
                    name="digging_delay"
                    type="number"
                    value={formik.values.digging_delay}
                    onChange={formik.handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="digging_cost">Coût d'une fouille (couronnes)</Label>
                  <Input
                    id="digging_cost"
                    name="digging_cost"
                    type="number"
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

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  onClick={() => {
                    formik.setFieldValue('is_draft', true)
                    formik.handleSubmit()
                  }}
                  variant="secondary"
                >
                  Enregistrer comme brouillon
                </Button>
                <Button type="submit" onClick={() => formik.setFieldValue('is_draft', false)}>
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
