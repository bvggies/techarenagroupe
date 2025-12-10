import { motion } from 'framer-motion'

interface MobileMockupProps {
  image: string
  alt: string
  className?: string
}

const MobileMockup = ({ image, alt, className = '' }: MobileMockupProps) => {
  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Phone Frame */}
      <div className="relative w-64 h-[500px] mx-auto">
        {/* Phone Outline */}
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />
            {/* Screen Content */}
            <div className="w-full h-full pt-6">
              <img
                src={image}
                alt={alt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MobileMockup

