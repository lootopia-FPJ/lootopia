import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-20 w-screen bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
