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
        // eslint-disable-next-line no-console
        console.log('Form submitted', values)
        setSubmitted(true)
        toast.success('Inscription réussie !', { position: 'top-right' })
      } catch (error) {
        toast.error('Une erreur est survenue, veuillez réessayer', { position: 'top-right' })
      }
    },
  })

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Section grise avec le formulaire */}
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center bg-gray-100 px-4 md:px-16">
        <ToastContainer />
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg">Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Pseudo */}
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

                {/* Email */}
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

                {/* Mot de passe */}
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

                {/* Privacy Policy */}
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
              <p className="text-green-500 text-center">Inscription réussie !</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Section blanche avec le logo bien centré et caché sur mobile */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-full items-center justify-center bg-white">
        <img src={logo} alt="Logo Lootopia" className="object-contain img-logo" />
      </div>
    </div>
  )
}

export default SignupForm
