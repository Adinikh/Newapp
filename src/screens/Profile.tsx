import { motion } from 'framer-motion'
import { BottomNav } from '../components/PhoneFrame'

export function ProfileScreen() {
  const photos = [
    'https://images.pexels.com/photos/15237424/pexels-photo-15237424.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
    'https://images.pexels.com/photos/15237364/pexels-photo-15237364.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
    'https://images.pexels.com/photos/14180701/pexels-photo-14180701.jpeg?auto=compress&cs=tinysrgb&h=600&w=600',
  ]

  const interests = ['Photography', 'Football', 'Travel', 'Food', 'Music', 'Coding']

  return (
    <div className="h-full flex flex-col bg-ink-950">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {/* Cover photo */}
        <div className="relative h-48 overflow-hidden">
          <img src={photos[0]} alt="cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute top-14 right-5 flex gap-2">
            <button className="w-10 h-10 rounded-full glass-strong flex items-center justify-center active:scale-90 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
            </button>
            <button className="w-10 h-10 rounded-full glass-strong flex items-center justify-center active:scale-90 transition-transform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Profile info */}
        <div className="px-5 -mt-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-3 mb-4"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-ink-950 shadow-card">
                <img src={photos[0]} alt="me" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center border-2 border-ink-950">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold">Rohan, 23</h1>
              </div>
              <p className="text-xs text-ink-400">Delhi University · Final Year</p>
            </div>
          </motion.div>

          {/* Verification badges */}
          <div className="flex gap-2 mb-5">
            <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              <span className="text-xs font-semibold text-teal-300">Verified Student</span>
            </div>
            <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              <span className="text-xs font-semibold text-gold-300">Bonafide</span>
            </div>
          </div>

          {/* Bio */}
          <div className="glass rounded-2xl p-4 mb-5">
            <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">About Me</h3>
            <p className="text-sm text-ink-100 leading-relaxed">
              Photographer & foodie. I know every hidden food joint in the city. Swipe right if you love biryani debates.
            </p>
          </div>

          {/* Photo grid */}
          <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">My Photos</h3>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {photos.map((photo, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
            <button className="aspect-square rounded-2xl border-2 border-dashed border-ink-700 flex flex-col items-center justify-center gap-1 text-ink-500 active:scale-95 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              <span className="text-[10px] font-medium">Add</span>
            </button>
          </div>

          {/* Interests */}
          <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {interests.map((interest) => (
              <span key={interest} className="chip text-sm">
                {interest}
              </span>
            ))}
            <button className="chip text-sm text-brand-300 border-brand-400/30">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              Add
            </button>
          </div>

          {/* Settings */}
          <h3 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Settings</h3>
          <div className="space-y-2 mb-6">
            {[
              { icon: 'sliders', label: 'Discovery Preferences' },
              { icon: 'bell', label: 'Notifications' },
              { icon: 'shield', label: 'Privacy & Safety' },
              { icon: 'help', label: 'Help & Support' },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 glass rounded-2xl px-4 py-3.5 active:scale-[0.98] transition-transform">
                <SettingIcon name={item.icon} />
                <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-500"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            ))}
          </div>

          <button className="w-full glass rounded-2xl px-4 py-3.5 text-sm font-semibold text-danger active:scale-[0.98] transition-transform mb-6">
            Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

function SettingIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'text-ink-300' }
  const icons: Record<string, React.ReactNode> = {
    sliders: <svg {...common}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
    bell: <svg {...common}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
    shield: <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    help: <svg {...common}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>,
  }
  return icons[name]
}
