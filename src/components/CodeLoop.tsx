import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const codeSnippets = [
  {
    language: 'React',
    code: `const TechArena = () => {
  return (
    <Innovation>
      <Solutions />
      <Excellence />
    </Innovation>
  );
};`,
    color: 'from-blue-400 to-cyan-400',
  },
  {
    language: 'TypeScript',
    code: `interface Project {
  name: string;
  success: boolean;
  client: 'Happy';
}

const build = async (): Promise<Project> => {
  return { name: 'Your Project', 
           success: true, 
           client: 'Happy' };
};`,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    language: 'Node.js',
    code: `app.post('/api/project', async (req, res) => {
  const project = await createProject({
    ...req.body,
    status: 'success'
  });
  res.json({ success: true, project });
});`,
    color: 'from-green-400 to-emerald-400',
  },
  {
    language: 'React Native',
    code: `const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Success" 
          component={YourApp} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};`,
    color: 'from-purple-400 to-pink-400',
  },
]

const CodeLoop = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    // Reduce animation speed on mobile for better performance
    const isMobile = window.innerWidth < 768
    const typeSpeed = isMobile ? 80 : 50
    const deleteSpeed = isMobile ? 40 : 30
    
    const currentSnippet = codeSnippets[currentIndex]
    const fullCode = currentSnippet.code

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < fullCode.length) {
        // Typing
        setDisplayedCode(fullCode.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setDisplayedCode(fullCode.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === fullCode.length) {
        // Finished typing, wait then start deleting
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next snippet
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % codeSnippets.length)
      }
    }, isDeleting ? deleteSpeed : typeSpeed) // Use dynamic speeds

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentIndex])

  const currentSnippet = codeSnippets[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentSnippet.color} opacity-20 blur-3xl rounded-2xl animate-pulse`} />
      
      {/* Code Container */}
      <div className="relative bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 dark:border-gray-600/50 shadow-2xl ring-1 ring-white/10 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-mono">{currentSnippet.language}</span>
            <motion.div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentSnippet.color}`}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Code Display */}
        <div className="relative">
            <pre className="text-sm md:text-base font-mono text-gray-100 dark:text-gray-200 overflow-x-auto">
            <code>
              {displayedCode.split('\n').map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start"
                >
                  <span className="text-gray-500 dark:text-gray-400 mr-4 select-none w-6 text-right">
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    {line || '\u00A0'}
                    {index === displayedCode.split('\n').length - 1 && (
                      <motion.span
                        className={`inline-block w-2 h-5 ml-1 bg-gradient-to-r ${currentSnippet.color}`}
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </span>
                </motion.div>
              ))}
            </code>
          </pre>
        </div>

        {/* Bottom Glow Accent */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${currentSnippet.color} rounded-b-2xl`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Floating Code Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-gradient-to-r ${currentSnippet.color} rounded-full`}
          initial={{
            x: Math.random() * 400 - 200,
            y: Math.random() * 300 - 150,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * 200 - 100],
            x: [null, Math.random() * 200 - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  )
}

export default CodeLoop

