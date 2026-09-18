import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export function OtpScreen() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', ''])
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 3) refs.current[i + 1]?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const complete = otp.every((d) => d !== '')

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-ink-900 to-ink-950 pt-16">
      <div className="px-8 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>

          <h1 className="font-display text-3xl font-bold mb-2">Verify your number</h1>
          <p className="text-ink-400 text-sm mb-8">
            Enter the 4-digit code sent to <span className="text-ink-100 font-semibold">+91 98765 43210</span>
          </p>

          <div className="flex gap-4 mb-8">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                className={`w-16 h-20 rounded-2xl text-center text-3xl font-bold outline-none transition-all duration-200 ${
                  digit
                    ? 'bg-brand-500/20 border-2 border-brand-400 text-brand-200'
                    : 'glass border-2 border-transparent text-ink-50 focus:border-brand-400'
                }`}
              />
            ))}
          </div>

          <button className="text-sm text-brand-400 font-semibold flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12a9 9 0 0118 0M3 12a9 9 0 009 9M3 12h9M12 3v9"/></svg>
            Resend code in 0:42
          </button>
        </motion.div>
      </div>

      <div className="px-8 pb-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          disabled={!complete}
          onClick={() => navigate('/bonafide')}
          className={`w-full rounded-2xl py-4 font-semibold text-base transition-all duration-200 active:scale-[0.97] ${
            complete
              ? 'btn-primary'
              : 'bg-ink-800 text-ink-500 cursor-not-allowed'
          }`}
        >
          Verify
        </motion.button>
      </div>
    </div>
  )
}
