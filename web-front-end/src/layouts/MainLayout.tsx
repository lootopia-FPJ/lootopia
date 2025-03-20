import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen flex flex-col justify-between">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
