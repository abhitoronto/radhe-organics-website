export const WAITLIST_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeBLb8dglpulu8sY6JkWU5ZmDutrUFch4GF5a4gLCO33RnJsQ/viewform?usp=header'
export const WAITLIST_FORM_DISPLAY =
  'docs.google.com/forms/d/e/1FAIpQLSeBLb8dglpulu8sY6JkWU5ZmDutrUFch4GF5a4gLCO33RnJsQ/viewform'
export const LOCATION_URL = 'https://q.me-qr.com/b8qanuv9'
export const INSTAGRAM_URL = 'https://www.instagram.com/radhe_organics_/'
export const INSTAGRAM_HANDLE = '@radhe_organics_'
export const ADDRESS = 'Radhe Organics, Baddowal Pamal Link Road, Ludhiana – 142021'

export const PHONES = [
  { display: '+91 84370 10525', tel: '+918437010525', whatsapp: '918437010525' },
  { display: '+91 99105 54833', tel: '+919910554833', whatsapp: '919910554833' },
]

export const NAV_LINKS = [
  { href: '#why', label: 'Why us' },
  { href: '#how', label: 'How it works' },
  { href: '#harvest', label: 'Harvest' },
  { href: '#plans', label: 'Plans' },
  { href: '#farm', label: 'The farm' },
  { href: '#faq', label: 'FAQ' },
]

export type Veg = { en: string; hi?: string; emoji: string }
export type HarvestCategory = { id: string; title: string; emoji: string; items: Veg[] }

export const HARVEST: HarvestCategory[] = [
  {
    id: 'roots',
    title: 'Root Vegetables',
    emoji: '🥕',
    items: [
      { en: 'Carrot', hi: 'Gajar', emoji: '🥕' },
      { en: 'Black Carrot', hi: 'Kaali Gajar', emoji: '🥕' },
      { en: 'Radish', hi: 'Mooli', emoji: '🌱' },
      { en: 'Red Round Radish', hi: 'Laal Mooli', emoji: '🌱' },
      { en: 'Turnip', hi: 'Shalgam', emoji: '🌱' },
      { en: 'Beetroot', hi: 'Chukandar', emoji: '🌱' },
      { en: 'Potato', hi: 'Aloo', emoji: '🥔' },
    ],
  },
  {
    id: 'favourites',
    title: 'Winter Favourites',
    emoji: '🥦',
    items: [
      { en: 'Green Peas', hi: 'Matar', emoji: '🫛' },
      { en: 'Cauliflower', hi: 'Phool Gobi', emoji: '🥦' },
      { en: 'Broccoli', hi: 'Hari Phool Gobi', emoji: '🥦' },
      { en: 'Cabbage', hi: 'Band Gobi', emoji: '🥬' },
      { en: 'Purple Cabbage', hi: 'Laal Band Gobi', emoji: '🥬' },
      { en: 'Spring Onion', hi: 'Hara Pyaaz', emoji: '🧅' },
      { en: 'Garlic', hi: 'Lehsun', emoji: '🧄' },
    ],
  },
  {
    id: 'greens',
    title: 'Leafy Greens',
    emoji: '🥬',
    items: [
      { en: 'Spinach', hi: 'Palak', emoji: '🥬' },
      { en: 'Fenugreek', hi: 'Methi', emoji: '🌿' },
      { en: 'Mustard Greens', hi: 'Sarson', emoji: '🌼' },
      { en: 'Bathua', hi: 'Pigweed', emoji: '🌱' },
      { en: 'Lettuce', hi: 'Salad Patta', emoji: '🥗' },
    ],
  },
  {
    id: 'garden',
    title: 'Garden Vegetables',
    emoji: '🍆',
    items: [
      { en: 'Brinjal', hi: 'Baingan', emoji: '🍆' },
      { en: 'Cucumber', hi: 'Kheera', emoji: '🥒' },
      { en: 'French Beans', hi: 'Hari Phalian', emoji: '🫛' },
      { en: 'Zucchini', hi: 'Hari Toori', emoji: '🥒' },
      { en: 'Green Capsicum', hi: 'Shimla Mirch', emoji: '🫑' },
      { en: 'Tomato', hi: 'Tamatar', emoji: '🍅' },
    ],
  },
  {
    id: 'herbs',
    title: 'Fresh Herbs',
    emoji: '🌿',
    items: [
      { en: 'Coriander', hi: 'Dhaniya', emoji: '🌿' },
      { en: 'Kasuri Methi', hi: 'Fenugreek', emoji: '🍃' },
    ],
  },
  {
    id: 'specials',
    title: 'Winter Specials',
    emoji: '✨',
    items: [
      { en: 'Cherry Tomato', emoji: '🍅' },
      { en: 'Fresh Turmeric', hi: 'Haldi', emoji: '🫚' },
      { en: 'Indian Gooseberry', hi: 'Amla', emoji: '🌱' },
      { en: 'Iceberg Lettuce', emoji: '🥬' },
      { en: 'Green Chili', hi: 'Mirch', emoji: '🌶️' },
      { en: 'Red & Yellow Capsicum', emoji: '🫑' },
    ],
  },
]

