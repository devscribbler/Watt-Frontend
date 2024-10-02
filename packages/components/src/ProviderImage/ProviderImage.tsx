interface ProviderImageProps {
  imageName: string
  className: string
  alt?: string
}

export const ProviderImage = ({ imageName, className, alt }: ProviderImageProps) => {
  if (!imageName) {
    return null
  }

  return <img src={`/assets/img/providers/${imageName}`} alt={alt ?? imageName} className={className} />
}

export default ProviderImage
