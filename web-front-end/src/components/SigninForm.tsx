/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import coffre from '../assets/coffre2.png'
import ImageComponent from '../components/ui/ImageComponent'
import axios from 'axios'
import '../styles/signupForm.css'

const SigninForm = () => {
  const LOGIN_URL = import.meta.env.VITE_LOGIN_URL

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email invalide').required("L'email est requis"),
      password: Yup.string().required('Le mot de passe est requis'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          LOGIN_URL,
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        )
        if (response && response.data?.message === 'Login successful') {
          toast.success('Connexion réussie 🎉', {
            position: 'top-right',
          })
        }
      } catch (error) {
        toast.error((error as any)?.response?.data?.message || 'Erreur lors de la connexion', {
          position: 'top-right',
        })
      }
    },
  })

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full h-full flex items-center justify-center bg-gray-100 px-4 md:px-16">
        <ToastContainer />
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-lg">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
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

              <Button type="submit" className="w-full signup-btn">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex w-full lg:w-1/2 h-full items-center justify-center bg-white">
        <ImageComponent src={coffre} alt="Logo Lootopia" className="img-logo" />
      </div>
    </div>
  )
}

export default SigninForm
