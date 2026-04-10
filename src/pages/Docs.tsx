import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bell,
  Box,
  Calendar,
  Check,
  ChevronDown,
  ExternalLink,
  Flag as FlagIcon,
  Info,
  Layout,
  LineChart,
  List,
  Loader2,
  Mail,
  Maximize2,
  Menu,
  MoreHorizontal,
  MousePointer,
  Palette,
  Radar,
  Search,
  Send,
  Settings,
  Type,
  User,
  Zap,
} from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

export default function Docs() {
  const { t } = useTranslation()

  // Interactive States
  const [isExpanded, setIsExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(true)
  const [switchOn, setSwitchOn] = useState(true)
  const [selectedRadio, setSelectedRadio] = useState('active')
  const [sliderValue, setSliderValue] = useState(66)
  const [activeToggle, setActiveToggle] = useState('right')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedId, setGeneratedId] = useState('AUTO-GENERATED-ID-123')

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedId(
        `ID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      )
      setIsGenerating(false)
    }, 800)
  }

  const sections = [
    { id: 'typography', label: t('docs.typography.title'), icon: Type },
    { id: 'theming', label: t('docs.theming.title'), icon: Palette },
    { id: 'components', label: t('docs.components.title'), icon: Box },
    {
      id: 'containers',
      label: t('docs.components.containers.title'),
      icon: Layout,
    },
    { id: 'graphs', label: t('docs.components.graphs.title'), icon: BarChart3 },
    { id: 'writing-posts', label: t('docs.writing_posts.title'), icon: List },
  ]

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">
                {t('docs.title')}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('docs.guidelines')}
              </p>
            </div>

            <nav className="space-y-1">
              {sections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  <section.icon size={18} />
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 space-y-24">
          {/* Typography */}
          <section id="typography" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              {t('docs.typography.title')}
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.typography.typefaces')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <p className="text-4xl font-plus-jakarta mb-4 text-brand-navy dark:text-white">
                      Plus Jakarta Sans
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      Primary Brand Font. Used for headings, body text, and UI
                      elements.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <p className="text-4xl font-sans mb-4 text-brand-navy dark:text-white">
                      Inter
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      System fallback font. Clean, modern, and highly legible.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.typography.font_sizes')}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'text-xs', size: '12px' },
                    { label: 'text-sm', size: '14px' },
                    { label: 'text-base', size: '16px' },
                    { label: 'text-lg', size: '18px' },
                    { label: 'text-xl', size: '20px' },
                    { label: 'text-2xl', size: '24px' },
                    { label: 'text-3xl', size: '30px' },
                    { label: 'text-4xl', size: '36px' },
                  ].map(item => (
                    <div
                      key={item.label}
                      className="flex items-baseline gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5"
                    >
                      <span className="w-20 text-xs font-mono text-slate-400">
                        {item.label}
                      </span>
                      <span className="w-16 text-xs text-slate-400">
                        {item.size}
                      </span>
                      <span
                        className={cn(
                          item.label,
                          'text-brand-navy dark:text-white truncate',
                        )}
                      >
                        The quick brown fox jumps over the lazy dog
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.typography.font_weights')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { weight: 'font-normal', value: '400' },
                    { weight: 'font-medium', value: '500' },
                    { weight: 'font-semibold', value: '600' },
                    { weight: 'font-bold', value: '700' },
                  ].map(item => (
                    <div
                      key={item.weight}
                      className="p-4 rounded-xl border border-slate-200 dark:border-white/10 text-center"
                    >
                      <p
                        className={cn(
                          item.weight,
                          'text-2xl text-brand-navy dark:text-white mb-1',
                        )}
                      >
                        Aa
                      </p>
                      <p className="text-xs font-mono text-slate-400">
                        {item.weight}
                      </p>
                      <p className="text-xs text-slate-400">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Theming */}
          <section id="theming" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              {t('docs.theming.title')}
            </h2>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.theming.colors')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ColorSwatch
                    color="#001e40"
                    name="Brand Navy"
                    variable="--color-brand-navy"
                  />
                  <ColorSwatch
                    color="#b6171e"
                    name="Brand Red"
                    variable="--color-brand-red"
                  />
                  <ColorSwatch
                    color="#fdfdfd"
                    name="Light Background"
                    variable="--background"
                    dark={false}
                  />
                  <ColorSwatch
                    color="#020202"
                    name="Dark Background"
                    variable="--background"
                    dark={true}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.theming.icons')}
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {[
                    Bell,
                    Settings,
                    User,
                    Calendar,
                    Send,
                    Mail,
                    Search,
                    Info,
                    FlagIcon,
                    MousePointer,
                    Box,
                    Layout,
                    Type,
                    Palette,
                    Check,
                    ArrowLeft,
                  ].map((Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square flex items-center justify-center rounded-xl bg-slate-50 dark:bg-white/5 text-brand-navy dark:text-white"
                    >
                      <Icon size={24} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.theming.spinner')}
                </h3>
                <div className="flex gap-8 items-center p-8 rounded-2xl bg-slate-50 dark:bg-white/5">
                  <Loader2
                    className="animate-spin text-brand-navy dark:text-white"
                    size={24}
                  />
                  <Loader2 className="animate-spin text-brand-red" size={32} />
                  <Loader2
                    className="animate-spin text-brand-navy dark:text-white"
                    size={48}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              {t('docs.components.title')}
            </h2>

            <div className="space-y-16">
              {/* Flags */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.flags')}
                </h3>
                <div className="flex gap-4 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="w-12 h-8 bg-brand-navy rounded shadow-sm flex items-center justify-center text-white text-[10px] font-bold">
                    CDI
                  </div>
                  <div className="w-12 h-8 bg-brand-red rounded shadow-sm flex items-center justify-center text-white text-[10px] font-bold">
                    PT
                  </div>
                  <div className="w-12 h-8 bg-slate-200 rounded shadow-sm flex items-center justify-center text-slate-400 text-[10px] font-bold">
                    UK
                  </div>
                </div>
              </div>

              {/* Text Standards */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.text_standards.title')}
                </h3>
                <div className="space-y-8 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div>
                    <p className="text-xs text-slate-400 mb-2">
                      {t('docs.components.text_standards.title_item')}
                    </p>
                    <h1 className="text-4xl font-bold text-brand-navy dark:text-white">
                      Main Page Title
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-2">
                      {t('docs.components.text_standards.modal_title')}
                    </p>
                    <h2 className="text-2xl font-semibold text-brand-navy dark:text-white">
                      Modal or Dialog Title
                    </h2>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-2">
                      {t('docs.components.text_standards.section')}
                    </p>
                    <h3 className="text-lg font-semibold uppercase tracking-wider text-brand-red">
                      Section Header
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-2">
                      {t('docs.components.text_standards.text')}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Standard body text for paragraphs and long-form content.
                      Ensuring optimal readability with appropriate line-height
                      and color contrast.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-2">
                      {t('docs.components.text_standards.label')}
                    </p>
                    <span className="text-sm font-medium text-slate-500">
                      Form Input Label
                    </span>
                  </div>
                </div>
              </div>

              {/* Indicators */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.indicators.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                      {t('docs.components.indicators.ribbon')}
                    </p>
                    <div className="relative overflow-hidden w-full h-32 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center">
                      <div className="absolute top-0 right-0">
                        <div className="bg-brand-red text-white text-[10px] font-bold px-8 py-1 rotate-45 translate-x-6 translate-y-2 uppercase">
                          New
                        </div>
                      </div>
                      <span className="text-slate-400">Content Area</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                      {t('docs.components.indicators.banner')}
                    </p>
                    <div className="bg-brand-navy text-white px-4 py-3 rounded-xl flex items-center gap-3">
                      <Bell size={18} />
                      <span className="text-sm font-medium">
                        Important club update regarding next competition.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.links.title')}
                </h3>
                <div className="flex gap-8 items-center p-8 rounded-2xl bg-slate-50 dark:bg-white/5">
                  <a
                    href="#"
                    className="text-brand-red hover:underline flex items-center gap-1"
                  >
                    {t('docs.components.links.link')} <ExternalLink size={14} />
                  </a>
                  <button className="flex items-center gap-2 text-slate-500 hover:text-brand-navy dark:hover:text-white transition-colors cursor-pointer">
                    <ArrowLeft size={18} />{' '}
                    {t('docs.components.links.back_link')}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.buttons.title')}
                </h3>
                <div className="flex flex-wrap gap-4 items-center p-8 rounded-2xl bg-slate-50 dark:bg-white/5">
                  <button className="px-6 py-2.5 bg-brand-red text-white rounded-full font-semibold hover:bg-red-700 transition-colors cursor-pointer">
                    {t('docs.components.buttons.button')}
                  </button>
                  <button className="px-6 py-2.5 bg-brand-navy text-white rounded-full font-semibold hover:bg-slate-800 transition-colors cursor-pointer">
                    Secondary
                  </button>
                  <button className="px-6 py-2.5 border-2 border-brand-navy dark:border-white text-brand-navy dark:text-white rounded-full font-semibold hover:bg-brand-navy hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer">
                    Outline
                  </button>
                  <button className="flex items-center gap-2 text-brand-red font-semibold hover:gap-3 transition-all cursor-pointer">
                    {t('docs.components.buttons.action')} <Send size={18} />
                  </button>
                </div>
              </div>

              {/* Navbar & Header Elements */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.navbar')} & UI Elements
                </h3>
                <div className="space-y-6 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                    <div className="flex items-center gap-8">
                      <div className="w-8 h-8 bg-brand-red rounded-lg" />
                      <nav className="hidden md:flex gap-4">
                        <span className="text-sm font-medium text-brand-red">
                          Active
                        </span>
                        <span className="text-sm font-medium text-slate-400">
                          Normal
                        </span>
                      </nav>
                    </div>
                    <div className="flex items-center gap-4">
                      <Search size={20} className="text-slate-400" />
                      <Menu size={20} className="text-slate-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder={t('docs.components.search_bar')}
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.form_inputs.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_inputs.text_input')}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter text..."
                      className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-red outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_inputs.text_area')}
                    </label>
                    <textarea
                      placeholder="Enter message..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-brand-red outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_inputs.generate_input')}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={generatedId}
                        className="flex-1 px-4 py-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/20 text-slate-500 font-mono text-sm outline-none"
                      />
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="p-2 bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Zap
                          size={20}
                          className={cn(isGenerating && 'animate-pulse')}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Controls */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.form_controls.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 rounded-2xl bg-slate-50 dark:bg-white/5">
                  <div className="space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_controls.checkbox')}
                    </label>
                    <div
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => setCheckboxChecked(!checkboxChecked)}
                    >
                      <div
                        className={cn(
                          'w-6 h-6 rounded border-2 flex items-center justify-center transition-all',
                          checkboxChecked
                            ? 'bg-brand-red border-brand-red text-white'
                            : 'border-slate-300 dark:border-white/20',
                        )}
                      >
                        {checkboxChecked && <Check size={16} />}
                      </div>
                      <span className="text-sm">
                        Option {checkboxChecked ? 'selected' : 'unselected'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_controls.switch')}
                    </label>
                    <div
                      className={cn(
                        'w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200',
                        switchOn
                          ? 'bg-brand-red'
                          : 'bg-slate-300 dark:bg-white/10',
                      )}
                      onClick={() => setSwitchOn(!switchOn)}
                    >
                      <div
                        className={cn(
                          'absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-sm',
                          switchOn ? 'right-1' : 'left-1',
                        )}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_controls.radio')}
                    </label>
                    <div className="flex flex-col gap-2">
                      {['active', 'inactive'].map(option => (
                        <div
                          key={option}
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => setSelectedRadio(option)}
                        >
                          <div
                            className={cn(
                              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                              selectedRadio === option
                                ? 'border-brand-red'
                                : 'border-slate-300 dark:border-white/20',
                            )}
                          >
                            {selectedRadio === option && (
                              <div className="w-3 h-3 rounded-full bg-brand-red" />
                            )}
                          </div>
                          <span className="text-sm capitalize">
                            Radio {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_controls.select')}
                    </label>
                    <div className="relative group">
                      <div className="w-full px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between cursor-pointer hover:border-brand-red transition-colors">
                        <span className="text-sm">Option One</span>
                        <ChevronDown size={18} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 lg:col-span-2">
                    <label className="text-sm font-medium">
                      {t('docs.components.form_controls.slider')} ({sliderValue}
                      %)
                    </label>
                    <div className="relative w-full h-6 flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={e =>
                          setSliderValue(Number.parseInt(e.target.value))
                        }
                        className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-red"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapse / Accordion */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.collapse.title')}
                </h3>
                <div className="space-y-4 p-8 rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                    <div
                      className="p-4 bg-slate-50 dark:bg-white/5 flex items-center justify-between cursor-pointer font-bold text-sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                      data-testid="collapse-header"
                    >
                      {t('docs.components.collapse.collapsible')} Header
                      <ChevronDown
                        size={18}
                        className={cn(
                          'transition-transform duration-200',
                          isExpanded && 'rotate-180',
                        )}
                      />
                    </div>
                    {isExpanded && (
                      <div
                        className="p-4 text-sm text-slate-500 animate-in fade-in slide-in-from-top-1 duration-200"
                        data-testid="collapse-content"
                      >
                        {t('docs.components.collapse.content')}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-4 py-2 text-xs font-bold bg-slate-100 dark:bg-white/5 rounded-lg flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer">
                      <List size={14} />{' '}
                      {t('docs.components.collapse.drop_down')}
                    </button>
                    <div className="px-3 py-1 bg-brand-red/10 text-brand-red rounded text-[10px] font-bold uppercase tracking-wider">
                      {t('docs.components.collapse.hideable')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div>
                <h3 className="text-xl font-semibold mb-6">
                  {t('docs.components.cards.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="w-full h-32 bg-slate-100 dark:bg-white/10 rounded-2xl mb-4" />
                    <h4 className="text-xl font-bold mb-2">
                      {t('docs.components.cards.card')}
                    </h4>
                    <p className="text-slate-500 text-sm mb-4">
                      A standard content card with elevation and rounded
                      corners.
                    </p>
                    <button className="text-brand-red font-semibold text-sm">
                      Read More
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {[1, 2].map(i => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                          <Activity size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">
                            {t('docs.components.cards.list_card')} #{i}
                          </p>
                          <p className="text-xs text-slate-500">
                            Secondary information text
                          </p>
                        </div>
                        <MoreHorizontal className="ml-auto text-slate-300" />
                      </div>
                    ))}
                    <div className="p-4 rounded-2xl bg-brand-navy text-white">
                      <h5 className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                        {t('docs.components.cards.events_panel')}
                      </h5>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-brand-red" />
                          <span className="text-sm font-medium">
                            Training Session - 18:00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Misc Interaction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">
                    {t('docs.components.toggle')} & {t('docs.components.toast')}
                  </h3>
                  <div className="space-y-4 p-8 rounded-2xl bg-slate-50 dark:bg-white/5 h-full">
                    <div className="flex gap-2 p-1 bg-slate-200 dark:bg-white/5 rounded-xl w-fit">
                      {['left', 'right'].map(dir => (
                        <button
                          key={dir}
                          onClick={() => setActiveToggle(dir)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer',
                            activeToggle === dir
                              ? 'bg-brand-red text-white shadow-md'
                              : 'text-slate-500 hover:text-brand-navy dark:hover:text-white',
                          )}
                        >
                          {dir.charAt(0).toUpperCase() + dir.slice(1)}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowToast(true)}
                      className="w-full py-3 bg-brand-navy text-white rounded-xl font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Trigger Toast
                    </button>

                    {showToast && (
                      <div className="p-4 bg-brand-navy text-white rounded-xl shadow-2xl flex items-center justify-between animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-3">
                          <Info size={18} className="text-brand-red" />
                          <span className="text-sm font-medium">
                            Changes saved successfully!
                          </span>
                        </div>
                        <button
                          onClick={() => setShowToast(false)}
                          className="text-xs opacity-50 font-bold uppercase hover:opacity-100 cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6">
                    {t('docs.components.resizable_container')}
                  </h3>
                  <div className="p-8 rounded-2xl border border-dashed border-slate-300 dark:border-white/20 flex items-center justify-center min-h-[160px] relative">
                    <div className="w-3/4 h-24 bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 shadow-lg relative">
                      <div className="absolute right-0 bottom-0 p-1 cursor-nwse-resize">
                        <Maximize2 size={16} className="text-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Containers */}
          <section id="containers" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              {t('docs.components.containers.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-400">
                  {t('docs.components.containers.page_container')}
                </p>
                <div className="w-full aspect-video bg-slate-100 dark:bg-white/5 rounded-3xl border-4 border-slate-200 dark:border-white/10 p-4">
                  <div className="w-full h-full bg-white dark:bg-white/5 rounded-2xl shadow-2xl" />
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">
                    {t('docs.components.containers.container_shadow')}
                  </p>
                  <div className="w-full h-20 bg-white dark:bg-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,30,64,0.15)] dark:shadow-none" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-400">
                    {t('docs.components.containers.container_inset')}
                  </p>
                  <div className="w-full h-20 bg-slate-100 dark:bg-black/20 rounded-2xl shadow-inner border border-slate-200 dark:border-white/5" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-400">
                  {t('docs.components.containers.drawer')} &{' '}
                  {t('docs.components.containers.modal')}
                </p>
                <div className="relative w-full aspect-video bg-slate-900/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-4 z-20">
                    <button
                      onClick={() => setShowDrawer(true)}
                      className="px-4 py-2 bg-white dark:bg-white/10 rounded-lg text-xs font-bold shadow-sm cursor-pointer"
                    >
                      Open Drawer
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 bg-brand-red text-white rounded-lg text-xs font-bold shadow-sm cursor-pointer"
                    >
                      Open Modal
                    </button>
                  </div>

                  {/* Drawer Overlay Backdrop Preview */}
                  {(showDrawer || showModal) && (
                    <div
                      className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10"
                      onClick={() => {
                        setShowDrawer(false)
                        setShowModal(false)
                      }}
                    />
                  )}

                  {/* Drawer Preview */}
                  <div
                    className={cn(
                      'absolute left-0 top-0 bottom-0 w-1/3 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-white/10 z-30 transition-transform duration-300',
                      showDrawer ? 'translate-x-0' : '-translate-x-full',
                    )}
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                      <span className="font-bold text-xs uppercase tracking-widest">
                        Drawer
                      </span>
                      <ArrowLeft
                        size={14}
                        className="cursor-pointer"
                        onClick={() => setShowDrawer(false)}
                      />
                    </div>
                  </div>

                  {/* Modal Preview */}
                  {showModal && (
                    <div
                      data-testid="modal-preview"
                      className="w-2/3 h-1/2 bg-white dark:bg-slate-800 rounded-xl shadow-2xl z-30 border border-slate-200 dark:border-white/10 p-4 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <h4 className="font-bold text-sm mb-2">
                        {t('docs.components.containers.modal_title_preview')}
                      </h4>
                      <p className="text-[10px] text-slate-500 mb-4">
                        {t('docs.components.containers.modal_desc_preview')}
                      </p>
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded text-[10px] font-bold cursor-pointer"
                          onClick={() => setShowModal(false)}
                        >
                          {t('docs.components.containers.modal_cancel')}
                        </button>
                        <button
                          data-testid="modal-confirm-btn"
                          className="px-3 py-1 bg-brand-red text-white rounded text-[10px] font-bold cursor-pointer"
                          onClick={() => setShowModal(false)}
                        >
                          {t('docs.components.containers.modal_confirm')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Graphs */}
          <section id="graphs" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              {t('docs.components.graphs.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <BarChart3
                  size={40}
                  className="text-brand-red mb-4 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium">
                  {t('docs.components.graphs.bar_graph')}
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <LineChart
                  size={40}
                  className="text-brand-navy dark:text-white mb-4 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium">
                  {t('docs.components.graphs.line_graph')}
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center w-full">
                <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full mb-4 overflow-hidden">
                  <div className="w-3/4 h-full bg-brand-red animate-pulse" />
                </div>
                <span className="text-sm font-medium">
                  {t('docs.components.graphs.progress_bar')}
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center">
                <div className="relative w-12 h-12 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-white/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-brand-red border-t-transparent animate-spin" />
                </div>
                <span className="text-sm font-medium">
                  {t('docs.components.graphs.conic_graph')}
                </span>
              </div>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 flex flex-col items-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <Radar
                  size={40}
                  className="text-brand-navy dark:text-white mb-4 group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium">
                  {t('docs.components.graphs.radar_chart')}
                </span>
              </div>
            </div>
          </section>

          {/* Writing Posts */}
          <section id="writing-posts" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-brand-navy dark:text-white mb-8 border-b border-slate-200 dark:border-white/10 pb-4">
              {t('docs.writing_posts.title')}
            </h2>

            <div className="space-y-12">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('docs.writing_posts.intro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-green-600">
                    <Check size={20} /> {t('docs.writing_posts.dos')}
                  </h3>
                  <ul className="space-y-3">
                    {[
                      t('docs.writing_posts.dos_list.images'),
                      t('docs.writing_posts.dos_list.hashtags'),
                      t('docs.writing_posts.dos_list.clear_text'),
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-brand-red">
                    <ArrowLeft size={20} className="rotate-180" />{' '}
                    {t('docs.writing_posts.donts')}
                  </h3>
                  <ul className="space-y-3">
                    {[
                      t('docs.writing_posts.donts_list.formatting'),
                      t('docs.writing_posts.donts_list.huge_files'),
                      t('docs.writing_posts.donts_list.broken_links'),
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold">
                  {t('docs.writing_posts.template')}
                </h3>
                <div className="p-6 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto relative group">
                  <div className="absolute top-4 right-4 text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Markdown
                  </div>
                  <pre>{`---
title: 'Post Title'
date: 'YYYY-MM-DD'
image: 'https://example.com/cover.jpg'
description: 'Short summary...'
images:
  - 'https://example.com/image1.jpg'
---

### Português
Conteúdo em português...

---

### English
English content...`}</pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  t('docs.writing_posts.guidelines.filename'),
                  t('docs.writing_posts.guidelines.folder'),
                  t('docs.writing_posts.guidelines.frontmatter'),
                  t('docs.writing_posts.guidelines.bilingual'),
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5"
                  >
                    <p className="text-sm font-medium text-brand-navy dark:text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function ColorSwatch({
  color,
  name,
  variable,
  dark,
}: {
  color: string
  name: string
  variable: string
  dark?: boolean
}) {
  return (
    <div
      className={cn(
        'space-y-3',
        dark === true
          ? 'hidden dark:block'
          : dark === false
            ? 'dark:hidden'
            : '',
      )}
    >
      <div
        className="w-full h-24 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm"
        style={{ backgroundColor: color }}
      />
      <div>
        <p className="font-bold text-sm text-brand-navy dark:text-white">
          {name}
        </p>
        <p className="text-xs font-mono text-slate-400 uppercase">{color}</p>
        <p className="text-[10px] font-mono text-slate-400">{variable}</p>
      </div>
    </div>
  )
}
