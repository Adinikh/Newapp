import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { vibeQuestions, type VibeType } from '../data/mock'
import { AnimatedGradientMesh, FloatingParticles, MagneticButton } from '../components/Animations'

const vibeColors: Record<VibeType, string> = {
  Explorer: '#34c19f',
  Homebody: '#ffb81f',
  Creator: '#ff5d80',
  Hustler: '#ff2d63',
  Dreamer: '#5dd9b8',
  Socialite: '#ffd24d',
}

const vibeDescriptions: Record<VibeType, string> = {
  Explorer: "You crave adventure, new places, and spontaneous plans. Your perfect match is someone who says 'let's go' before you finish the sentence.",
  Homebody: 'Cozy, thoughtful, and deeply loyal. You thrive in intimate settings and value quality time over everything.',
  Creator: 'You see the world differently — art, music, and ideas light you up. You need someone who gets your passion.',
  Hustler: 'Ambitious, driven, and always building something. You want a partner who has their own dreams and cheers for yours.',
  Dreamer: 'Emotionally rich, romantic, and reflective. You connect through deep conversations and shared vulnerability.',
  Socialite: 'You light up every room and know everyone. Your match is someone who can keep up with your energy.',
}

export function VibeQuizScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<VibeType[]>([])
  const [showResult, setShowResult] = useState(false)

  const totalSteps = vibeQuestions.length
  const progress = (step / totalSteps) * 100

  const pick = (vibe: VibeType) => {
    const next = [...answers, vibe]
    setAnswers(next)
    if (step + 1 < totalSteps) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  const resultVibe = (): VibeType => {
    const counts: Record<string, number> = {}
    answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1))
    let top = answers[0] || 'Explorer'
    let max = 0
    for (const [v, c] of Object.entries(counts)) {
      if (c > max) {
        max = c
        top = v as VibeType
      }
    }
    return top as VibeType
  }

  if (showResult) {
    const vibe = resultVibe()
    const color = vibeColors[vibe]
    return (
      <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950">
        <AnimatedGradientMesh colors={[`${color}30`, `${color}20`, '#ff2d6320']} />
        <FloatingParticles count={10} colors={[color, '#ff5d80', '#ffb81f']} />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative mb-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 rounded-5xl flex items-center justify-center text-5xl shadow-glow"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
            >
              {vibeQuestions[0].emoji}
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 pointer-events-none"
            >
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    background: color,
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateY(-60px)`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color }}
          >
            Your Vibe is
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className="font-display text-5xl font-bold mb-4"
            style={{ color }}
          >
            {vibe}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-ink-300 leading-relaxed max-w-xs mb-8"
          >
            {vibeDescriptions[vibe]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-2xl px-5 py-4 mb-8 max-w-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold-300"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z" />
              </motion.svg>
              <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">What this means</span>
            </div>
            <p className="text-xs text-ink-200 text-left leading-relaxed">
              We'll match you with people whose vibes complement yours. You'll see compatibility scores on every profile.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 px-8 pb-10">
          <MagneticButton
            onClick={() => navigate('/discover')}
            className="btn-primary w-full text-base"
          >
            Find My Matches
          </MagneticButton>
        </div>
      </div>
    )
  }

  const q = vibeQuestions[step]
  const isLast = step === totalSteps - 1

  return (
    <div className="relative h-full flex flex-col overflow-hidden bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950">
      <AnimatedGradientMesh colors={['#ff2d6330', '#ffb81f20', '#34c19f20']} />

      {/* Progress bar */}
      <div className="relative z-10 px-8 pt-16 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-ink-400 uppercase tracking-wider">
            Vibe Check {step + 1} / {totalSteps}
          </span>
          <span className="text-xs text-ink-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-500 to-gold-400"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="relative z-10 flex-1 flex flex-col px-8 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col"
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl mb-4 text-center"
            >
              {q.emoji}
            </motion.div>
            <h1 className="font-display text-2xl font-bold text-center mb-8 text-balance">
              {q.question}
            </h1>

            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <motion.button
                  key={opt.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pick(opt.vibe)}
                  className="w-full glass rounded-2xl px-5 py-4 flex items-center gap-4 text-left transition-colors hover:border-brand-400/50"
                >
                  <span className="text-2xl shrink-0">{opt.emoji}</span>
                  <span className="text-sm font-medium text-ink-100 flex-1">{opt.text}</span>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-6 h-6 rounded-full border-2 border-ink-600 flex items-center justify-center shrink-0"
                    style={{ borderColor: vibeColors[opt.vibe] + '60' }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: vibeColors[opt.vibe] }} />
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => {
                  setStep(step - 1)
                  setAnswers(answers.slice(0, -1))
                }}
                className="mt-6 text-xs text-ink-500 font-semibold flex items-center gap-1.5 self-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Go back
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 px-8 pb-10">
        <p className="text-center text-xs text-ink-500">
          {isLast ? 'Last question!' : 'Answer honestly for better matches'}
        </p>
      </div>
    </div>
  )
}
