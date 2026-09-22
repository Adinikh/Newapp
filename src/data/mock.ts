export type VibeType = 'Explorer' | 'Homebody' | 'Creator' | 'Hustler' | 'Dreamer' | 'Socialite'

export interface Profile {
  id: string
  name: string
  age: number
  college: string
  year: string
  bio: string
  photos: string[]
  interests: string[]
  spark: string
  distance: string
  verified: boolean
  vibe: VibeType
  greenFlags: string[]
  compatibility: number
  traits: { label: string; value: number }[]
}

export const profiles: Profile[] = [
  {
    id: 'p1',
    name: 'Ananya',
    age: 20,
    college: 'NIFT Delhi',
    year: '3rd Year',
    bio: 'Design student who lives for sunsets & filter coffee. Looking for someone to explore art exhibitions with.',
    photos: [
      'https://images.pexels.com/photos/36608621/pexels-photo-36608621.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/31868218/pexels-photo-31868218.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    interests: ['Sketching', 'Indie Music', 'Photography', 'Trekking'],
    spark: 'You both love indie music and have been to the same concert venue last month!',
    distance: '1.2 km away',
    verified: true,
    vibe: 'Creator',
    greenFlags: [' Replies within 10 min', ' Loves deep conversations', ' Has a 5-year plan'],
    compatibility: 92,
    traits: [
      { label: 'Adventure', value: 78 },
      { label: 'Creativity', value: 95 },
      { label: 'Social', value: 60 },
      { label: 'Chill', value: 72 },
    ],
  },
  {
    id: 'p2',
    name: 'Arjun',
    age: 22,
    college: 'BITS Pilani',
    year: 'Final Year',
    bio: 'Tech enthusiast & campus cricket captain. Coffee addict. Will debate you on startups vs jobs.',
    photos: [
      'https://images.pexels.com/photos/15237427/pexels-photo-15237427.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/15237364/pexels-photo-15237364.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    interests: ['Cricket', 'Startups', 'Coding', 'Chess'],
    spark: 'You both follow the same startup podcast and love chess!',
    distance: '2.8 km away',
    verified: true,
    vibe: 'Hustler',
    greenFlags: [' Ambitious & driven', ' Plans dates in advance', ' Great listener'],
    compatibility: 85,
    traits: [
      { label: 'Adventure', value: 65 },
      { label: 'Creativity', value: 50 },
      { label: 'Social', value: 82 },
      { label: 'Chill', value: 45 },
    ],
  },
  {
    id: 'p3',
    name: 'Diya',
    age: 19,
    college: 'Lady Shri Ram College',
    year: '2nd Year',
    bio: 'Literature nerd. Poetry readings are my therapy. Let me take you to the best chai tapri on campus.',
    photos: [
      'https://images.pexels.com/photos/5538605/pexels-photo-5538605.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/5538007/pexels-photo-5538007.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    interests: ['Poetry', 'Book Clubs', 'Debate', 'Baking'],
    spark: 'You both are in the same campus book club!',
    distance: '0.8 km away',
    verified: true,
    vibe: 'Dreamer',
    greenFlags: [' Writes handwritten notes', ' Remembers the little things', ' Emotionally intelligent'],
    compatibility: 88,
    traits: [
      { label: 'Adventure', value: 55 },
      { label: 'Creativity', value: 88 },
      { label: 'Social', value: 68 },
      { label: 'Chill', value: 85 },
    ],
  },
  {
    id: 'p4',
    name: 'Kabir',
    age: 21,
    college: 'IIT Bombay',
    year: '4th Year',
    bio: 'Music producer by night, engineering student by day. Looking for concert buddies who actually know good music.',
    photos: [
      'https://images.pexels.com/photos/29527651/pexels-photo-29527651.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/10571218/pexels-photo-10571218.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    interests: ['Music Production', 'Guitar', 'Football', 'Films'],
    spark: 'You both play guitar and love the same indie band!',
    distance: '3.5 km away',
    verified: true,
    vibe: 'Creator',
    greenFlags: [' Passionate about his craft', ' Introduces you to new music', ' Low-drama vibes'],
    compatibility: 79,
    traits: [
      { label: 'Adventure', value: 70 },
      { label: 'Creativity', value: 92 },
      { label: 'Social', value: 55 },
      { label: 'Chill', value: 78 },
    ],
  },
  {
    id: 'p5',
    name: 'Sara',
    age: 20,
    college: 'Christ University',
    year: '3rd Year',
    bio: 'Psychology major. Dog lover. Weekend trekker. I will psychoanalyze you but in a fun way, promise.',
    photos: [
      'https://images.pexels.com/photos/5538020/pexels-photo-5538020.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/6238271/pexels-photo-6238271.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    interests: ['Psychology', 'Dogs', 'Trekking', 'Coffee'],
    spark: 'You both volunteer at the same animal shelter!',
    distance: '1.5 km away',
    verified: true,
    vibe: 'Explorer',
    greenFlags: [' Dog mom energy', ' Initiates plans', ' Great communicator'],
    compatibility: 90,
    traits: [
      { label: 'Adventure', value: 92 },
      { label: 'Creativity', value: 70 },
      { label: 'Social', value: 85 },
      { label: 'Chill', value: 60 },
    ],
  },
  {
    id: 'p6',
    name: 'Rohan',
    age: 23,
    college: 'Delhi University',
    year: 'Final Year',
    bio: 'Photographer & foodie. I know every hidden food joint in the city. Swipe right if you love biryani debates.',
    photos: [
      'https://images.pexels.com/photos/16476674/pexels-photo-16476674.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
      'https://images.pexels.com/photos/12487857/pexels-photo-12487857.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    ],
    interests: ['Photography', 'Food', 'Travel', 'Football'],
    spark: 'You both follow the same food blogger and love biryani!',
    distance: '4.2 km away',
    verified: true,
    vibe: 'Socialite',
    greenFlags: [' Knows the best food spots', ' Makes you laugh', ' Friends with everyone'],
    compatibility: 82,
    traits: [
      { label: 'Adventure', value: 85 },
      { label: 'Creativity', value: 75 },
      { label: 'Social', value: 95 },
      { label: 'Chill', value: 68 },
    ],
  },
]

export interface VibeQuestion {
  id: string
  question: string
  emoji: string
  options: { text: string; vibe: VibeType; emoji: string }[]
}

export const vibeQuestions: VibeQuestion[] = [
  {
    id: 'vq1',
    question: 'Your ideal Sunday looks like...',
    emoji: '☀️',
    options: [
      { text: 'Sunrise trek & breakfast at a new cafe', vibe: 'Explorer', emoji: '🏔️' },
      { text: 'Blanket, books & endless chai', vibe: 'Homebody', emoji: '📚' },
      { text: 'Painting or writing something new', vibe: 'Creator', emoji: '🎨' },
      { text: 'Planning next week & side projects', vibe: 'Hustler', emoji: '💼' },
    ],
  },
  {
    id: 'vq2',
    question: 'At a party, you are...',
    emoji: '🎉',
    options: [
      { text: 'Talking to everyone on the dance floor', vibe: 'Socialite', emoji: '🕺' },
      { text: 'Deep conversation in the balcony', vibe: 'Dreamer', emoji: '🌙' },
      { text: 'Checking out the music setup', vibe: 'Creator', emoji: '🎧' },
      { text: 'Home. Parties are not my thing.', vibe: 'Homebody', emoji: '🏠' },
    ],
  },
  {
    id: 'vq3',
    question: 'What makes someone instantly attractive?',
    emoji: '✨',
    options: [
      { text: 'Passion for what they do', vibe: 'Creator', emoji: '🔥' },
      { text: 'Ambition & a plan', vibe: 'Hustler', emoji: '🚀' },
      { text: 'Kindness & emotional depth', vibe: 'Dreamer', emoji: '💛' },
      { text: 'Spontaneity & adventure', vibe: 'Explorer', emoji: '🧭' },
    ],
  },
  {
    id: 'vq4',
    question: 'Your love language is...',
    emoji: '💌',
    options: [
      { text: 'Quality time, just us', vibe: 'Homebody', emoji: '🛋️' },
      { text: 'Surprise adventures together', vibe: 'Explorer', emoji: '🗺️' },
      { text: 'Words of affirmation', vibe: 'Dreamer', emoji: '💬' },
      { text: 'Showing up for your goals', vibe: 'Hustler', emoji: '🤝' },
    ],
  },
]

export interface Match {
  id: string
  name: string
  photo: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  spark?: string
}

export const matches: Match[] = [
  {
    id: 'm1',
    name: 'Ananya',
    photo: 'https://images.pexels.com/photos/36608621/pexels-photo-36608621.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    lastMessage: 'That art exhibition sounds amazing! When are we going?',
    time: '2m',
    unread: 2,
    online: true,
    spark: 'You both love indie music!',
  },
  {
    id: 'm2',
    name: 'Kabir',
    photo: 'https://images.pexels.com/photos/29527651/pexels-photo-29527651.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    lastMessage: 'I found us tickets to the Pinegrove show next Saturday',
    time: '15m',
    unread: 1,
    online: true,
    spark: 'You both play guitar!',
  },
  {
    id: 'm3',
    name: 'Diya',
    photo: 'https://images.pexels.com/photos/5538605/pexels-photo-5538605.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    lastMessage: 'Chai tapri at 5? I found a new one near the library',
    time: '1h',
    unread: 0,
    online: false,
    spark: 'Same campus book club!',
  },
  {
    id: 'm4',
    name: 'Rohan',
    photo: 'https://images.pexels.com/photos/16476674/pexels-photo-16476674.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    lastMessage: 'You have to try this biryani place in Old Delhi',
    time: '3h',
    unread: 0,
    online: false,
  },
  {
    id: 'm5',
    name: 'Sara',
    photo: 'https://images.pexels.com/photos/5538020/pexels-photo-5538020.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    lastMessage: 'Trek this Sunday? I found a beautiful trail',
    time: '5h',
    unread: 0,
    online: true,
  },
]

export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
  type?: 'text' | 'venue' | 'spark'
  venue?: Venue
}

export interface Venue {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  image: string
  tags: string[]
  verified: boolean
  hours: string
}

export const chatMessages: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'them',
    text: 'Hey! I saw we both love indie music — what are you listening to these days?',
    time: '4:02 PM',
  },
  {
    id: 'c2',
    sender: 'me',
    text: 'Oh hey! Been on a big Pinegrove kick lately. You?',
    time: '4:05 PM',
  },
  {
    id: 'c3',
    sender: 'them',
    text: 'No way, I literally just got tickets to their show next Saturday! You should come!',
    time: '4:06 PM',
  },
  {
    id: 'c4',
    sender: 'me',
    text: 'I would love that. Where is it?',
    time: '4:08 PM',
  },
  {
    id: 'c5',
    sender: 'them',
    text: "It's at this cool venue in Hauz Khas. Want me to share the details?",
    time: '4:09 PM',
  },
  {
    id: 'c6',
    sender: 'me',
    text: 'Yes please!',
    time: '4:10 PM',
  },
  {
    id: 'c7',
    sender: 'them',
    text: 'Here you go — this place is Recipro-verified safe too!',
    time: '4:11 PM',
    type: 'venue',
    venue: {
      id: 'v1',
      name: 'The Piano Man Jazz Club',
      address: 'Hauz Khas Village, New Delhi',
      distance: '3.2 km',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/36484101/pexels-photo-36484101.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
      tags: ['Live Music', 'Safe for Women', 'Well-Lit'],
      verified: true,
      hours: '6 PM - 1 AM',
    },
  },
]

export const safeVenues: Venue[] = [
  {
    id: 'v1',
    name: 'The Piano Man Jazz Club',
    address: 'Hauz Khas Village, New Delhi',
    distance: '3.2 km',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/36484101/pexels-photo-36484101.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    tags: ['Live Music', 'Safe for Women', 'Well-Lit'],
    verified: true,
    hours: '6 PM - 1 AM',
  },
  {
    id: 'v2',
    name: 'Blue Tokai Coffee Roasters',
    address: 'Saket, New Delhi',
    distance: '1.8 km',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/39047893/pexels-photo-39047893.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    tags: ['Quiet', 'Good for First Meet', 'CCTV'],
    verified: true,
    hours: '8 AM - 11 PM',
  },
  {
    id: 'v3',
    name: 'Cha Bar by Oxford Bookstore',
    address: 'Connaught Place, New Delhi',
    distance: '4.5 km',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/11696469/pexels-photo-11696469.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    tags: ['Bookstore Cafe', 'Crowded', 'Central'],
    verified: true,
    hours: '10 AM - 10 PM',
  },
  {
    id: 'v4',
    name: 'Social Offline',
    address: 'Hauz Khas Village, New Delhi',
    distance: '3.0 km',
    rating: 4.4,
    image: 'https://images.pexels.com/photos/37838325/pexels-photo-37838325.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    tags: ['Trendy', 'Group Friendly', 'Safe'],
    verified: true,
    hours: '12 PM - 1 AM',
  },
]

export const wingmanTips = [
  {
    id: 't1',
    title: 'Ananya loves indie music',
    text: 'She mentioned Pinegrove in her bio. The Piano Man has a live indie night this Saturday — suggest it as a first date venue.',
    icon: 'music',
  },
  {
    id: 't2',
    title: 'Keep it light',
    text: 'Your last 3 conversations fizzled after 4 messages. Try asking an open-ended question about her photography hobby.',
    icon: 'message',
  },
  {
    id: 't3',
    title: 'Safe venue suggestion ready',
    text: 'Blue Tokai in Saket is 1.8 km from both of you and is Recipro-verified safe. Great for a coffee first meet.',
    icon: 'map',
  },
]
