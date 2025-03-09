interface ImageProps {
  src: string
  alt: string
  className?: string
}

export default function ImageComponent({ src, alt, className }: ImageProps) {
  return <img src={src} alt={alt} className={`object-contain ${className}`} />
}
