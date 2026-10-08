

import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Services from '@/components/services'
import Expertise from '@/components/expertise'
import Projects from '@/components/projects'
import About from '@/components/about'
import WhyWorkWithMe from '@/components/why-work-with-me'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export const revalidate = 86400;
export default function Home() {
  return (
    <div className="site-shell min-h-screen text-white">
      <Navigation />
      <Hero />
      <Services />
      <Expertise />
      <Projects />
      <About />
      <WhyWorkWithMe />
      <Contact />
      <Footer />
    </div>
  )
}
