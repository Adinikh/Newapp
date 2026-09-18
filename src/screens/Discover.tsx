import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { profiles, type Profile } from '../data/mock'
import { BottomNav } from '../components/PhoneFrame'

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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow">
            <span className="font-display text-lg font-bold text-white">R</span>
          </div>
          <span className="font-display text-xl font-bold">Recipro</span>
        </div>
        <button
          onClick={() => navigate('/wingman')}
          className="w-10 h-10 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
        </button>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative px-4 pb-2">
        <div className="relative h-full max-h-[640px]">
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
            <div className="absolute inset-0 scale-95 opacity-50 rounded-5xl overflow-hidden pointer-events-none">
              <img src={profiles[index + 1].photos[0]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink-950/40" />
            </div>
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
  onSwipe,
}: {
  profile: Profile
  direction: number
  onDragEnd: (_: unknown, info: PanInfo) => void
  onSwipe: (dir: number) => void
}) {
  const [photoIndex, setPhotoIndex] = useState(0)

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={onDragEnd}
      initial={{ scale: 1, opacity: 1 }}
      exit={{
        x: direction > 0 ? 500 : -500,
        opacity: 0,
        rotate: direction > 0 ? 20 : -20,
        transition: { duration: 0.3 },
      }}
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

      {/* Like / Pass indicators */}
      <div className="absolute top-16 left-6 -rotate-12 border-4 border-teal-400 rounded-2xl px-5 py-2 text-teal-400 font-display text-2xl font-bold opacity-0 pointer-events-none">
        LIKE
      </div>
      <div className="absolute top-16 right-6 rotate-12 border-4 border-danger rounded-2xl px-5 py-2 text-danger font-display text-2xl font-bold opacity-0 pointer-events-none">
        NOPE
      </div>

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

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-display text-3xl font-bold">{profile.name}</h2>
          <span className="text-2xl font-light text-ink-200">{profile.age}</span>
          {profile.verified && (
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
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
        <p className="text-sm text-ink-100 leading-relaxed mb-3 line-clamp-2">{profile.bio}</p>
        <div className="flex flex-wrap gap-2">
          {profile.interests.slice(0, 4).map((interest) => (
            <span key={interest} className="chip text-xs">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
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
    <button
      onClick={onClick}
      className={`rounded-full flex items-center justify-center active:scale-90 transition-transform ${styles[variant]}`}
    >
      {icon}
    </button>
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
      className="absolute inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex flex-col items-center justify-center px-8"
    >
      {/* Confetti dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, y: 0, x: 0 }}
          animate={{ opacity: 0, y: -300, x: (Math.random() - 0.5) * 400 }}
          transition={{ duration: 1.5, delay: Math.random() * 0.3 }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: ['#ff2d63', '#ffb81f', '#34c19f', '#ff5d80'][i % 4] }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="text-center"
      >
        <h1 className="font-display text-5xl font-bold gradient-text mb-8">It's a Match!</h1>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-28 h-28 rounded-5xl overflow-hidden border-4 border-brand-500 shadow-glow">
            <img src={profile.photos[0]} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            className="w-14 h-14 rounded-full bg-brand-500 flex items-center justify-center shadow-glow"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>
          </motion.div>
          <div className="w-28 h-28 rounded-5xl overflow-hidden border-4 border-gold-400 shadow-lg">
            <img src="https://images.pexels.com/photos/15237424/pexels-photo-15237424.jpeg?auto=compress&cs=tinysrgb&h=300&w=300" alt="You" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Spark */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl px-5 py-4 mb-8 max-w-xs"
        >
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
            <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">Spark Icebreaker</span>
          </div>
          <p className="text-sm text-ink-100 text-left">{profile.spark}</p>
        </motion.div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button onClick={onMessage} className="btn-primary text-base">
            Send a Message
          </button>
          <button onClick={onClose} className="btn-ghost text-base">
            Keep Swiping
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function EmptyDeck({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div className="w-20 h-20 rounded-5xl bg-ink-800 flex items-center justify-center mb-6">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-500"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054-2-6 .5 2.5 0 3.5-1.5 5-1.5 1.5-2.5 3-2.5 5a5 5 0 0010 0z"/></svg>
      </div>
      <h2 className="font-display text-2xl font-bold mb-2">You're all caught up!</h2>
      <p className="text-ink-400 text-sm mb-6 max-w-xs">You've seen everyone nearby. Check back later or expand your filters.</p>
      <button onClick={onReset} className="btn-ghost">Reset Deck</button>
    </div>
  )
}
