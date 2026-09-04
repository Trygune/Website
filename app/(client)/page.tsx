import About from '@/components/sections/About'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  description:
    'Farbod is a Front-End Developer focused on React, Next.js, and TypeScript, with experience building full-stack web applications using Node.js, Express, and MongoDB.',
  path: '/',
})

const App = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  )
}

export default App
