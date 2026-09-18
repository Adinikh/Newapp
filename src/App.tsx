import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { OnboardingScreen } from './screens/Onboarding'
import { PhoneLoginScreen } from './screens/PhoneLogin'
import { OtpScreen } from './screens/Otp'
import { BonafideScreen } from './screens/Bonafide'
import { DiscoverScreen } from './screens/Discover'
import { MatchesScreen } from './screens/Matches'
import { ChatsScreen } from './screens/Chats'
import { ChatRoomScreen } from './screens/ChatRoom'
import { WingmanScreen } from './screens/Wingman'
import { SafeVenuesScreen } from './screens/SafeVenues'
import { ProfileScreen } from './screens/Profile'

export default function App() {
  const location = useLocation()
  return (
    <PhoneFrame>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/login" element={<PhoneLoginScreen />} />
          <Route path="/otp" element={<OtpScreen />} />
          <Route path="/bonafide" element={<BonafideScreen />} />
          <Route path="/discover" element={<DiscoverScreen />} />
          <Route path="/matches" element={<MatchesScreen />} />
          <Route path="/chats" element={<ChatsScreen />} />
          <Route path="/chat/:id" element={<ChatRoomScreen />} />
          <Route path="/wingman" element={<WingmanScreen />} />
          <Route path="/venues" element={<SafeVenuesScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </PhoneFrame>
  )
}
