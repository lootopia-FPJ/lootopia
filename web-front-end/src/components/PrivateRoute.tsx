import { JSX } from 'react/jsx-runtime'
import { useUser } from '../hooks/UserContext'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser()

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl font-semibold">⛔ Unauthorized</div>
    )
  }

  return children
}

export default PrivateRoute
