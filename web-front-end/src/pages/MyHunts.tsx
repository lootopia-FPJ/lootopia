import MyHuntsTable from '../components/MyHuntsTable'
import TextComponent from '../components/ui/TextComponent'

const MyHunts = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10 px-4">
      <TextComponent
        as="h1"
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        🎯 Gestion de mes Chasses
      </TextComponent>

      <div className="w-full max-w-6xl">
        <MyHuntsTable />
      </div>
    </div>
  )
}

export default MyHunts
