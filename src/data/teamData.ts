export interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  education?: string;
  image: string;
  quote?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sharonda Savoy',
    role: 'Executive Director & Founder',
    quote: 'Strength and dignity are her clothing, and she laughs at the time to come. She opens her mouth with wisdom, and the teaching of kindness is on her tongue. — Proverbs 31:25-26',
    image: 'https://static.wixstatic.com/media/81bfa3_f04b8b0ff4fe42a9afec552e60971edb~mv2.jpg',
    education: "Master's degree in Networking & Information Technology",
    bio: [
      'Sharonda Savoy is a native Washingtonian with a passion to live life to the fullest which means learning all about what God wants from us. She answered God’s call on her life at the age of 12 at Mount Olive Baptist Church in Washington, DC, and is currently an active member of the Historic Vermont Avenue Baptist Church.',
      'Married for over 24 years with a loving, supporting husband and an amazing son, she has built a full-time career in the IT field alongside co-partnering in two e-commerce enterprises.',
      'During a women’s day church conference, God spoke to her as she observed the radiant joy of fellowship in God’s promises. On June 26, 2017, Cultured Pearl was formed to empower and uplift women through transformative seminars, leadership workshops, and community recognition.'
    ]
  },
  {
    name: 'Rodney A. Savoy Sr.',
    role: 'Chairman of the Board',
    image: 'https://static.wixstatic.com/media/27ab9a_0ab68c99ba7f42ed9a2457409fb79ee7~mv2.jpg',
    education: "B.A. in Behavioral Science & Minor in Religion (Midland Univ.); Master's in Human Services (International Univ.)",
    bio: [
      'Trustworthy, compassionate, honest, and hardworking, Rodney A. Savoy Sr. has served with Cultured Pearl since inception as the foundational backbone and inspiration of its leadership.',
      'He devotes substantial personal time working with homeless and vulnerable populations across the Washington metropolitan area and stands as one of the organization’s most dedicated champions.',
      'Mr. Savoy enjoys quality family time, football, golf, and fitness training.'
    ]
  },
  {
    name: 'Dr. Pamela Gurley, D.M.',
    role: 'Chair of Operations',
    image: 'https://static.wixstatic.com/media/27ab9a_210b31af19e7475d8e83343222127020~mv2.png',
    education: 'Doctorate in Management (Organizational Development & Change); M.S. in Health Service Administration; B.A. in Psychology',
    bio: [
      'Dr. Pamela Gurley is the Founder/CEO of Clark and Hill Enterprise, IAMDRPGURLEY, Un@pologeticbyDrG, and Dope A$$ Women Entertainment. Host of the Herspiration Happy Hour podcast and international contributing author.',
      'A retired U.S. Army Veteran with 25+ years across federal departments (DoD, ATF, State Department, MSPB) managing high-stakes budgets domestically and globally in Dubai, South Africa, Belgium, Singapore, and London.'
    ]
  },
  {
    name: 'Peggy Williams',
    role: 'Chair of Communications',
    image: 'https://static.wixstatic.com/media/27ab9a_6349bc953c9c48ff920df39fcd73f61d~mv2.png',
    education: 'B.S. in Broadcast Journalism (Bowie State University); A.A. in Mass Communications',
    bio: [
      'CEO of Dream Merchant Media with 20+ years of prominent entertainment and production leadership. Co-producer and director of holiday feature films including Christmas In Carolina.',
      'Former project manager at Kellie Williams Productions, executive producer of teen series Gyrl Talk, and artist manager with Tommy Boy and Atlantic Records.'
    ]
  },
  {
    name: 'Trina Logan',
    role: 'Regional Community Director',
    image: 'https://static.wixstatic.com/media/27ab9a_44872b3ce7524d0ead186d30e08f775b~mv2.png',
    education: '28+ Years Leadership in Social & Human Services',
    bio: [
      'Self-motivated Regional Director of a Social/Human Service organization in Washington, DC, dedicated to supporting individuals with developmental and mental health challenges.',
      'Deeply passionate about respecting individuality and guiding women toward connecting with their divine purpose.'
    ]
  },
  {
    name: 'Shawn Pelote',
    role: 'Director of Youth & Education',
    image: 'https://static.wixstatic.com/media/6624f7fefeab1696c11277d1c304442e.jpg',
    education: 'M.A. in Education Administration (Southeastern Univ.); B.A. in Political Science (Howard Univ.)',
    bio: [
      'Over 27 years of devoted service in urban school districts, educational administration, and youth mentorship.',
      'Inspiring generations of students to pursue higher education and meaningful service careers.'
    ]
  }
];
