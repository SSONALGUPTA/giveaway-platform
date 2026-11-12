/**
 * Standard Mock Seed Data strictly matching VELOOP Specification and Assets
 */
import iphoneImg from '../assets/iphone.png';
import smartwatchImg from '../assets/smartwatch.png';
import earpodsImg from '../assets/earpodes.png';
import voucher2000Img from '../assets/voucher-2000.png';
import voucher500Img from '../assets/voucher-500.png';
import voucher200Img from '../assets/voucher-200.png';
import gift1Img from '../assets/gift1.png';
import gift2Img from '../assets/gift2.png';

export { gift1Img, gift2Img };

export const MOCK_GIVEAWAYS = [
  {
    id: 'b0000000-0000-0000-0000-000000000001',
    slug: 'summer-rewards-2026',
    title: 'Giveaway Section',
    subtitle: 'EXCLUSIVE GIVEAWAYS',
    description: 'Join exciting giveaways, complete simple tasks and win amazing rewards from VELoop Rewards.',
    tagline: '✦ More participation, more chances to win! ✦',
    status: 'ACTIVE',
    startAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endAt: new Date(Date.now() + (12 * 24 * 60 * 60 * 1000) + (8 * 60 * 60 * 1000) + (45 * 60 * 1000)).toISOString(),
    totalGiveawaysCount: 24,
    totalParticipants: 8500,
    prizesWon: 1200,
    rules: [
      { id: 'r1', title: 'Eligibility', content: 'Open to all registered VELOOP Rewards members aged 18 and above with verified email.' },
      { id: 'r2', title: 'Participation Rules', content: 'Each user may submit strictly one confirmed entry per giveaway event. Multi-accounting is prohibited.' },
      { id: 'r3', title: 'Entry Currency', content: 'Entry fees are paid via VEs, SVEs, or Tokens according to the prize specification.' },
      { id: 'r4', title: 'Winner Selection', content: 'Winners are chosen using an audited backend random selection process after the countdown concludes.' },
      { id: 'r5', title: 'Claim Window', content: 'Winners must submit prize claim details within 7 days of announcement. Unclaimed prizes expire.' },
      { id: 'r6', title: 'Disqualification & Fraud Policy', content: 'Automated scripts, duplicate accounts, or proxy manipulation will result in permanent disqualification.' }
    ],
    faqs: [
      { q: 'How do I participate in the giveaway?', a: 'Sign in to your VELOOP Rewards account, select your desired prize, confirm your available balance, and submit your entry.' },
      { q: 'How are winners selected?', a: 'All entries are cryptographically hashed and winners are drawn through our automated server-side selection engine once the timer ends.' },
      { q: 'When are winners announced?', a: 'Immediately after the active countdown ends and backend verification completes.' },
      { q: 'What happens if I win?', a: 'You will receive a notification and a prominent claim banner will appear on this page to claim your physical or digital reward.' },
      { q: 'Can I participate in multiple giveaways?', a: 'Yes! You can enter different giveaway events, but only one participation is permitted per unique event.' }
    ]
  },
  {
    id: 'b0000000-0000-0000-0000-000000000002',
    slug: 'august-reward-rush-2026',
    title: 'August Reward Rush',
    subtitle: 'PREVIOUS GIVEAWAY',
    description: 'Our previous flagship rewards event with over 14,000 participants across India.',
    status: 'ENDED',
    startAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    endAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    totalGiveawaysCount: 18,
    totalParticipants: 14200,
    prizesWon: 1200
  }
];

