import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export function PhoneLoginScreen() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')

  const isValid = phone.length === 10

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-ink-900 to-ink-950 pt-16">
      <div className="px-8 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          </div>

          <h1 className="font-display text-3xl font-bold mb-2">Enter your number</h1>
          <p className="text-ink-400 text-sm mb-8">We'll send you a verification code via SMS</p>

          <div className="flex gap-3 mb-6">
            <div className="glass rounded-2xl px-4 py-4 flex items-center gap-2 w-24">
              <span className="text-lg">🇮🇳</span>
              <span className="font-semibold text-sm">{countryCode}</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="98765 43210"
              className="flex-1 glass rounded-2xl px-4 py-4 text-lg font-semibold placeholder:text-ink-500 outline-none focus:border-brand-400 transition-colors"
              inputMode="numeric"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-ink-400 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            <span>Your number is encrypted and never shared</span>
          </div>
        </motion.div>
      </div>

      <div className="px-8 pb-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          disabled={!isValid}
          onClick={() => navigate('/otp')}
          className={`w-full rounded-2xl py-4 font-semibold text-base transition-all duration-200 active:scale-[0.97] ${
            isValid
              ? 'btn-primary'
              : 'bg-ink-800 text-ink-500 cursor-not-allowed'
          }`}
        >
          Send OTP
        </motion.button>
      </div>
    </div>
  )
}
