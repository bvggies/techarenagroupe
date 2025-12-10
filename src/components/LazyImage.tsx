import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react'

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholder?: string
}

const LazyImage = ({ src, alt, placeholder, ...props }: LazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    if (imgRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src)
              observer?.unobserve(entry.target)
            }
          })
        },
        { rootMargin: '50px' }
      )
      observer.observe(imgRef.current)
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src)
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${props.className || ''}`}
      loading="lazy"
      {...props}
    />
  )
}

export default LazyImage