export const MOCK_PRIZES = [
  {
    id: 'c0000000-0000-0000-0000-000000000001',
    giveawayId: 'b0000000-0000-0000-0000-000000000001',
    slug: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    subname: 'Latest iPhone 15 Pro 128GB',
    position: 1,
    positionLabel: '1st Prize',
    badgeLabel: '1st Prize',
    badgeColor: '#f59e0b',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    themeColor: '#8b5cf6',
    btnGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    type: 'PHYSICAL',
    description: 'Latest iPhone 15 Pro featuring aerospace-grade titanium design and revolutionary A17 Pro chip.',
    imageUrl: iphoneImg,
    entryFee: 250,
    entryCurrency: 'VE',
    winnerCount: 1, // Spec section 20: There should be only one winner for the iPhone/1st prize
    valueDisplay: '₹1,34,900',
    participantsCount: 2300,
    remainingTime: '12d : 08h : 45m left'
  },
  {
    id: 'c0000000-0000-0000-0000-000000000002',
    giveawayId: 'b0000000-0000-0000-0000-000000000001',
    slug: 'apple-watch',
    name: 'Apple Watch Series 9',
    subname: 'Latest Apple Watch Series 9',
    position: 2,
    positionLabel: '2nd Prize',
    badgeLabel: '2nd Prize',
    badgeColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    themeColor: '#3b82f6',
    btnGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    type: 'PHYSICAL',
    description: 'Advanced health sensors, Double Tap magic gesture, and Always-On bright display.',
    imageUrl: smartwatchImg,
    entryFee: 200,
    entryCurrency: 'VE',
    winnerCount: 3,
    valueDisplay: '₹41,900',
    participantsCount: 1800,
    remainingTime: '9d : 06h : 30m left'
  },
  {
    id: 'c0000000-0000-0000-0000-000000000003',
    giveawayId: 'b0000000-0000-0000-0000-000000000001',
    slug: 'airpods',
    name: 'AirPods Pro 2',
    subname: 'Active Noise Cancellation',
    position: 3,
    positionLabel: '3rd Prize',
    badgeLabel: '3rd Prize',
    badgeColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    themeColor: '#10b981',
    btnGradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    type: 'PHYSICAL',
    description: 'Up to 2x more Active Noise Cancellation and Adaptive Audio for immersive sound.',
    imageUrl: earpodsImg,
    entryFee: 500,
    entryCurrency: 'SVE', // Spec section 85: AirPods requires 500 SVEs
    winnerCount: 5,
    valueDisplay: '₹24,900',
    participantsCount: 3100,
    remainingTime: '7d : 09h : 20m left'
  },
  {
    id: 'c0000000-0000-0000-0000-000000000004',
    giveawayId: 'b0000000-0000-0000-0000-000000000001',
    slug: 'amazon-2000',
    name: 'Amazon Gift Card',
    subname: '₹2,000 Amazon Gift Card',
    position: 4,
    positionLabel: 'Lucky Draw',
    badgeLabel: 'Lucky Draw',
    badgeColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    themeColor: '#f97316',
    btnGradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
    type: 'GIFT_CARD',
    description: 'Instant shopping voucher code sent directly to your verified email address.',
    imageUrl: voucher2000Img,
    entryFee: 500,
    entryCurrency: 'VE',
    winnerCount: 10,
    valueDisplay: '₹2,000',
    participantsCount: 1300,
    remainingTime: '5d : 12h : 15m left'
  },
  {
    id: 'c0000000-0000-0000-0000-000000000005',
    giveawayId: 'b0000000-0000-0000-0000-000000000001',
    slug: 'amazon-500',
    name: 'Amazon ₹500 Voucher',
    subname: '₹500 Amazon Gift Card',
    position: 5,
    positionLabel: 'Lucky Draw',
    badgeLabel: 'Lucky Draw',
    badgeColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    themeColor: '#f97316',
    btnGradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
    type: 'GIFT_CARD',
    description: 'Redeemable on millions of products across the Amazon store.',
    imageUrl: voucher500Img,
    entryFee: 300,
    entryCurrency: 'VE',
    winnerCount: 15,
    valueDisplay: '₹500',
    participantsCount: 1980,
    remainingTime: '4d : 10h : 00m left'
  },
  {
    id: 'c0000000-0000-0000-0000-000000000006',
    giveawayId: 'b0000000-0000-0000-0000-000000000001',
    slug: 'amazon-20',
    name: 'Amazon ₹20 Voucher',
    subname: '₹20 Quick Reward Voucher',
    position: 6,
    positionLabel: 'Community Draw',
    badgeLabel: 'Community Draw',
    badgeColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    themeColor: '#06b6d4',
    btnGradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    type: 'GIFT_CARD',
    description: 'Low-threshold entry for regular reward token holders.',
    imageUrl: voucher200Img,
    entryFee: 2000,
    entryCurrency: 'TOKEN', // Spec section 85: ₹20 Voucher requires 2,000 Tokens
    winnerCount: 50,
    valueDisplay: '₹20',
    participantsCount: 3200,
    remainingTime: '3d : 08h : 30m left'
  }
];

