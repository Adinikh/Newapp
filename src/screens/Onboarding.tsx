import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AnimatedGradientMesh, FloatingParticles, MagneticButton, StaggerContainer, StaggerItem } from '../components/Animations'

export function OnboardingScreen() {
  const navigate = useNavigate()

  return (
    <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-b from-ink-900 via-ink-950 to-brand-950">
      {/* Animated gradient mesh */}
      <AnimatedGradientMesh colors={['#ff2d6340', '#ffb81f30', '#34c19f20']} />

      {/* Floating particles */}
      <FloatingParticles count={12} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pt-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          {/* Logo with orbiting sparkle */}
          <div className="relative">
            <motion.div
              animate={{ rotate: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-5xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 flex items-center justify-center shadow-glow"
            >
              <span className="font-display text-5xl font-bold text-white">R</span>
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-2 -right-2 w-12 h-12"
            >
              <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </motion.div>
            {/* Orbiting dots */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 pointer-events-none"
            >
              {[0, 120, 240].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full bg-brand-400"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateY(-70px)`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-display text-4xl font-bold text-center mb-3 text-balance"
        >
          Find your <span className="gradient-text">campus match</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-ink-300 text-center text-base leading-relaxed max-w-xs mb-10"
        >
          Verified college students only. Real connections, safe meetups, and an AI wingman that actually helps.
        </motion.p>

        {/* Feature pills with stagger */}
        <StaggerContainer delay={0.5} stagger={0.1} className="space-y-3 w-full max-w-xs mb-10">
          {[
            { icon: 'shield', text: 'College email & bonafide verified' },
            { icon: 'sparkles', text: 'AI Wingman for icebreakers & venues' },
            { icon: 'map', text: 'Recipro-verified safe meetup spots' },
          ].map((f, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ scale: 1.03, x: 4 }}
                className="flex items-center gap-3 glass rounded-2xl px-4 py-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0"
                >
                  <FeatureIcon name={f.icon} />
                </motion.div>
                <span className="text-sm text-ink-100 font-medium">{f.text}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <div className="relative z-10 px-8 pb-10 space-y-3">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          <MagneticButton
            onClick={() => navigate('/login')}
            className="btn-primary w-full text-base"
          >
            Get Started
          </MagneticButton>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-ink-400"
        >
          By continuing you agree to our Terms & Privacy Policy
        </motion.p>
      </div>
    </div>
  )
}

function FeatureIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'text-brand-300' }
  const icons: Record<string, React.ReactNode> = {
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    sparkles: <svg {...common}><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>,
    map: <svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  }
  return icons[name]
}
