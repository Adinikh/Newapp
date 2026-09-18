import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { matches } from '../data/mock'
import { BottomNav } from '../components/PhoneFrame'

export function ChatsScreen() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col bg-ink-950">
      <div className="sticky top-0 z-30 px-5 pt-14 pb-3 glass-strong">
        <h1 className="font-display text-2xl font-bold">Chats</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 pb-4">
        <div className="space-y-2">
          {matches.map((m, i) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
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
                <span className="font-semibold text-sm">{m.name}</span>
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
