'use client'

import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let frame = 0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)
      const glow = ctx.createRadialGradient(width * 0.82, height * 0.45, 0, width * 0.82, height * 0.45, width * 0.5)
      glow.addColorStop(0, 'rgba(255, 105, 35, 0.13)')
      glow.addColorStop(1, 'rgba(255, 105, 35, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)'
      ctx.lineWidth = 1
      const spacing = 64
      const offset = (frame * 0.08) % spacing
      for (let x = -spacing + offset; x < width + spacing; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
      }
      for (let y = -spacing + offset; y < height + spacing; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
      }
      frame += 1
      requestAnimationFrame(animate)
    }
    const animation = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(animation); window.removeEventListener('resize', resize) }
  }, [])

  const scrollToSection = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero-shell relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 sm:mb-14">
          <span className="status-dot" /> Available for projects <span className="hidden sm:inline">· Islamabad, PK</span>
        </div>
        <div className="grid items-end gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="hero-title max-w-5xl text-balance text-[clamp(3.4rem,9vw,8.5rem)] font-black leading-[0.84] tracking-[-0.075em] text-[#f2eee8]">
              I Build Digital<br />
              <span className="text-white/20">Experiences</span> <span className="text-outline">That</span><br />
              <span className="text-orange-500 italic">Actually</span> Work<span className="text-orange-500">.</span>
            </h1>
            <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base">Full-stack developer focused on modern web applications, AI-powered solutions, backend systems, and polished digital experiences.</p>
              <div className="flex shrink-0 gap-3">
                <button onClick={() => scrollToSection('projects')} className="magnetic-button rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105">View My Work <ArrowDownRight className="ml-2 inline" data-icon="inline-end" /></button>
                <button onClick={() => scrollToSection('contact')} className="rounded-full border border-white/15 px-6 py-3 text-sm text-white/75 transition hover:border-orange-500 hover:text-white">Let&apos;s Talk <ArrowUpRight className="ml-2 inline" data-icon="inline-end" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35"><span>Full-stack development</span><span>AI integration</span><span>Backend systems</span><span>Technical solutions</span></div>
      </div>
    </section>
  )
}
