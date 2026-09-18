import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { safeVenues } from '../data/mock'
import { ScreenHeader, BottomNav } from '../components/PhoneFrame'

export function SafeVenuesScreen() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col bg-ink-950">
      <ScreenHeader title="Safe Venues" showBack />

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 pb-4">
        {/* Info banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 mb-5 flex items-start gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">Recipro-Verified Venues</h3>
            <p className="text-xs text-ink-300 leading-relaxed">
              Every venue is reviewed for safety: well-lit, CCTV coverage, women-friendly, and public locations.
            </p>
          </div>
        </motion.div>

        {/* Venue cards */}
        <div className="space-y-4">
          {safeVenues.map((venue, i) => (
            <motion.button
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full text-left glass rounded-3xl overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className="relative h-40">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                {venue.verified && (
                  <div className="absolute top-3 right-3 glass-strong rounded-full px-3 py-1.5 flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                    <span className="text-xs font-semibold text-teal-300">Verified Safe</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-lg font-bold mb-0.5">{venue.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-ink-200">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>{venue.address}</span>
                    <span className="text-ink-500">·</span>
                    <span>{venue.distance}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span className="font-semibold text-sm">{venue.rating}</span>
                    <span className="text-xs text-ink-400">/ 5</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {venue.hours}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {venue.tags.map((tag) => (
                    <span key={tag} className="text-xs glass rounded-full px-2.5 py-1 text-teal-200">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="btn-ghost w-full mt-4 text-sm"
        >
          Back
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
