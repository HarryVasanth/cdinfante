import { MapPin, Phone, CheckCircle2, Loader2 } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Contact = () => {
  const { t } = useTranslation()

  // Form state management
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    // Web3Forms access key
    formData.append('access_key', '47ea1e71-2203-4ffd-ab35-7aaf12aac693')
    formData.append('subject', 'New Submission from CDInfante Website')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        // Optional: Reset form fields here
        ;(e.target as HTMLFormElement).reset()

        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        console.error('Web3Forms Error:', data)
        setStatus('error')
      }
    } catch (error) {
      console.error('Fetch Error:', error)
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-4 sm:px-6 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-navy dark:bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-6 sm:p-10 lg:p-24 overflow-hidden relative shadow-3xl border border-white/[0.08] transition-colors duration-700">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-brand-red/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-navy/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-10 tracking-tight">
                {t('contact.title')}
              </h2>

              <div className="space-y-8 md:space-y-10 mb-12 md:mb-16">
                <a
                  href="https://maps.app.goo.gl/vMhHkfHUCZUC1eiJA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-6 md:gap-8 items-start group outline-none"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-white/10 group-focus-visible:ring-2 group-focus-visible:ring-brand-red">
                    <MapPin size={24} className="md:w-7 md:h-7" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] md:text-xs font-bold mb-1 md:mb-2 uppercase tracking-[0.2em]">
                      {t('contact.address_label')}
                    </div>
                    <div className="text-white text-lg md:text-xl font-bold leading-relaxed whitespace-pre-line group-hover:text-brand-red transition-colors">
                      {t('contact.address')}
                    </div>
                  </div>
                </a>

                {/* OPTIMIZATION: Converted to semantic <a> tag for tap-to-call */}
                <a
                  href={`tel:${t('contact.phone_value')?.replace(/\s/g, '')}`}
                  className="flex gap-6 md:gap-8 items-start group outline-none"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-white/10 group-focus-visible:ring-2 group-focus-visible:ring-brand-red">
                    <Phone size={24} className="md:w-7 md:h-7" />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] md:text-xs font-bold mb-1 md:mb-2 uppercase tracking-[0.2em]">
                      {t('contact.phone_label')}
                    </div>
                    <div className="text-white text-lg md:text-xl font-bold group-hover:text-brand-red transition-colors">
                      {t('contact.phone_value')}
                    </div>
                  </div>
                </a>
              </div>

              <div className="p-1.5 bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-inner group overflow-hidden pointer-events-none">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.4057142371284!2d-16.9032822!3d32.675255299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6061ab187bf7d1%3A0xc3243053e116fb0b!2sClube%20Desportivo%20Infante%20Dom%20Henrique!5e0!3m2!1sen!2spt!4v1775838181501!5m2!1sen!2spt"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '1.25rem' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CDInfante Location Map"
                  className="dark:invert dark:grayscale dark:contrast-125 dark:brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 pointer-events-auto"
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 lg:p-14 border border-white/[0.08] shadow-2xl ring-1 ring-white/10 h-full flex flex-col justify-center">
              {status === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-300">
                    We will get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 md:space-y-8 relative"
                >
                  {/* Honeypot for spam protection */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label
                        htmlFor="name"
                        className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
                      >
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300 disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <label
                        htmlFor="email"
                        className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
                      >
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        disabled={status === 'submitting'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300 disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    <label
                      htmlFor="message"
                      className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1"
                    >
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      required
                      disabled={status === 'submitting'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-5 py-3 md:px-6 md:py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300 disabled:opacity-50"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-sm font-medium text-center">
                      Something went wrong. Please try again later.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 md:py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all shadow-xl shadow-brand-red/30 active:scale-[0.98] uppercase tracking-widest cursor-pointer focus-visible:ring-4 focus-visible:ring-brand-red/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />{' '}
                        Sending...
                      </>
                    ) : (
                      t('contact.form.send')
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