export const MOCK_PREVIOUS_WINNERS = [
  {
    id: 'w1',
    userId: 'VE10082',
    maskedDisplay: 'VE****82',
    prizeName: 'iPhone 15 Pro',
    giveawayName: 'August Reward Rush',
    date: '05 Aug 2026',
    prizeCategory: 'Electronics',
    status: 'Delivered ✓'
  },
  {
    id: 'w2',
    userId: 'VE10042',
    maskedDisplay: 'VE****42',
    prizeName: 'Apple Watch Series 9',
    giveawayName: 'Summer Rewards',
    date: '06 Aug 2026',
    prizeCategory: 'Wearables',
    status: 'Delivered ✓'
  },
  {
    id: 'w3',
    userId: 'VE10091',
    maskedDisplay: 'VE****91',
    prizeName: 'AirPods Pro 2',
    giveawayName: 'August Reward Rush',
    date: '10 Aug 2026',
    prizeCategory: 'Audio',
    status: 'Delivered ✓'
  },
  {
    id: 'w4',
    userId: 'VE10027',
    maskedDisplay: 'VE****27',
    prizeName: '₹2,000 Amazon Gift Card',
    giveawayName: 'August Reward Rush',
    date: '10 Aug 2026',
    prizeCategory: 'Gift Cards',
    status: 'Delivered ✓'
  },
  {
    id: 'w5',
    userId: 'VE10054',
    maskedDisplay: 'VE****54',
    prizeName: 'AirPods Pro 2',
    giveawayName: 'Independence Rewards',
    date: '15 Aug 2026',
    prizeCategory: 'Audio',
    status: 'Delivered ✓'
  },
  {
    id: 'w6',
    userId: 'VE10092',
    maskedDisplay: 'VE****92',
    prizeName: 'Amazon Gift Card',
    giveawayName: 'Independence Rewards',
    date: '15 Aug 2026',
    prizeCategory: 'Gift Cards',
    status: 'Delivered ✓'
  }
];

export const MOCK_WINNER_SLIDER_ITEMS = [
  { id: 's1', message: 'User VE****21 won an iPhone 15 Pro!' },
  { id: 's2', message: 'Another lucky participant VE****83 won an Apple Watch!' },
  { id: 's3', message: 'Participant VE****54 won AirPods Pro 2!' },
  { id: 's4', message: 'Someone VE****92 won an Amazon Gift Card!' },
  { id: 's5', message: 'User VE****42 won Apple Watch Series 9!' },
  { id: 's6', message: 'Participant VE****82 won an iPhone 15 Pro!' }
];

export const DEMO_USERS = {
  VISITOR: null,
  ELIGIBLE_USER: {
    id: 'a0000000-0000-0000-0000-000000000001',
    userId: 'VE10025',
    displayName: 'Rahul Sharma',
    maskedId: 'VE****25',
    email: 'rahul@example.com',
    veBalance: 850,
    sveBalance: 1200,
    tokenBalance: 5000,
    participatedPrizes: []
  },
  INSUFFICIENT_BALANCE_USER: {
    id: 'a0000000-0000-0000-0000-000000000002',
    userId: 'VE10012',
    displayName: 'Priya Patel',
    maskedId: 'VE****12',
    email: 'priya@example.com',
    veBalance: 120, // Insufficient for iPhone (250) or Apple Watch (200)
    sveBalance: 150, // Insufficient for AirPods (500)
    tokenBalance: 500, // Insufficient for ₹20 voucher (2,000)
    participatedPrizes: []
  },
  PARTICIPATING_USER: {
    id: 'a0000000-0000-0000-0000-000000000004',
    userId: 'VE10091',
    displayName: 'Ananya Roy',
    maskedId: 'VE****91',
    email: 'ananya@example.com',
    veBalance: 600,
    sveBalance: 700,
    tokenBalance: 3000,
    participatedPrizes: ['c0000000-0000-0000-0000-000000000001'],
    entriesCount: 24
  },
  WINNER_USER: {
    id: 'a0000000-0000-0000-0000-000000000003',
    userId: 'VE10082',
    displayName: 'Aman Verma',
    maskedId: 'VE****82',
    email: 'aman@example.com',
    veBalance: 500,
    sveBalance: 1000,
    tokenBalance: 4000,
    participatedPrizes: ['c0000000-0000-0000-0000-000000000002'],
    wonPrize: {
      id: 'c0000000-0000-0000-0000-000000000002',
      name: 'Apple Watch Series 9',
      type: 'PHYSICAL',
      claimDeadline: '7 days',
      status: 'NOT_SUBMITTED'
    }
  },
  GIFT_CARD_WINNER: {
    id: 'a0000000-0000-0000-0000-000000000006',
    userId: 'VE10099',
    displayName: 'Karan Mehra',
    maskedId: 'VE****99',
    email: 'karan@example.com',
    veBalance: 450,
    sveBalance: 800,
    tokenBalance: 2500,
    wonPrize: {
      id: 'c0000000-0000-0000-0000-000000000004',
      name: '₹2,000 Amazon Gift Card',
      type: 'GIFT_CARD',
      claimDeadline: '14 days',
      status: 'NOT_SUBMITTED'
    }
  }
};
