export interface Product {
  id: string;
  slug: string;
  title: string;
  price: string;
  category: string;
  image: string;
  description: string;
  digital: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'spring-2022-magazine',
    slug: 'cultured-pearl-spring-2022',
    title: 'Cultured Pearl Magazine — Spring 2022',
    price: '$15.00',
    category: 'Magazine',
    image: 'https://static.wixstatic.com/media/27ab9a_5fcea6235a154706aa53c5aafe7c824f',
    description: 'Celebrating women services, talking about things that matter to women, providing information regarding every facet of life, answering questions, and educating on topics that affect women and their wellbeing.',
    digital: false
  },
  {
    id: 'winter-2022-digital',
    slug: 'winter-2022-cultured-pearl',
    title: 'Cultured Pearl Magazine — Winter 2022 Digital Edition',
    price: '$8.00',
    category: 'Digital Download',
    image: 'https://static.wixstatic.com/media/27ab9a_5fcea6235a154706aa53c5aafe7c824f',
    description: 'Instant PDF download featuring empowering stories of faith, interviews with remarkable leaders, wellness guides, and spiritual devotionals.',
    digital: true
  },
  {
    id: 'winter-2022-print',
    slug: 'digital-download',
    title: 'Cultured Pearl Magazine — Winter 2022 Print Edition',
    price: '$18.00',
    category: 'Magazine',
    image: 'https://static.wixstatic.com/media/27ab9a_5fcea6235a154706aa53c5aafe7c824f',
    description: 'Collector’s high-gloss print edition commemorating our annual gala, scholarship recipients, and community milestones.',
    digital: false
  }
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'volunteering-family',
    slug: 'finding-support-and-help-how-your-community-can-make-a-difference',
    title: '5 Benefits of Volunteering as a Family',
    date: 'August 14, 2025',
    author: 'Cultured Pearl Editorial',
    readTime: '4 min read',
    excerpt: 'Discover why volunteering together as a family fosters empathy, instills core values in youth, and bonds generations in Christ-centered service.',
    image: 'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg',
    content: [
      'Volunteering as a family unit does something miraculous to the home dynamic. When parents and youth serve together at community pantries or clothes drives, children witness the living gospel in practical action.',
      '1. Fosters Empathy Early: Young people learn gratitude and respect for individuals from all walks of life.',
      '2. Breaks Down Digital Isolation: Unplugging from handheld screens to physically pack shoe boxes or hand out coats creates memories that last a lifetime.',
      '3. Reinforces Godly Stewardship: Giving of our time proves that love is not merely speech, but truth and action (1 John 3:18).'
    ]
  },
  {
    id: 'holiday-difference',
    slug: 'beyond-bucks-10-ways-to-make-a-difference',
    title: '10 Meaningful Ways to Make a Difference Beyond Giving Money',
    date: 'November 20, 2025',
    author: 'Dr. Pamela Gurley',
    readTime: '6 min read',
    excerpt: 'True philanthropy extends far beyond financial gifts. Discover 10 impactful, heart-to-heart ways you can bless someone in your city.',
    image: 'https://static.wixstatic.com/media/27ab9a_d9f77a5393984caba4db1f15a11fbf10f002.jpg',
    content: [
      'While financial donations are vital to sustaining non-profit missions, compassionate human presence is priceless.',
      'Mentoring a high school senior, offering rides to Sunday service, cooking a warm meal for a mother in shelter, or simply listening without judgment to a sister facing affliction.',
      'Learn how small acts of obedience create generational ripple effects.'
    ]
  },
  {
    id: 'volunteer-programs-2025',
    slug: 'paving-the-path-to-a-brighter-future',
    title: 'Paving the Path to a Brighter Future: Our Volunteer Horizons',
    date: 'January 10, 2026',
    author: 'Sharonda Savoy',
    readTime: '5 min read',
    excerpt: 'Cultured Pearl announces our expanded youth mentorship, scholarship review committees, and wellness initiatives for the upcoming year.',
    image: 'https://static.wixstatic.com/media/dadfb09091a94356850ecc528e626098.jpg',
    content: [
      'As we reflect on Zechariah 13:9, we are reminded that refined gold and pearls emerge from purposeful fires.',
      'Our newly expanded programs invite professionals in healthcare, education, law, and trades to share their skills with young women striving for excellence.',
      'Join us as a volunteer committee leader or event host this season!'
    ]
  }
];
