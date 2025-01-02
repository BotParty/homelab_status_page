import Image from 'next/image'

interface ImageGalleryProps {
  images: string[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <div key={index} className="relative aspect-square">
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )
} 