export const PLANS = [
  {
    id: 'small',
    family: 'Family of 2–3',
    name: 'Small Family',
    total: 30000,
    instalment: 10000,
    features: ['Your own 100 sq. yd. farm', 'Sized for 2–3 people', 'Weekly home delivery', '100% organic, chemical-free'],
    featured: false,
  },
  {
    id: 'large',
    family: 'Family of 4–5',
    name: 'Large Family',
    total: 36000,
    instalment: 12000,
    features: ['Your own 150 sq. yd. farm', 'Sized for 4–5 people', 'Weekly home delivery', '100% organic, chemical-free'],
    featured: true,
  },
]

export const FAQS = [
  {
    q: 'Do I own the land?',
    a: 'The land stays with us. You reserve a dedicated plot for the season, and every vegetable it grows belongs to your family.',
  },
  {
    q: 'How much produce will my farm give?',
    a: 'Your plot is sized for your family: 100 sq. yd. for 2–3 people, 150 sq. yd. for 4–5. It covers a large share of your weekly vegetables. Off-season items will still come from the market.',
  },
  {
    q: 'How many vegetables can I choose?',
    a: "There's no cap. Pick as many as you like from our winter list. The more you choose, the better your variety through the season.",
  },
  {
    q: 'What comes in my weekly delivery?',
    a: 'Whatever is ready on your farm that week. Early winter is lighter, and the basket grows fuller as more crops come into season.',
  },
  {
    q: 'When does the season run, and how do I pay?',
    a: 'Mid-November to March, for one price. Pay in full, or in 3 instalments of ₹10,000 (Small Family) or ₹12,000 (Large Family).',
  },
  {
    q: 'How do you grow without chemicals?',
    a: "Only natural methods. No chemical pesticides, growth injections or artificial colouring, and you can visit to see exactly how it's done.",
  },
  {
    q: 'Can I visit and harvest myself?',
    a: 'Yes, anytime. Bring the family, walk your plot and pick your own vegetables. Use the farm location link below for directions.',
  },
  {
    q: 'What if weather or pests damage my crops?',
    a: "Farming depends on nature. Because your plot grows a wide mix, a total loss is rare. If a crop is hit, we'll do our best to make up for it with other produce.",
  },
  {
    q: 'Can I cancel mid-season?',
    a: 'Each farm is planted just for your family, so we ask you to commit to the full season. For genuine, unavoidable situations, talk to us.',
  },
]

export const GALLERY = [
  { src: '/img/farm-1.jpg', caption: 'Little hands, first bananas', w: 562 },
  { src: '/img/farm-2.jpg', caption: 'Fresh turmeric, just dug up', w: 800 },
  { src: '/img/farm-3.jpg', caption: 'Picking amla off the branch', w: 800 },
  { src: '/img/farm-4.jpg', caption: 'Weeding by hand, never by spray', w: 800 },
  { src: '/img/farm-5.jpg', caption: 'The banana walk', w: 800 },
  { src: '/img/farm-6.jpg', caption: 'Winter beds, freshly laid', w: 562 },
  { src: '/img/farm-7.jpg', caption: 'New shoots under the trees', w: 562 },
  { src: '/img/farm-8.jpg', caption: 'The people who tend your farm', w: 562 },
  { src: '/img/farm-9.jpg', caption: 'Water channels feeding every bed', w: 562 },
  { src: '/img/farm-10.jpg', caption: 'Soil ready for winter sowing', w: 800 },
]

export const formatINR = (n: number) => n.toLocaleString('en-IN')
