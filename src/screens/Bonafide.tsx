import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export function BonafideScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'sent'>('email')
  const [email, setEmail] = useState('')
  const [college, setCollege] = useState('')

  const isValidEmail = email.endsWith('.edu.in') || email.endsWith('.ac.in')

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-ink-900 to-ink-950 pt-16">
      <div className="px-8 flex-1">
        {step === 'email' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg mb-6">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>

            <h1 className="font-display text-3xl font-bold mb-2">Verify you're a student</h1>
            <p className="text-ink-400 text-sm mb-8">
              We verify every member with their college email and a bonafide certificate. No fake profiles, ever.
            </p>

            <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2 block">College Name</label>
            <input
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g. IIT Bombay"
              className="w-full glass rounded-2xl px-4 py-4 mb-5 text-base placeholder:text-ink-500 outline-none focus:border-brand-400 transition-colors"
            />

            <label className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2 block">College Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@college.ac.in"
              className={`w-full glass rounded-2xl px-4 py-4 mb-3 text-base placeholder:text-ink-500 outline-none transition-colors ${
                email && !isValidEmail ? 'border-2 border-danger' : 'focus:border-brand-400'
              }`}
            />
            {email && !isValidEmail && (
              <p className="text-xs text-danger mb-3">Must end with .ac.in or .edu.in</p>
            )}

            <div className="glass rounded-2xl p-4 flex items-start gap-3 mt-4">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <p className="text-xs text-ink-300 leading-relaxed">
                After email verification, you'll upload your bonafide certificate for manual review (usually takes 24 hours).
              </p>
            </div>
          </motion.div>
        )}

        {step === 'sent' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-teal-500/30 animate-pulse-ring" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold mb-3">Verification email sent!</h1>
            <p className="text-ink-400 text-sm max-w-xs mb-2">
              We've sent a verification link to
            </p>
            <p className="text-brand-300 font-semibold mb-8">{email}</p>
            <p className="text-ink-400 text-xs max-w-xs">
              Tap the link in your email to confirm, then upload your bonafide certificate to start matching.
            </p>
          </motion.div>
        )}
      </div>

      <div className="px-8 pb-10">
        {step === 'email' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            disabled={!isValidEmail || !college}
            onClick={() => setStep('sent')}
            className={`w-full rounded-2xl py-4 font-semibold text-base transition-all duration-200 active:scale-[0.97] ${
              isValidEmail && college
                ? 'btn-primary'
                : 'bg-ink-800 text-ink-500 cursor-not-allowed'
            }`}
          >
            Send Verification
          </motion.button>
        )}
        {step === 'sent' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/vibe-quiz')}
            className="btn-primary w-full text-base"
          >
            Start Exploring
          </motion.button>
        )}
      </div>
    </div>
  )
}
