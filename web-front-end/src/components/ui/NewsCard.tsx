import { Card, CardHeader, CardContent } from './card'
import Img from './ImageComponent'
import TextComponent from './TextComponent'

interface NewsCardProps {
  title: string
  date: string
  image: string
}

export default function NewsCard({ title, date, image }: NewsCardProps) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <Img src={image} alt={title} className="w-full h-48 object-contain mx-auto" />
      </CardHeader>
      <CardContent className="p-4 bg-white">
        <TextComponent className="text-sm text-gray-500">{date}</TextComponent>
        <TextComponent className="text-lg font-semibold text-black mt-2">{title}</TextComponent>
      </CardContent>
    </Card>
  )
}
