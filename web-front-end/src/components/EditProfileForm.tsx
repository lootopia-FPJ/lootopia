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
import { uploadToCloudinary } from '../utils/uploadToCloudinary'

const EditProfileForm = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const defaultProfileUrl =
    'https://res.cloudinary.com/dfqxbwfnc/image/upload/v1744917478/307ce493-b254-4b2d-8ba4-d12c080d6651_nwu9zy.jpg'

  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [profileImage])

  const formik = useFormik({
    initialValues: {
      email: '',
      nickname: '',
      phone_number: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalide'),
      nickname: Yup.string(),
      phone_number: Yup.string().matches(
        /^(\+?\d{1,3}[- ]?)?\d{6,14}$/,
        'Numéro de téléphone invalide'
      ),
    }),
    onSubmit: async (values) => {
      try {
        let imageUrl = defaultProfileUrl

        if (profileImage) {
          imageUrl = await uploadToCloudinary(profileImage)
        }

        const payload = {
          ...values,
          profile_picture: imageUrl,
        }

        // TODO: Envoyer `payload` à ton backend pour mettre à jour le profil
        console.log('✅ Données envoyées :', payload)
      } catch (error) {
        console.error('❌ Erreur lors de la mise à jour du profil:', error)
      }
    },
  })

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-xl">Modifier mon profil</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={previewUrl || defaultProfileUrl}
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
            <Button type="submit" className="w-full md:w-auto">
              💾 Enregistrer
            </Button>

            <Button
              type="button"
              variant="default"
              className="w-full md:w-auto"
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
