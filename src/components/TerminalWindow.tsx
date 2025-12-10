import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiTerminal, FiCopy, FiCheck } from 'react-icons/fi'

const commands = [
  { text: 'npm install techarena-groupe', type: 'command' },
  { text: 'Installing packages...', type: 'info' },
  { text: '✓ React 18.2.0', type: 'success' },
  { text: '✓ TypeScript 5.2.2', type: 'success' },
  { text: '✓ Node.js 20.x', type: 'success' },
  { text: 'Building your project...', type: 'info' },
  { text: '✓ Build successful!', type: 'success' },
  { text: '🚀 Ready to deploy!', type: 'success' },
]

const TerminalWindow = () => {
  const [displayedCommands, setDisplayedCommands] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (currentIndex < commands.length) {
      const timer = setTimeout(() => {
        setDisplayedCommands((prev) => [...prev, commands[currentIndex].text])
        setCurrentIndex((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [currentIndex])

  const handleCopy = () => {
    const text = displayedCommands.join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <FiTerminal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300 font-mono">terminal</span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
            aria-label="Copy terminal output"
          >
            {copied ? (
              <FiCheck className="w-4 h-4 text-green-400" />
            ) : (
              <FiCopy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm bg-gray-900 min-h-[200px]">
          <div className="text-gray-500 mb-2">$ techarena-groupe --init</div>
          <AnimatePresence>
            {displayedCommands.map((cmd, index) => {
              const command = commands.find((c) => c.text === cmd)
              const type = command?.type || 'info'
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mb-1 ${
                    type === 'command' ? 'text-blue-400' :
                    type === 'success' ? 'text-green-400' :
                    type === 'info' ? 'text-yellow-400' :
                    'text-gray-300'
                  }`}
                >
                  {type === 'command' && <span className="text-gray-500">$ </span>}
                  {cmd}
                </motion.div>
              )
            })}
          </AnimatePresence>
          {currentIndex < commands.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-primary-400 ml-1"
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TerminalWindow

