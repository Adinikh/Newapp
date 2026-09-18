import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { chatMessages, matches, type ChatMessage } from '../data/mock'
import { TypingIndicator } from '../components/Animations'

export function ChatRoomScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = matches.find((m) => m.id === id) || matches[0]
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages)
  const [input, setInput] = useState('')
  const [showSpark, setShowSpark] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg: ChatMessage = {
      id: `c${Date.now()}`,
      sender: 'me',
      text: input,
      time: 'now',
    }
    setMessages([...messages, newMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `r${Date.now()}`,
          sender: 'them',
          text: "That sounds perfect! Can't wait!",
          time: 'now',
        },
      ])
    }, 1800)
  }

  return (
    <div className="h-full flex flex-col bg-ink-950">
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 pt-12 pb-3 glass-strong border-b border-white/10">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </motion.button>
          <div className="relative">
            <img src={match.photo} alt={match.name} className="w-10 h-10 rounded-full object-cover" />
            {match.online && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-teal-400 border-2 border-ink-950"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{match.name}</span>
              {match.spark && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-[10px] text-gold-300 flex items-center gap-0.5 glass rounded-full px-2 py-0.5"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
                  Spark
                </motion.span>
              )}
            </div>
            <span className="text-[10px] text-teal-300">{match.online ? 'Active now' : 'Last seen 2h ago'}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/venues')}
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-300"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </motion.button>
        </div>

        {/* Safety banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 glass rounded-xl px-3 py-2"
        >
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-300 shrink-0"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          ><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></motion.svg>
          <span className="text-[11px] text-ink-300">Meet in Recipro-verified safe venues. Share your live location with a friend.</span>
        </motion.div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none px-4 py-4 space-y-3">
        {match.spark && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-2"
          >
            <div className="glass rounded-2xl px-4 py-2.5 flex items-center gap-2 max-w-[85%]">
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-gold-300"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></motion.svg>
              <span className="text-xs text-gold-200 font-medium">{match.spark}</span>
            </div>
          </motion.div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={msg.id} msg={msg} index={i} />
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-2">
                <motion.img
                  src={match.photo}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 z-30 px-4 pb-5 pt-2 glass-strong border-t border-white/10">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.85, rotate: -90 }}
            onClick={() => setShowSpark(true)}
            className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold-300"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            ><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></motion.svg>
          </motion.button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Message..."
            className="flex-1 glass rounded-full px-4 py-3 text-sm placeholder:text-ink-500 outline-none focus:border-brand-400 transition-colors"
          />
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              input.trim()
                ? 'bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow'
                : 'bg-ink-800 text-ink-600'
            }`}
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={input.trim() ? { x: [0, 3, 0], y: [0, -3, 0] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            ><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>
          </motion.button>
        </div>
      </div>

      {/* Spark suggestions */}
      <AnimatePresence>
        {showSpark && (
          <SparkSheet onClose={() => setShowSpark(false)} onPick={(text) => { setInput(text); setShowSpark(false) }} />
        )}
      </AnimatePresence>
    </div>
  )
}

function MessageBubble({ msg, index }: { msg: ChatMessage; index: number }) {
  const isMe = msg.sender === 'me'

  if (msg.type === 'venue' && msg.venue) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="max-w-[80%] glass rounded-2xl overflow-hidden"
        >
          <div className="relative h-32">
            <img src={msg.venue.image} alt={msg.venue.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
            {msg.venue.verified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                className="absolute top-2 right-2 glass-strong rounded-full px-2 py-1 flex items-center gap-1"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span className="text-[10px] font-semibold text-teal-300">Safe</span>
              </motion.div>
            )}
          </div>
          <div className="p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{msg.venue.name}</span>
              <div className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span className="text-xs font-semibold">{msg.venue.rating}</span>
              </div>
            </div>
            <p className="text-xs text-ink-400 mb-2">{msg.venue.address}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {msg.venue.tags.map((tag) => (
                <span key={tag} className="text-[10px] glass rounded-full px-2 py-0.5 text-teal-200">{tag}</span>
              ))}
            </div>
            <button className="w-full bg-brand-500/20 text-brand-300 rounded-xl py-2 text-xs font-semibold active:scale-95 transition-transform">
              View on Map
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, type: 'spring', stiffness: 300, damping: 25 }}
      className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
          isMe
            ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white rounded-br-md'
            : 'glass text-ink-50 rounded-bl-md'
        }`}
      >
        <p className="leading-relaxed">{msg.text}</p>
        <span className={`text-[10px] mt-1 block ${isMe ? 'text-white/60' : 'text-ink-500'}`}>{msg.time}</span>
      </motion.div>
    </motion.div>
  )
}

function SparkSheet({ onClose, onPick }: { onClose: () => void; onPick: (text: string) => void }) {
  const suggestions = [
    "What's your favorite indie band right now?",
    "If you could travel anywhere tomorrow, where would you go?",
    "Coffee or chai? This is important.",
    "What's the best thing that happened to you this week?",
  ]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 z-50 bg-ink-950/80 backdrop-blur-sm flex items-end"
    >
      <motion.div
        initial={{ y: 400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 400, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full glass-strong rounded-t-4xl p-6 pb-8"
      >
        <div className="w-12 h-1.5 rounded-full bg-ink-600 mx-auto mb-5" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300"><path d="M12 3l1.9 5.8a2 2 0 001.3 1.3L21 12l-5.8 1.9a2 2 0 00-1.3 1.3L12 21l-1.9-5.8a2 2 0 00-1.3-1.3L3 12l5.8-1.9a2 2 0 001.3-1.3L12 3z"/></svg>
          </motion.div>
          <h3 className="font-display text-lg font-semibold">AI Icebreakers</h3>
        </motion.div>
        <p className="text-xs text-ink-400 mb-4">Suggested by your AI Wingman based on both your profiles</p>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <motion.button
              key={s}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onPick(s)}
              className="w-full text-left glass rounded-2xl px-4 py-3 text-sm text-ink-100 transition-transform hover:border-brand-400/50"
            >
              {s}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
