import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { profiles, type Profile } from '../data/mock'
import { BottomNav } from '../components/PhoneFrame'
import { FloatingHearts, MagneticButton, RippleButton } from '../components/Animations'

export function DiscoverScreen() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null)

  const current = profiles[index]

  const swipe = (dir: number) => {
    if (dir > 0 && current) {
      setMatchedProfile(current)
      setShowMatch(true)
      setTimeout(() => {
        setIndex((i) => Math.min(i + 1, profiles.length - 1))
        setDirection(dir)
      }, 100)
    } else {
      setDirection(dir)
      setIndex((i) => Math.min(i + 1, profiles.length - 1))
    }
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 120) swipe(1)
    else if (info.offset.x < -120) swipe(-1)
  }

  if (!current) {
    return (
      <div className="h-full flex flex-col bg-ink-950">
        <EmptyDeck onReset={() => setIndex(0)} />
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-ink-950 relative overflow-hidden">
      {/* Top bar */}
      <div className="sticky top-0 z-30 px-5 pt-14 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow"
          >
            <span className="font-display text-lg font-bold text-white">R</span>
          </motion.div>
          <span className="font-display text-xl font-bold">Recipro</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/wingman')}
          className="w-10 h-10 rounded-full glass flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
        </motion.button>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative px-4 pb-2">
        <div className="relative h-full max-h-[640px]" style={{ perspective: 1000 }}>
          <AnimatePresence initial={false} custom={direction}>
            <SwipeCard
              key={current.id}
              profile={current}
              direction={direction}
              onDragEnd={handleDragEnd}
              onSwipe={swipe}
            />
          </AnimatePresence>

          {/* Stack shadow cards */}
          {index + 1 < profiles.length && (
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 0.95, opacity: 0.4 }}
              className="absolute inset-0 rounded-5xl overflow-hidden pointer-events-none"
            >
              <img src={profiles[index + 1].photos[0]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink-950/40" />
            </motion.div>
          )}
          {index + 2 < profiles.length && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 0.9, opacity: 0.2 }}
              className="absolute inset-0 rounded-5xl overflow-hidden pointer-events-none"
            >
              <img src={profiles[index + 2].photos[0]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink-950/60" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-8 pb-6 pt-2 flex items-center justify-center gap-5">
        <ActionButton
          onClick={() => swipe(-1)}
          variant="pass"
          icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>}
        />
        <ActionButton
          onClick={() => navigate('/wingman')}
          variant="spark"
          icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>}
        />
        <ActionButton
          onClick={() => swipe(1)}
          variant="like"
          icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>}
        />
      </div>

      <BottomNav />

      {/* Match overlay */}
      <AnimatePresence>
        {showMatch && matchedProfile && (
          <MatchOverlay
            profile={matchedProfile}
            onClose={() => setShowMatch(false)}
            onMessage={() => {
              setShowMatch(false)
              navigate('/chat/m1')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function SwipeCard({
  profile,
  direction,
  onDragEnd,
}: {
  profile: Profile
  direction: number
  onDragEnd: (_: unknown, info: PanInfo) => void
  onSwipe: (dir: number) => void
}) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const likeOpacity = useTransform(x, [40, 150], [0, 1])
  const nopeOpacity = useTransform(x, [-150, -40], [1, 0])
  const likeScale = useTransform(x, [40, 150], [0.8, 1.1])
  const nopeScale = useTransform(x, [-150, -40], [1.1, 0.8])
  const glowOpacity = useTransform(x, [-150, -40, 40, 150], [0.4, 0, 0, 0.4])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={onDragEnd}
      style={{ x, rotate }}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: direction > 0 ? 500 : -500,
        opacity: 0,
        rotate: direction > 0 ? 25 : -25,
        transition: { duration: 0.3 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute inset-0 rounded-5xl overflow-hidden shadow-card cursor-grab active:cursor-grabbing"
    >
      {/* Photo */}
      <img
        src={profile.photos[photoIndex]}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

      {/* Drag glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-danger/30 via-transparent to-teal-400/30" />
      </motion.div>

      {/* Like indicator */}
      <motion.div
        style={{ opacity: likeOpacity, scale: likeScale }}
        className="absolute top-20 left-6 -rotate-12 border-4 border-teal-400 rounded-2xl px-5 py-2 text-teal-400 font-display text-2xl font-bold pointer-events-none"
      >
        LIKE
      </motion.div>
      {/* Nope indicator */}
      <motion.div
        style={{ opacity: nopeOpacity, scale: nopeScale }}
        className="absolute top-20 right-6 rotate-12 border-4 border-danger rounded-2xl px-5 py-2 text-danger font-display text-2xl font-bold pointer-events-none"
      >
        NOPE
      </motion.div>

      {/* Photo dots */}
      <div className="absolute top-16 left-0 right-0 flex gap-1.5 px-5">
        {profile.photos.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i === photoIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Photo tap zones */}
      <div className="absolute top-14 left-0 w-1/2 h-1/2" onClick={() => setPhotoIndex(Math.max(0, photoIndex - 1))} />
      <div className="absolute top-14 right-0 w-1/2 h-1/2" onClick={() => setPhotoIndex(Math.min(profile.photos.length - 1, photoIndex + 1))} />

      {/* Vibe badge top-right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 right-5 z-10"
      >
        <div className="glass-strong rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-gold-400"
          />
          <span className="text-xs font-semibold text-gold-200">{profile.vibe}</span>
        </div>
      </motion.div>

      {/* Compatibility ring top-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
        className="absolute top-20 left-5 z-10"
      >
        <CompatibilityRing score={profile.compatibility} />
      </motion.div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-3xl font-bold">{profile.name}</h2>
            <span className="text-2xl font-light text-ink-200">{profile.age}</span>
            {profile.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-ink-200 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{profile.college}</span>
            <span className="text-ink-500">·</span>
            <span>{profile.year}</span>
            <span className="text-ink-500">·</span>
            <span>{profile.distance}</span>
          </div>
          <p className="text-sm text-ink-100 leading-relaxed mb-3 line-clamp-1">{profile.bio}</p>

          {/* Green flags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {profile.greenFlags.slice(0, 2).map((flag, i) => (
              <motion.div
                key={flag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-1 glass-strong rounded-full px-2.5 py-1"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
                <span className="text-[10px] font-medium text-teal-200">{flag}</span>
              </motion.div>
            ))}
          </div>

          {/* Personality trait bars */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3"
          >
            {profile.traits.slice(0, 4).map((trait, i) => (
              <div key={trait.label}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-ink-400">{trait.label}</span>
                  <span className="text-[10px] font-semibold text-ink-200">{trait.value}%</span>
                </div>
                <div className="h-1 rounded-full bg-ink-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${trait.value}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-gold-400"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {profile.interests.slice(0, 3).map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="chip text-xs"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function CompatibilityRing({ score }: { score: number }) {
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg width="56" height="56" className="absolute inset-0 -rotate-90">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
        <motion.circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="url(#compatGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="compatGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff5d80" />
            <stop offset="100%" stopColor="#ffb81f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          className="text-sm font-bold text-white block leading-none"
        >
          {score}
        </motion.span>
        <span className="text-[7px] text-ink-400 uppercase tracking-wider">match</span>
      </div>
    </div>
  )
}

function ActionButton({
  onClick,
  variant,
  icon,
}: {
  onClick: () => void
  variant: 'pass' | 'like' | 'spark'
  icon: React.ReactNode
}) {
  const styles = {
    pass: 'w-14 h-14 bg-ink-800 border-2 border-ink-700 text-ink-300',
    like: 'w-16 h-16 bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow',
    spark: 'w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg',
  }
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      className={`rounded-full flex items-center justify-center transition-transform ${styles[variant]}`}
    >
      {icon}
    </motion.button>
  )
}

function MatchOverlay({
  profile,
  onClose,
  onMessage,
}: {
  profile: Profile
  onClose: () => void
  onMessage: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex flex-col items-center justify-center px-8 overflow-hidden"
    >
      {/* Floating hearts */}
      <FloatingHearts count={14} />

      {/* Confetti burst */}
      {[...Array(24)].map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const dist = 150 + Math.random() * 100
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: 0,
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.2, delay: Math.random() * 0.2, ease: 'easeOut' }}
            className="absolute w-2.5 h-2.5 rounded-sm"
            style={{
              backgroundColor: ['#ff2d63', '#ffb81f', '#34c19f', '#ff5d80', '#ffffff'][i % 5],
              top: '40%',
              left: '50%',
            }}
          />
        )
      })}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="text-center relative z-10"
      >
        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="font-display text-5xl font-bold gradient-text mb-8"
        >
          It's a Match!
        </motion.h1>

        {/* Avatars with connecting line */}
        <div className="flex items-center justify-center gap-4 mb-8 relative">
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-28 h-28 rounded-5xl overflow-hidden border-4 border-brand-500 shadow-glow"
          >
            <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Animated connecting heart */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
            className="relative"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center shadow-glow"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>
            </motion.div>
            {/* Sparkle ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 pointer-events-none"
            >
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full bg-gold-400"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateY(-26px)`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-28 h-28 rounded-5xl overflow-hidden border-4 border-gold-400 shadow-lg"
          >
            <img src="https://images.pexels.com/photos/15237424/pexels-photo-15237424.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="You" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Spark */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl px-5 py-4 mb-8 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-1">
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
            ><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></motion.svg>
            <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">Spark Icebreaker</span>
          </div>
          <p className="text-sm text-ink-100 text-left">{profile.spark}</p>
        </motion.div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <MagneticButton onClick={onMessage} className="btn-primary text-base w-full">
            Send a Message
          </MagneticButton>
          <RippleButton onClick={onClose} className="btn-ghost text-base w-full">
            Keep Swiping
          </RippleButton>
        </div>
      </motion.div>
    </motion.div>
  )
}

function EmptyDeck({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <motion.div
        animate={{ rotate: [0, -5, 5, 0], y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-5xl bg-ink-800 flex items-center justify-center mb-6"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-500"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054-2-6 .5 2.5 0 3.5-1.5 5-1.5 1.5-2.5 3-2.5 5a5 5 0 0010 0z"/></svg>
      </motion.div>
      <h2 className="font-display text-2xl font-bold mb-2">You're all caught up!</h2>
      <p className="text-ink-400 text-sm mb-6 max-w-xs">You've seen everyone nearby. Check back later or expand your filters.</p>
      <button onClick={onReset} className="btn-ghost">Reset Deck</button>
    </div>
  )
}
