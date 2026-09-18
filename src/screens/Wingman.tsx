import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { wingmanTips } from '../data/mock'
import { BottomNav } from '../components/PhoneFrame'
import { AnimatedCounter, GlowPulse, StaggerContainer, StaggerItem } from '../components/Animations'

export function WingmanScreen() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950 relative overflow-hidden">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-500/20"
            style={{ width: 4 + i, height: 4 + i, left: `${10 + i * 12}%` }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="sticky top-0 z-30 px-5 pt-14 pb-3 flex items-center justify-between glass-strong">
        <h1 className="font-display text-2xl font-bold">AI Wingman</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/venues')}
          className="glass rounded-full px-3 py-1.5 text-xs font-semibold text-brand-300 flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Safe Venues
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 pb-4 relative z-10">
        {/* AI avatar with glow pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center py-8"
        >
          <GlowPulse color="#ffb81f" size={96}>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-400 via-gold-500 to-brand-500 flex items-center justify-center shadow-glow"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
            </motion.div>
          </GlowPulse>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-xl font-bold mb-1 mt-4"
          >
            Your Wingman is active
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-ink-400 max-w-xs"
          >
            Analyzing your matches and conversations to help you connect better
          </motion.p>
        </motion.div>

        {/* Stats with animated counters */}
        <StaggerContainer className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Matches', value: 12, suffix: '' },
            { label: 'Replies', value: 89, suffix: '%' },
            { label: 'Convos', value: 5, suffix: '' },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-2xl p-4 text-center"
              >
                <div className="font-display text-2xl font-bold gradient-text">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] text-ink-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Tips with staggered slide-in */}
        <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Smart Suggestions</h3>
        <StaggerContainer stagger={0.12} className="space-y-3 mb-6">
          {wingmanTips.map((tip) => (
            <StaggerItem key={tip.id}>
              <motion.div
                whileHover={{ scale: 1.02, x: 4 }}
                className="glass rounded-2xl p-4 flex items-start gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                  className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0"
                >
                  <TipIcon name={tip.icon} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs text-ink-300 leading-relaxed">{tip.text}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Quick actions */}
        <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/venues')}
            className="glass rounded-2xl p-4 text-left"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center mb-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </motion.div>
            <h4 className="font-semibold text-sm mb-0.5">Find Safe Venues</h4>
            <p className="text-[10px] text-ink-400">Verified meetup spots near you</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/matches')}
            className="glass rounded-2xl p-4 text-left"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center mb-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>
            </motion.div>
            <h4 className="font-semibold text-sm mb-0.5">Review Matches</h4>
            <p className="text-[10px] text-ink-400">See who you matched with</p>
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function TipIcon({ name }: { name: string }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'text-brand-300' }
  const icons: Record<string, React.ReactNode> = {
    music: <svg {...common}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    message: <svg {...common}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    map: <svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  }
  return icons[name]
}
