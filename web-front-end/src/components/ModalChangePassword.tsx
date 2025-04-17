/* eslint-disable max-lines-per-function */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useFormik } from 'formik'
import * as Yup from 'yup'

interface ModalChangePasswordProps {
  open: boolean
  onClose: () => void
}

const ModalChangePassword = ({ open, onClose }: ModalChangePasswordProps) => {
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, 'Minimum 8 caractères')
        .matches(/[A-Z]/, '1 majuscule requise')
        .matches(/[a-z]/, '1 minuscule requise')
        .matches(/[0-9]/, '1 chiffre requis')
        .matches(/[@$!%*?&]/, '1 caractère spécial requis')
        .required('Mot de passe requis'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Les mots de passe ne correspondent pas')
        .required('Confirmation requise'),
    }),
    onSubmit: (values) => {
      console.log('🔐 Nouveau mot de passe =>', values.newPassword)
      onClose()
    },
  })

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Changer le mot de passe</DialogTitle>
          <DialogDescription>Entre un mot de passe sécurisé 🔐</DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-sm text-red-600">{formik.errors.newPassword}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-sm text-red-600">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            ✅ Confirmer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChangePassword
