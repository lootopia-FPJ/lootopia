/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import ModalChangePassword from './ModalChangePassword'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useUser } from '../hooks/UserContext'
import { uploadToCloudinary } from '../utils/uploadToCloudinary'
import '../styles/editProfileForm.css'
import 'react-toastify/dist/ReactToastify.css'

const EditProfileForm = () => {
  const { user, setUser } = useUser()
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const defaultProfileUrl =
    user?.profile_picture ||
    'https://res.cloudinary.com/dfqxbwfnc/image/upload/v1744917478/307ce493-b254-4b2d-8ba4-d12c080d6651_nwu9zy.jpg'

  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [profileImage])

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
      nickname: user?.nickname || '',
      phone_number: user?.phone_number || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalide'),
      nickname: Yup.string(),
      phone_number: Yup.string().matches(
        /^(\+?\d{1,3}[- ]?)?\d{6,14}$/,
        'Numéro de téléphone invalide'
      ),
    }),
    onSubmit: async (values) => {
      if (!user || !user.id) {
        toast.error('Utilisateur introuvable. Veuillez vous reconnecter.')
        return
      }

      try {
        let imageUrl = user.profile_picture || defaultProfileUrl

        if (profileImage) {
          toast.info('Téléversement de l’image en cours...')
          imageUrl = await uploadToCloudinary(profileImage)
        }

        const payload = {
          ...values,
          profile_picture: imageUrl,
        }

        const response = await axios.patch(`http://localhost:3000/api/users/${user.id}`, payload)

        toast.success('Profil mis à jour avec succès 🎉')

        const updatedUser = response.data
        if (updatedUser?.id && updatedUser?.email) {
          setUser(updatedUser)
        }
      } catch (error) {
        console.error(error)
        toast.error('Erreur lors de la mise à jour du profil ❌')
      }
    },
  })

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <ToastContainer />
      <CardHeader>
        <CardTitle className="text-center text-xl">Modifier mon profil</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={previewUrl || user?.profile_picture || defaultProfileUrl}
                alt="Photo de profil"
                className="object-cover"
              />
              <AvatarFallback>
                {formik.values.nickname?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>

            <div className="w-full">
              <Label htmlFor="profile_picture">Photo de profil</Label>
              <Input
                id="profile_picture"
                name="profile_picture"
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="faiza@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="nickname">Pseudo</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="Faïza"
              value={formik.values.nickname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.nickname && formik.errors.nickname && (
              <p className="text-sm text-red-600">{formik.errors.nickname}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone_number">Numéro de téléphone</Label>
            <Input
              id="phone_number"
              name="phone_number"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <p className="text-sm text-red-600">{formik.errors.phone_number}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button type="submit" className="edit-btn w-full md:w-auto">
              💾 Enregistrer
            </Button>

            <Button
              type="button"
              variant="default"
              className="edit-btn w-full md:w-auto"
              onClick={() => setShowModal(true)}
            >
              🔐 Changer mot de passe
            </Button>
          </div>
        </form>
      </CardContent>

      <ModalChangePassword open={showModal} onClose={() => setShowModal(false)} />
    </Card>
  )
}

export default EditProfileForm
