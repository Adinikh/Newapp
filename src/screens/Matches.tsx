import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { matches } from '../data/mock'
import { BottomNav } from '../components/PhoneFrame'

export function MatchesScreen() {
  const navigate = useNavigate()
  const newMatches = matches.filter((m) => m.unread > 0)
  const allMatches = matches

  return (
    <div className="h-full flex flex-col bg-ink-950">
      <div className="sticky top-0 z-30 px-5 pt-14 pb-3 glass-strong">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold">Matches</h1>
          <button
            onClick={() => navigate('/wingman')}
            className="w-10 h-10 rounded-full glass flex items-center justify-center active:scale-90 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 pb-4">
        {/* New matches carousel */}
        {newMatches.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">New Matches</h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-none -mx-5 px-5 pb-2">
              {newMatches.map((m, i) => (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/chat/${m.id}`)}
                  className="shrink-0 active:scale-95 transition-transform"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-400 to-gold-400 opacity-80" />
                    <div className="relative w-20 h-24 rounded-3xl overflow-hidden border-2 border-ink-950">
                      <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    {m.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 border-2 border-ink-950 flex items-center justify-center text-[10px] font-bold z-10">
                        {m.unread}
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-semibold mt-2 text-center">{m.name}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* All matches list */}
        <h2 className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">All Matches</h2>
        <div className="space-y-2">
          {allMatches.map((m, i) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/chat/${m.id}`)}
              className="w-full flex items-center gap-3 p-3 rounded-2xl glass active:scale-[0.98] transition-transform"
            >
              <div className="relative shrink-0">
                <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-2xl object-cover" />
                {m.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-teal-400 border-2 border-ink-950" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{m.name}</span>
                  {m.spark && (
                    <span className="shrink-0 text-[10px] text-gold-300 flex items-center gap-0.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
                      Spark
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-400 truncate">{m.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-ink-500">{m.time}</span>
                {m.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center text-[10px] font-bold">
                    {m.unread}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
