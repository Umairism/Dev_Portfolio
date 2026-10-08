'use client'
import { useState, useEffect } from 'react'
import { Code2, Globe, Server, Zap, Hammer, Bug, ArrowUpRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
 { title: 'Full-stack systems', text: 'Thoughtful interfaces connected to resilient APIs, data, auth, and deployment.', icon: Code2, tags: 'React · Next.js · TypeScript', details: 'From front-end interactions to complex database structures, I build complete systems that are scalable, secure, and tailored exactly to your business needs.' },
 { title: 'Digital experiences', text: 'Distinctive websites and product surfaces that make a strong first impression.', icon: Globe, tags: 'Design · Motion · Accessibility', details: 'I craft immersive digital experiences with highly interactive elements, premium UI structures, and engaging animations to help you captivate your clients.' },
 { title: 'Backend architecture', text: 'Reliable services and integrations designed for clarity, speed, and scale.', icon: Server, tags: 'APIs · PostgreSQL · Docker', details: 'Robust backend development focusing on performance optimization, microservices, cloud deployments, and seamless API integrations.' },
 { title: 'AI-powered products', text: 'Useful AI features woven into real workflows, not bolted on as a gimmick.', icon: Zap, tags: 'LLMs · Search · Automation', details: 'I integrate cutting-edge AI technologies, leveraging LLMs to automate tasks, improve search, and create intelligent agents that solve real problems.' },
 { title: 'Custom software', text: 'Focused tools built around the way your team actually works.', icon: Hammer, tags: 'Architecture · Systems · UX', details: 'Need something unique? I build custom dashboards, SaaS platforms, and internal tools focused intensely on the end-user experience.' },
 { title: 'Technical rescue', text: 'Debugging, optimization, and practical improvements for projects in motion.', icon: Bug, tags: 'Performance · DevOps · Support', details: 'I step into messy codebases to identify bottlenecks, fix critical bugs, and refactor legacy code to get your project moving forward smoothly.' },
]

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null)

  useEffect(() => {
    if (activeService !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [activeService])

  return (
    <section id="services" className="section-wrap relative">
      <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5">01 / Capabilities</p>
          <h2 className="section-title">Things I <em>build</em> well.</h2>
        </div>
        <p className="max-w-sm text-base leading-7 text-[#9a958c]">From a sharp first screen to the systems behind it, I build software that earns its place in the world.</p>
      </div>
      
      <div className="grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.button 
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              key={service.title} 
              onClick={() => setActiveService(i)} 
              className="group relative min-h-64 p-7 text-left transition-colors bg-[#11110f] hover:bg-[#191714]"
            >
              <div className="mb-14 flex items-start justify-between">
                <Icon className="text-[#aaa49a] transition-colors group-hover:text-[var(--accent)]" />
                <span className="font-mono text-xs text-[#5f5a53]">0{i+1}</span>
              </div>
              <h3 className="mb-3 text-xl font-bold tracking-tight">{service.title}</h3>
              <p className="mb-5 text-sm leading-6 text-[#9a958c]">{service.text}</p>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">{service.tags}</span>
              
              <div className="absolute right-7 bottom-7 opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowUpRight className="text-[var(--accent)]" />
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {activeService !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0e0e0c] p-8 shadow-2xl">
                <button 
                  onClick={() => setActiveService(null)}
                  className="absolute right-5 top-5 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                  {(() => {
                    const ActiveIcon = services[activeService].icon
                    return <ActiveIcon className="h-8 w-8 text-[var(--accent)]" />
                  })()}
                </div>
                
                <h3 className="mb-2 text-3xl font-bold text-white">
                  {services[activeService].title}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-6">
                  {services[activeService].tags}
                </p>
                <p className="text-base leading-7 text-[#9a958c]">
                  {services[activeService].details}
                </p>
                
                <div className="mt-8 pt-6 border-t border-[var(--line)]">
                  <a 
                    href="#contact" 
                    onClick={() => setActiveService(null)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-black transition-transform hover:scale-105"
                  >
                    Start a project in this area <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
