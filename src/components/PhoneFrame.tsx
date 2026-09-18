import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

interface PhoneFrameProps {
  children: ReactNode
  showStatusBar?: boolean
  statusBg?: string
}

export function PhoneFrame({ children, showStatusBar = true, statusBg = 'transparent' }: PhoneFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-ink-950 py-4 px-3">
      <div className="phone-frame relative">
        {/* Phone bezel */}
        <div className="absolute inset-0 rounded-[3rem] bg-ink-900 shadow-2xl border border-white/5" />
        <div className="absolute inset-[3px] rounded-[2.8rem] overflow-hidden bg-ink-950">
          {showStatusBar && <StatusBar bg={statusBg} />}
          <div className="absolute inset-0 top-0 bottom-0 overflow-y-auto scrollbar-none">
            {children}
          </div>
        </div>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-ink-900 rounded-b-2xl z-50" />
      </div>
    </div>
  )
}

function StatusBar({ bg }: { bg: string }) {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-11 z-40 flex items-center justify-between px-7 pt-2 text-xs font-semibold"
      style={{ background: bg }}
    >
      <span className="text-ink-50">9:41</span>
      <div className="flex items-center gap-1.5 text-ink-50">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><path d="M8 11l2-2.5h-4L8 11zm4-5l2-2.5H2L4 6h8zm4-5l2-2.5H0L2 1h14z" opacity=".9"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><path d="M8 2C5 2 2.5 3 1 4.5L0 3.5C2 1.5 5 0 8 0s6 1.5 8 3.5L15 4.5C13.5 3 11 2 8 2zm0 4c-1.5 0-3 .5-4 1.5L3 6.5C4.5 5 6 4.5 8 4.5s3.5.5 5 2L12 7.5C11 6.5 9.5 6 8 6zm0 4l2-2.5H6L8 10z" opacity=".9"/></svg>
        <div className="flex items-center">
          <div className="w-6 h-3 border border-current rounded-sm relative">
            <div className="absolute inset-0.5 bg-current rounded-[1px] w-[75%]" />
          </div>
          <div className="w-0.5 h-1.5 bg-current rounded-r ml-0.5" />
        </div>
      </div>
    </div>
  )
}

interface ScreenHeaderProps {
  title?: string
  showBack?: boolean
  right?: ReactNode
  transparent?: boolean
}

export function ScreenHeader({ title, showBack, right, transparent }: ScreenHeaderProps) {
  const navigate = useNavigate()
  return (
    <div
      className={`sticky top-0 z-30 flex items-center justify-between px-5 h-14 ${
        transparent ? '' : 'glass-strong'
      }`}
    >
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
      ) : (
        <div className="w-10" />
      )}
      {title && <h2 className="font-display text-lg font-semibold">{title}</h2>}
      {right || <div className="w-10" />}
    </div>
  )
}

export function BottomNav() {
  const navigate = useNavigate()
  const path = window.location.pathname
  const items = [
    { icon: 'flame', label: 'Discover', path: '/discover' },
    { icon: 'heart', label: 'Matches', path: '/matches' },
    { icon: 'message', label: 'Chats', path: '/chats' },
    { icon: 'user', label: 'Profile', path: '/profile' },
  ]
  const activeIndex = Math.max(0, items.findIndex((item) => path === item.path || path.startsWith(item.path + '/')))
  return (
    <div className="sticky bottom-0 z-30 glass-strong border-t border-white/10 px-2 py-2 pb-5">
      <div className="relative flex items-center justify-around">
        {/* Animated active pill */}
        <motion.div
          className="absolute top-0 h-12 w-14 rounded-2xl bg-brand-500/15"
          animate={{ left: `calc(${activeIndex * 25}% + ${activeIndex * 0}px)` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ width: '25%' }}
        />
        {items.map((item, i) => {
          const active = i === activeIndex
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-1 px-4 py-1.5 active:scale-90 transition-transform z-10"
            >
              <motion.div
                animate={active ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <NavIcon name={item.icon} active={active} />
              </motion.div>
              <motion.span
                animate={active ? { opacity: 1 } : { opacity: 0.6 }}
                className={`text-[10px] font-semibold ${active ? 'text-brand-400' : 'text-ink-400'}`}
              >
                {item.label}
              </motion.span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const color = active ? 'text-brand-400' : 'text-ink-400'
  const stroke = active ? 2.5 : 2
  const icons: Record<string, ReactNode> = {
    flame: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={color}><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054-2-6 .5 2.5 0 3.5-1.5 5-1.5 1.5-2.5 3-2.5 5a5 5 0 0010 0z"/><path d="M12 15a3 3 0 100 6 3 3 0 000-6z"/></svg>,
    heart: <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={color}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/></svg>,
    message: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={color}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>,
    user: <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={color}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  }
  return icons[name]
}
