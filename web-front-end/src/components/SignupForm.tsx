/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logo from '../assets/logo-lootopia.png'
import ImageComponent from '../components/ui/ImageComponent'
import TextComponent from '../components/ui/TextComponent'
import axios from 'axios'
import '../styles/signupForm.css'

const SignupForm = () => {
  const [submitted, setSubmitted] = useState(false)

  const formik = useFormik({
    initialValues: {
      pseudo: '',
      email: '',
      password: '',
      privacyPolicy: false,
    },
    validationSchema: Yup.object({
      pseudo: Yup.string().required('Le pseudo est requis'),
      email: Yup.string().email('Email invalide').required("L'email est requis"),
      password: Yup.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .matches(/[A-Z]/, 'Doit inclure une lettre majuscule')
        .matches(/[a-z]/, 'Doit inclure une lettre minuscule')
        .matches(/\d/, 'Doit inclure un chiffre')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Doit inclure un caractère spécial')
        .required('Le mot de passe est requis'),
      privacyPolicy: Yup.boolean().oneOf(
        [true],
        'Vous devez accepter la politique de confidentialité'
      ),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
          name: values.pseudo,
          type: 'COMMUN',
        }

        const response = await axios.post('http://localhost:3000/auth/register', payload)

        if (response.status === 201 || response.status === 200) {
          setSubmitted(true)
          toast.success('Inscription réussie ! 🎉 Vérifie tes emails pour activer ton compte.', {
            position: 'top-right',
          })
        }
      } catch (error) {
        if ((error as any).response && (error as any).response.status === 400) {
          toast.error((error as any).response.data.message || 'Erreur côté serveur.', {
            position: 'top-right',
          })
        } else {
          toast.error('Erreur lors de l’inscription, réessaye plus tard.', {
            position: 'top-right',
          })
        }
      }
    },
  })

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center bg-gray-100 px-4 md:px-16">
        <ToastContainer />
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg">Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="pseudo">Pseudo</Label>
                  <Input
                    id="pseudo"
                    name="pseudo"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pseudo}
                    className={`w-full ${formik.touched.pseudo && formik.errors.pseudo ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.pseudo && formik.errors.pseudo && (
                    <div className="text-red-500 text-sm">{formik.errors.pseudo}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={`w-full ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                  )}
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="privacyPolicy"
                    name="privacyPolicy"
                    checked={formik.values.privacyPolicy}
                    onCheckedChange={(checked) => formik.setFieldValue('privacyPolicy', checked)}
                    onBlur={formik.handleBlur}
                  />
                  <Label htmlFor="privacyPolicy" className="ml-2">
                    J'accepte la politique de confidentialité
                  </Label>
                </div>
                {formik.touched.privacyPolicy && formik.errors.privacyPolicy && (
                  <div className="text-red-500 text-sm">{formik.errors.privacyPolicy}</div>
                )}
                <Button type="submit" className="w-full signup-btn">
                  S'inscrire
                </Button>
              </form>
            ) : (
              <TextComponent className="text-center">
                Inscription réussie ! Un email t'a été envoyé, vérifie ta boite mail pour activer
                ton compte.
              </TextComponent>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex w-full lg:w-1/2 h-full items-center justify-center bg-white">
        <ImageComponent src={logo} alt="Logo Lootopia" className="img-logo" />
      </div>
    </div>
  )
}

export default SignupForm
