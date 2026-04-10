// src/components/ui/ReloadPrompt.tsx

import { useRegisterSW } from 'virtual:pwa-register/react'
import { AnimatePresence, m } from 'framer-motion'
import { RefreshCw, X } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function ReloadPrompt() {
  const { i18n } = useTranslation()
  const isPT = i18n.language.startsWith('pt')

  // Hook provided by vite-plugin-pwa
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered')
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setNeedRefresh(false)
  }

  return (
    <AnimatePresence>
      {needRefresh && (
        <m.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[200] p-5 bg-white dark:bg-slate-900 text-brand-navy dark:text-white rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 max-w-sm w-[calc(100%-3rem)] md:w-auto"
        >
          <div className="flex items-start justify-between gap-6 mb-4">
            <div>
              <h3 className="font-black text-lg mb-1">
                {isPT ? 'Nova Atualização!' : 'Update Available!'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {isPT
                  ? 'Há uma nova versão da app disponível. Atualize para ver os conteúdos mais recentes.'
                  : 'A new version of the app is available. Update to see the latest content.'}
              </p>
            </div>
            <button
              onClick={close}
              className="text-slate-400 hover:text-brand-red transition-colors p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <button
            onClick={() => updateServiceWorker(true)}
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-red/30 active:scale-[0.98]"
          >
            <RefreshCw size={16} />
            {isPT ? 'Atualizar Agora' : 'Update Now'}
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}
