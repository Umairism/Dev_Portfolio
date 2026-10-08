'use client'
import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "a5587fb3-22b7-48ae-b12c-9da49a940e57");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error("Error", data);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="border-t border-[var(--line)] bg-[#0e0e0c]">
      <div className="section-wrap">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow mb-5">06 / Contact</p>
            <h2 className="section-title">Let&apos;s make<br/><em>something real.</em></h2>
            <p className="mt-8 max-w-sm leading-7 text-[#9a958c]">Tell me what you are trying to solve. I will bring questions, structure, and a clear next step.</p>
            
            <div className="mt-12 flex flex-col gap-3 font-mono text-xs">
              <a className="orange-link" href="mailto:malikumairhakim@outlook.com">malikumairhakim@outlook.com ↗</a>
              <a className="orange-link" href="https://github.com/umairism" target="_blank" rel="noreferrer">github.com/umairism ↗</a>
              <a className="orange-link" href="https://linkedin.com/in/umairsim" target="_blank" rel="noreferrer">linkedin.com/in/umairsim ↗</a>
              <a className="orange-link" href="https://twitter.com/umairism" target="_blank" rel="noreferrer">twitter.com/umairism ↗</a>
            </div>
          </div>
          
          <form onSubmit={onSubmit} className="glass-card flex flex-col gap-6 p-6 sm:p-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-[#777168]">
                Name
                <input required name="name" className="border-b border-[var(--line)] bg-transparent py-3 text-base normal-case tracking-normal text-white outline-none transition-colors focus:border-[var(--accent)]" placeholder="Your name"/>
              </label>
              
              <label className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-[#777168]">
                Email
                <input required type="email" name="email" className="border-b border-[var(--line)] bg-transparent py-3 text-base normal-case tracking-normal text-white outline-none focus:border-[var(--accent)]" placeholder="you@example.com"/>
              </label>
            </div>
            
            <label className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-[#777168]">
              Project type
              <select name="project_type" className="border-b border-[var(--line)] bg-transparent py-3 text-base normal-case tracking-normal text-white outline-none focus:border-[var(--accent)]">
                <option className="bg-[#11110f]">Website</option>
                <option className="bg-[#11110f]">Web application</option>
                <option className="bg-[#11110f]">AI integration</option>
                <option className="bg-[#11110f]">Something else</option>
              </select>
            </label>
            
            <label className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest text-[#777168]">
              Message
              <textarea required name="message" rows={4} className="resize-none border-b border-[var(--line)] bg-transparent py-3 text-base normal-case tracking-normal text-white outline-none focus:border-[var(--accent)]" placeholder="What are we building?"/>
            </label>
            
            <input type="hidden" name="subject" value="New Submission from CernDev Portfolio" />

            <button 
              disabled={status === 'loading'}
              className="self-start rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-bold text-[#17120f] transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" 
              type="submit"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message received ✓' : status === 'error' ? 'Error sending ✕' : 'Send inquiry ↗'}
            </button>
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-2">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
