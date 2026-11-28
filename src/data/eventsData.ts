export interface LiveEvent {
  id: string;
  slug: string;
  title: string;
  dateStr: string;
  timeStr: string;
  location: string;
  locationAddress?: string;
  category: 'upcoming' | 'gathering' | 'community' | 'seminar';
  description: string;
  longDescription?: string;
  banner: string;
  rsvpUrl?: string;
  status: 'Open' | 'Past' | 'Invite Only';
  featured?: boolean;
  // Native Wix Events properties
  registrationType?: 'RSVP' | 'TICKETS' | 'EXTERNAL' | 'NONE' | string;
  registrationStatus?: 'OPEN_RSVP' | 'OPEN_TICKETS' | 'CLOSED' | 'CLOSED_AUTOMATICALLY' | string;
  isPast?: boolean;
  isClosed?: boolean;
  isOpenForRsvp?: boolean;
  isOpenForTickets?: boolean;
  startDateIso?: string;
  endDateIso?: string;
  timeZone?: string;
  eventPageUrl?: string;
  guestsCount?: number;
}

export const LIVE_EVENTS: LiveEvent[] = [
  {
    id: 'dd9df97a-a275-408e-8be4-81355752ba1a',
    slug: 'pearls-of-excellence-honoring-women-of-faith-purpose-impact',
    title: 'Pearls of Excellence: Honoring Women of Faith, Purpose & Impact',
    dateStr: 'August 13, 2027',
    timeStr: '6:00 PM – 10:00 PM',
    location: 'Location is TBD',
    category: 'upcoming',
    description:
      'Join Cultured Pearl for Pearls of Excellence: Honoring Women of Faith, Purpose & Impact—an inspiring evening celebrating women whose leadership, service, and commitment make a difference in their communities.',
    longDescription:
      "Join Cultured Pearl for Pearls of Excellence: Honoring Women of Faith, Purpose & Impact—an inspiring evening celebrating women whose leadership, service, and commitment make a difference in their communities.\n\nTogether, we'll recognize their contributions and support Cultured Pearl's mission to empower women and youth through scholarships, mentorship, and community programs. Enjoy an evening of celebration, connection, and purpose as we honor the women making an impact today and helping shape a brighter future.",
    banner: 'https://static.wixstatic.com/media/27ab9a_962a97f14def482c8357d92677e68655~mv2.png',
    status: 'Open',
    featured: true,
    registrationType: 'TICKETS',
    registrationStatus: 'OPEN_TICKETS',
    isPast: false,
    isClosed: false,
    isOpenForTickets: true,
    startDateIso: '2027-08-13T22:00:00.000Z',
    eventPageUrl:
      '/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact',
  },
  {
    id: '442756ff-44db-415a-a6fa-123dade99e64',
    slug: 'community-day',
    title: 'Community Day',
    dateStr: 'March 6, 2027',
    timeStr: '11:00 AM – 3:00 PM',
    location: 'Location is TBD',
    category: 'community',
    description:
      'Join us for scholarship application assistance, secure document shredding to prepare for tax season, and helpful budgeting and financial-wellness resources—all in a welcoming, uplifting environment.',
    longDescription:
      'Cultured Pearl Community Day brings our neighborhood together with practical resources, higher education scholarship application mentoring, secure document shredding, and faith-filled fellowship.',
    banner: 'https://static.wixstatic.com/media/27ab9a_44872b3ce7524d0ead186d30e08f775b~mv2.png',
    status: 'Open',
    featured: true,
    registrationType: 'RSVP',
    registrationStatus: 'OPEN_RSVP',
    isPast: false,
    isClosed: false,
    isOpenForRsvp: true,
    startDateIso: '2027-03-06T16:00:00.000Z',
    eventPageUrl: '/events/community-day',
  },
  {
    id: 'ce9f7432-2ea8-46b3-970b-891c88fadab0',
    slug: 'pearls-of-excellence-gala-scholarship-awards-2027',
    title: 'Pearls of Excellence Gala & Scholarship Awards 2027',
    dateStr: 'May 15, 2027',
    timeStr: '2:00 PM – 6:00 PM',
    location: 'The Ritz-Carlton, Pentagon City',
    category: 'gathering',
    description:
      'Join Cultured Pearl for an unforgettable evening celebrating our Purposeful Life Scholarship recipients and honoring women of faith, purpose, and community impact.',
    longDescription:
      'An elegant gala celebration honoring outstanding community pillars, educators, and spiritual leaders who uplift others. Includes a three-course dinner, inspiring keynote addresses, and scholarship celebrations.',
    banner: 'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg',
    status: 'Open',
    featured: true,
    registrationType: 'RSVP',
    registrationStatus: 'OPEN_RSVP',
    isPast: false,
    isClosed: false,
    isOpenForRsvp: true,
    startDateIso: '2027-05-15T18:00:00.000Z',
    eventPageUrl:
      '/events/pearls-of-excellence-gala-scholarship-awards-2027',
  },
  {
    id: 'debutante-ball-signup',
    slug: 'cultured-pearl-debutante-ball-signup',
    title: 'Cultured Pearl Debutante Ball Sign-Up',
    dateStr: 'Annual Signature Event',
    timeStr: 'Registration Open',
    location: 'Washington, DC Metropolitan Area',
    category: 'upcoming',
    description:
      'Step into elegance, grace and empowerment! We invite young women to participate in our upcoming Debutante Ball, a celebration of love, culture, achievement, and sisterhood.',
    longDescription:
      'Cultured Pearl is thrilled to invite ambitious young women to embark on a transformative season of mentorship, etiquette, community stewardship, and poise culminating in the formal Debutante Ball. Participants engage in workshops, scholarship opportunities, and life-long sisterhood connections.',
    banner: 'https://static.wixstatic.com/media/b3742cb94ad46fc6d9639d2496e849df.jpg',
    status: 'Open',
    featured: true,
    registrationType: 'RSVP',
    registrationStatus: 'OPEN_RSVP',
    isPast: false,
    isClosed: false,
    isOpenForRsvp: true,
  },
  {
    id: '64d36fbc-2c3c-458f-93eb-edffe6ffbca5',
    slug: 'pearls-of-excellence-gala-scholarship-awards-2026',
    title: 'Pearls of Excellence Gala & Scholarship Awards 2026',
    dateStr: 'October 24, 2026',
    timeStr: '2:00 PM – 6:00 PM',
    location: 'The Ritz-Carlton, Pentagon City',
    category: 'gathering',
    description:
      'A memorable gathering celebrating women of faith and awarding our annual Purposeful Life Scholarships.',
    banner: 'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg',
    status: 'Past',
    isPast: true,
    isClosed: true,
    registrationType: 'RSVP',
    registrationStatus: 'CLOSED_AUTOMATICALLY',
  },
  {
    id: '87aa01f0-1815-4965-a819-474fb8d4c3ce',
    slug: 'community-shoe-drive-support-families-in-need',
    title: 'Community Shoe Drive: Support Families in Need',
    dateStr: 'September 15, 2026',
    timeStr: '5:00 AM – 1:00 PM',
    location: 'Cultured Pearl Outreach Centers',
    category: 'community',
    description:
      'Community outreach gathering gently used shoes to empower homeless families and individuals transitioning back to work.',
    banner: 'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg',
    status: 'Past',
    isPast: true,
    isClosed: true,
    registrationType: 'RSVP',
    registrationStatus: 'CLOSED_AUTOMATICALLY',
  },
  {
    id: 'be57da69-58d7-4d43-a79d-b44ced80c6e2',
    slug: 'cultured-pearl-debutante-ball',
    title: 'Cultured Pearl Debutante Ball',
    dateStr: 'November 21, 2026',
    timeStr: '1:00 PM – 6:00 PM',
    location: 'Washington, DC Metropolitan Area',
    category: 'gathering',
    description:
      'Annual formal Debutante Ball celebrating poise, mentorship, and academic achievement for young women.',
    banner: 'https://static.wixstatic.com/media/b3742cb94ad46fc6d9639d2496e849df.jpg',
    status: 'Past',
    isPast: true,
    isClosed: true,
    registrationType: 'RSVP',
    registrationStatus: 'CLOSED_AUTOMATICALLY',
  },
  {
    id: 'ccd2f19e-ebe7-44f1-821a-2399826447c2',
    slug: 'kingsdaughters',
    title: 'KingsDaughters',
    dateStr: 'October 16 – 18, 2026',
    timeStr: '4:00 PM – 2:00 PM',
    location: 'Ocean City, MD, USA',
    locationAddress: 'Ocean City, Ocean City, MD, USA',
    category: 'gathering',
    description:
      "Join us for the Daughters of the King Christian Women's Retreat, October 16–18, 2026, in Ocean City, Maryland. Experience a transformative weekend of worship, prayer, healing, and sisterhood centered on the theme Release • Heal • Renew. Your registration includes double-occupancy accommodations, Friday night dinner, breakfast, inspiring guest speakers, and unforgettable moments in God's presence. Payment plans are available, and space is limited.",
    banner: 'https://static.wixstatic.com/media/27ab9a_f541ff3c2fda4fd995eec6c247f9d4a2~mv2.jpg',
    status: 'Past',
    isPast: true,
    isClosed: true,
    isOpenForTickets: false,
    registrationType: 'TICKETS',
    registrationStatus: 'CLOSED_AUTOMATICALLY',
    startDateIso: '2026-10-16T20:00:00.000Z',
    endDateIso: '2026-10-18T18:00:00.000Z',
    eventPageUrl: '/events/kingsdaughters',
    guestsCount: 16,
  },
  {
    id: 'healthy-life-healthy-you',
    slug: 'healthy-life-healthy-you-food-mind-and-body',
    title: 'Healthy Life, Healthy You: Food, Mind and Body',
    dateStr: 'Wellness Workshop',
    timeStr: '9:30 AM - 12:30 PM EST',
    location: 'Live Stream & Community Wellness Hall',
    category: 'seminar',
    description: 'Teaching women holistic wellness principles — balancing nutrition, emotional health, mindfulness, and physical rejuvenation according to biblical principles.',
    banner: 'https://static.wixstatic.com/media/81bfa3_12c4e994553d45e3a0627a5acd0f25cb~mv2.jpg',
    status: 'Past'
  },
  {
    id: 'paint-n-sip',
    slug: 'cultured-pearls-paint-n-sip',
    title: "Cultured Pearl's Paint & Sip Sisterhood Night",
    dateStr: 'Fellowship Night',
    timeStr: '6:30 PM - 9:00 PM EST',
    location: 'Pearl Studio Lounge, MD / DC',
    category: 'gathering',
    description: 'Come and enjoy a creative, refreshing evening of guided painting, soothing music, mocktails, and heartwarming sisterhood fellowship.',
    banner: 'https://static.wixstatic.com/media/dadfb09091a94356850ecc528e626098.jpg',
    status: 'Past'
  },
  {
    id: 'faith-mustard-seed',
    slug: 'faith-of-a-mustard-seed',
    title: 'Faith of a Mustard Seed: Overcoming Obstacles',
    dateStr: 'Biblical Study Series',
    timeStr: '7:00 PM - 8:30 PM EST',
    location: 'Virtual Zoom Sanctuary',
    category: 'seminar',
    description: 'Discovering what faith the size of a mustard seed truly unlocks when confronting chronic life trials, career crossroads, and family transitions.',
    banner: 'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg',
    status: 'Past'
  },
  {
    id: 'fix-my-credit',
    slug: 'fix-my-credit',
    title: 'Fix My Credit & Financial Independence Workshop',
    dateStr: 'Financial Literacy Seminar',
    timeStr: '1:00 PM - 3:30 PM EST',
    location: 'Interactive Webinar & In-Person Lab',
    category: 'seminar',
    description: 'Download your credit report and follow along step-by-step with certified financial counselors to rebuild credit, eliminate debt, and build generational wealth.',
    banner: 'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg',
    status: 'Past'
  },
  {
    id: 'the-best-me-made-by-god',
    slug: 'the-best-me-made-by-god',
    title: 'The Best Me Made By God: Mental Wellness Summit',
    dateStr: 'Wellness Summit',
    timeStr: '10:00 AM - 3:00 PM EST',
    location: 'Bethesda Conference Center',
    category: 'seminar',
    description: 'A mental wellness intensive ushering women into divine self-acceptance, emotional freedom, healing from trauma, and embracing their God-given identity.',
    banner: 'https://static.wixstatic.com/media/27ab9a_d9f77a5393984caba4db1f15a11fbf10f002.jpg',
    status: 'Past'
  },
  {
    id: 'move-mountain-move',
    slug: 'move-mountain-move',
    title: 'Move Mountain Move: Conquering Fears & Doubts',
    dateStr: 'Spiritual Workshop',
    timeStr: '11:00 AM - 1:30 PM EST',
    location: 'Washington DC Ministry Center',
    category: 'seminar',
    description: 'Equipping women to break barriers, demolish self-limiting beliefs, and step audaciously into the purpose God designed for them.',
    banner: 'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg',
    status: 'Past'
  },
  {
    id: 'empowher-retreat',
    slug: 'empowher-womans-retreat',
    title: "EmpowHer Women's Weekend Retreat",
    dateStr: 'Annual Weekend Retreat',
    timeStr: 'Friday - Sunday',
    location: 'Serenity Ridge Retreat Center, VA',
    category: 'gathering',
    description: 'Three days of prayer, renewal, relaxation, personal breakthroughs, and intimate sisterhood bonding in nature.',
    banner: 'https://static.wixstatic.com/media/27ab9a_b2524b890b8246edbae0151c82289d19f002.jpg',
    status: 'Past'
  },
  {
    id: 'powerful-women-bible',
    slug: 'powerful-women-of-the-bible-series',
    title: 'Powerful Women of the Bible Study Series',
    dateStr: 'Monthly Interactive Bible Study',
    timeStr: '7:00 PM - 8:30 PM EST',
    location: 'Interactive Zoom Classroom',
    category: 'seminar',
    description: 'Exploration of Esther, Deborah, Ruth, Mary, and Priscilla — extracting practical spiritual lessons for the contemporary Christian woman.',
    banner: 'https://static.wixstatic.com/media/27ab9a_343302a99b954cd58cfc204e62d79d9af002.jpg',
    status: 'Open'
  },
  {
    id: 'community-day',
    slug: 'community-day',
    title: 'Cultured Pearl Community Empowerment Day',
    dateStr: 'Annual Community Service',
    timeStr: '10:00 AM - 4:00 PM EST',
    location: 'Community Resource Center, Washington DC',
    category: 'community',
    description: 'Assisting students with scholarship applications, providing career mentorship, distributing household care baskets, and offering free family wellness screenings.',
    banner: 'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg',
    status: 'Open'
  },
  {
    id: 'bags-with-swags',
    slug: 'bags-with-swags-raising-awareness-to-sex-trafficking',
    title: 'Bags with Swags: Raising Awareness to Human Trafficking',
    dateStr: 'Awareness Campaign',
    timeStr: '12:00 PM - 4:00 PM EST',
    location: 'Metropolitan Community Center',
    category: 'community',
    description: 'Bringing vital education, emergency hygiene care packages, and compassionate survivor support to combat human trafficking.',
    banner: 'https://static.wixstatic.com/media/81bfa3_12c4e994553d45e3a0627a5acd0f25cb~mv2.jpg',
    status: 'Past'
  },
  {
    id: 'give-100-mothers',
    slug: 'give-100-mothers-for-mothers-day',
    title: 'Give 100 Mothers: Mother’s Day Hope Campaign',
    dateStr: 'Mother’s Day Weekend',
    timeStr: 'All Day Outreach',
    location: 'Women’s Shelters Across DC, MD, and VA',
    category: 'community',
    description: 'Supporting 100 single mothers and mothers transitioning out of domestic shelters with personalized care gifts, grocery cards, and floral bouquets.',
    banner: 'https://static.wixstatic.com/media/dadfb09091a94356850ecc528e626098.jpg',
    status: 'Past'
  },
  {
    id: 'mothers-day-tea',
    slug: 'mothers-day-tea',
    title: 'Annual Elegant Mother’s Day Afternoon Tea',
    dateStr: 'Second Saturday of May',
    timeStr: '1:00 PM - 4:00 PM EST',
    location: 'The Historic Pearl Parlour',
    category: 'gathering',
    description: 'Honoring mothers, grandmothers, and spiritual mentors with high tea delicacies, harp melodies, and uplifting tributes.',
    banner: 'https://static.wixstatic.com/media/27ab9a_b2524b890b8246edbae0151c82289d19f002.jpg',
    status: 'Past'
  },
  {
    id: 'scholarship-brunch',
    slug: 'cultured-pearls-scholarship-brunch-2022',
    title: 'Purposeful Life Scholarship Awards Brunch',
    dateStr: 'Annual Summer Brunch',
    timeStr: '11:30 AM - 2:30 PM EST',
    location: 'Waterfront Banquet Hall, National Harbor',
    category: 'gathering',
    description: 'Celebrating high school scholarship winners, presenting college checks, and blessing them as they embark on higher education.',
    banner: 'https://static.wixstatic.com/media/e56d089a6ccc4da79d5a52f8b7c2893d.jpg',
    status: 'Past'
  },
  {
    id: 'clothing-drive',
    slug: 'clothing-drive',
    title: 'Annual Professional Clothing & Coat Drive',
    dateStr: 'Fall Outreach Campaign',
    timeStr: '10:00 AM - 3:00 PM EST',
    location: 'Cultured Pearl Drop-off Locations',
    category: 'community',
    description: 'Collecting clean suits, blazers, professional attire, and warm winter coats for women re-entering the workforce.',
    banner: 'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg',
    status: 'Past'
  },
  {
    id: 'mystery-dinner-show',
    slug: 'mystery-dinner-show-at-the-pearl',
    title: 'Mystery Dinner Theater at The Pearl',
    dateStr: 'Special Charity Evening',
    timeStr: '6:30 PM - 9:30 PM EST',
    location: 'Grand Dining Hall, DC',
    category: 'gathering',
    description: 'An interactive comedy-mystery dinner show benefitting youth educational programs. Full course gourmet dinner and family-friendly mystery intrigue.',
    banner: 'https://static.wixstatic.com/media/27ab9a_343302a99b954cd58cfc204e62d79d9af002.jpg',
    status: 'Past'
  }
];
