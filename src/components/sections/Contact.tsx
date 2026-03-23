import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone } from 'lucide-react';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-navy dark:bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] p-10 md:p-24 overflow-hidden relative shadow-3xl border border-white/10 transition-colors duration-700">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-brand-red/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-navy/20 blur-[120px] rounded-full" />

          <div className="grid lg:grid-cols-2 gap-24 relative z-10">
            <div>
              <h2 className="text-6xl font-black text-white mb-10 tracking-tight">
                {t('contact.title')}
              </h2>

              <div className="space-y-10 mb-16">
                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-white/10">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-[0.2em]">
                      {t('contact.address_label')}
                    </div>
                    <div className="text-white text-xl font-bold leading-relaxed whitespace-pre-line">
                      {t('contact.address')}
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 items-start group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-red shrink-0 group-hover:scale-110 group-hover:bg-brand-red group-hover:text-white transition-all duration-500 border border-white/10">
                    <Phone size={28} />
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-[0.2em]">
                      {t('contact.phone_label')}
                    </div>
                    <div className="text-white text-xl font-bold">
                      {t('contact.phone_value')}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-1.5 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm shadow-inner group overflow-hidden cursor-pointer"
                onClick={() =>
                  window.open(
                    'https://maps.app.goo.gl/3cU7eBi1goi7NWax7',
                    '_blank',
                  )
                }
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.4057142371284!2d-16.9032822!3d32.675255299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6061ab187bf7d1%3A0xc3243053e116fb0b!2sClube%20Desportivo%20Infante%20Dom%20Henrique!5e0!3m2!1sen!2spt!4v1774133527004!5m2!1sen!2spt"
                  width="100%"
                  height="300"
                  style={{
                    border: 0,
                    borderRadius: '2rem',
                    pointerEvents: 'none',
                  }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Maps"
                  className="dark:invert dark:grayscale dark:contrast-125 dark:brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-2xl ring-1 ring-white/10">
              <form
                className="space-y-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-brand-red hover:bg-brand-red/90 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-red/30 active:scale-[0.98] uppercase tracking-widest cursor-pointer focus-visible:ring-4 focus-visible:ring-brand-red/40"
                >
                  {t('contact.form.send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
