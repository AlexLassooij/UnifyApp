export interface TeamData {
    imageUrl: string;
    imageAlt: string;
    name: string;
    title?: string;
    paragraphs: string[];
    imageOnLeft?: boolean;
    isNumberedList?: boolean;
    imageHeight?: number;
    imageWidth?: number;
  }

  export const studentsData: TeamData[] = [
    {
        imageUrl: "/landing/sketchbook.png",
        imageAlt: "sketchbook",
        name: "A Smarter Way to Plan Your University Journey",
        paragraphs: [
          "We created Unify after seeing how confusing and overwhelming the university process can be — different provinces, changing requirements, and no clear roadmap.",
          "Our platform brings everything together in one place: school comparisons, deadline tracking, and insights from current students.",
          "Whether you're aiming high or just starting to explore, Unify is designed to help you take control with confidence."
        ],
        imageHeight: 400,
        imageWidth: 450
      },
      {
        imageUrl: "/landing/caps_flying.png",
        imageAlt: "caps_flying",
        name: "How to Use Unify for Your Applications",
        paragraphs: [
          "Set up your profile with interests and academic info",
          "Get matched with programs that fit your goals",
          "Track your grades and stay on top of requirements",
          "Track key deadlines and stay organized",
          "Plan your next steps with confidence",
        ],
        isNumberedList: true,
        imageHeight: 450,
        imageWidth: 350
      },
    ]
  
  export const teamData: TeamData[] = [
    {
        imageUrl: "/landing/mikia.png",
        imageAlt: "mikia",
        name: "Mikia Whitehead",
        title: "CEO",
        paragraphs: [
          "I’m an Electrical Engineering student at UBC, and I’ve always been driven by the idea that every student deserves a fair shot at discovering what they’re capable of. I started Unify after seeing how overwhelming and unequal the university application process can be — especially for students who don’t have the right support.",
          "I was fortunate to have support from my sister, an education consultant, and that experience showed me how powerful the right advice can be. Before Unify, I spent years as a piano teacher and math tutor — and I’ve always loved helping others reach their potential.",
          "Now, I’m building Unify to make that kind of support available to every student, no matter their background or starting point."
        ],
        imageOnLeft: true
      },
    {
      imageUrl: "/landing/alex.png",
      imageAlt: "alex",
      name: "Alex Lassooij",
      title: "CTO",
      paragraphs: [
        "I’ve always been passionate about creating technology that makes a real difference in people’s lives. Having gone through the admissions process myself, I know that it can be overwhelming and confusing, leaving many students without the support they need to succeed. That’s what inspired me to build Unify—a platform designed to make expert guidance accessible to everyone.",
        "As an Electrical Engineering & Data Science student at UBC with a background in designing user-facing applications and web development, I saw an opportunity to use technology to simplify and democratize the admissions journey. While the app is still in development, I’m excited to be creating something that has the potential to support and empower many younger students in the future."
      ],
      imageOnLeft: false
    },
    {
      imageUrl: "/landing/cindy.png",
      imageAlt: "cindy",
      name: "Cindy Tran",
      title: "CFO",
      paragraphs: [
        "I'm an Accounting student at UBC Sauder and a passionate advocate for accessible education. Joining Unify as a CFO is a meaningful way for me to apply my financial expertise to a mission that empowers students, and I am dedicated to ensure our resources are effectively used to maximize Unify's reach.",
        "Before joining Unify, I was a member in Bridges for Enterprise (BfE), a nonprofit that empowers early-stage social entrepreneurs. I also spent years building hands-on experience in the accounting, banking and finance sector - which equipped me with expertise to help bring Unify to the market.",
        "At Unify, I'm committed to ensure our resources create meaningful impact, empowering students from all backgrounds to succeed."
        ],
      imageOnLeft: true
    },
    {
      imageUrl: "/landing/brendan.png",
      imageAlt: "brendan",
      name: "Brendan Cooper",
      title: "COO",
      paragraphs: [
        "I’m a Business student at UBC with a specialization in marketing and strategy. Having applied to universities in 2020, I saw first-hand the importance of having friends and family during the application process, and how those without such assistance can feel lost and overwhelmed.",
        "To me, the need for this idea became clear when I saw how much people were spending on consultants, and how dangerous it can be if the application process becomes about who can spend more, rather than personal accomplishment and merit."
        ],
      imageOnLeft: false
    },
    {
      imageUrl: "/landing/jasleen.png",
      imageAlt: "jasleen",
      name: "Jasleen Shnider",
      title: "CPO",
      paragraphs: [
        "I’m an Integrated Engineering student at UBC, specializing in Computer and Mechanical Engineering with a minor in Entrepreneurship. My passion lies in making education accessible by giving students the support they need to level the playing field.",
        "Having faced challenges during the university application process myself, I was struck by how little has changed when my younger brother went through it this year. Before Unify, I worked at UBC’s engineering outreach program and held leadership roles in my sorority that shaped my passion for mentorship and student success.",
        "Today, I’m dedicated to building Unify, ensuring that every student has the opportunity to reach their full potential."
        ],
      imageOnLeft: true
    },
    {
      imageUrl: "/landing/jolina.png",
      imageAlt: "jolina",
      name: "Jolina Cheng",
      title: "CMO",
      paragraphs: [
        "I’m currently a UBC Commerce student specializing in Entrepreneurship, with a strong interest in digital marketing and brand development.",
        "Prior to Unify, I gained experience managing social media accounts through student clubs and internships, focusing on content strategy and audience engagement.  Outside of academics, I enjoy exploring photography and video editing, these creative outlets allow me to express ideas visually. While I tend to be soft-spoken, I’ve found that digital media and design offer powerful ways to connect with others.",
        "At Unify, I’m excited to contribute to a platform that empowers students through clear, accessible, and thoughtful communication."
        ],
      imageOnLeft: false
    },
    
  ]

  export interface ParentSection {
    imageUrl: string;
    imageAlt: string;
    title: string;
    description: string | string[];
    imageOnLeft: boolean;
    centerText: boolean;
    imageHeight?: number;
    imageWidth?: number;
    maxWidth?: string;
  }
  
  export const parentsData: ParentSection[] = [
    {
      imageUrl: "/landing/cartoon_chilling.png",
      imageAlt: "cartoons chilling",
      title: "Support your child's future with confidence.",
      description: "No more guesswork. Get the tools and insights you need to guide your child with ease.",
      imageOnLeft: true,
      centerText: false,
      imageHeight: 350,
      imageWidth: 350
    },
    {
      imageUrl: "/landing/girl_cap_up.png",
      imageAlt: "girl_graduating",
      title: "Know What They Need — Before They Need It.",
      description: "Get personalized recommendations for schools and programs based on your child's goals, interests, and grades.",
      imageOnLeft: false,
      centerText: false,
      imageHeight: 300,
      imageWidth: 350
    },
    {
      imageUrl: "/landing/laptop_aerial.png",
      imageAlt: "laptop_aerial",
      title: "Smart Planning, Family Budget Approved.",
      description: [
        "Private consultants can cost hundreds — even thousands — for the same guidance.",
        "Unify gives you expert-backed tools in one affordable, self-guided platform.",
        "Why pay $200/hour when you can access smarter planning, built with the same insight and more transparency?",
        "Unify helps families stay informed and on budget — no compromises, no confusion."
      ],
      imageOnLeft: true,
      centerText: false,
      imageHeight: 600,
      imageWidth: 400,
      maxWidth: "max-w-[600px] lg:max-w-[800px]"
    }
  ];

  export interface Testimonial {
    category: string;
    imageUrl: string;
    imageAlt: string;
    quotes: {
      text: string;
      author: string;
    }[];
    imageOnLeft: boolean;
    imageHeight?: number;
    imageWidth?: number;
  }
  
  export const testimonialData: Testimonial[] = [
    {
      category: "Students",
      imageUrl: "/landing/girl_graduating.png",
      imageAlt: "girl_graduating",
      quotes: [
        {
          text: "I used to Google everything and still felt lost. Unify actually shows me where I stand and what I need to work on.",
          author: "Olivia, Grade 12 Student"
        },
        {
          text: "It's like a GPS for university planning, I actually feel in control now.",
          author: "Armaan, High School Senior"
        }
      ],
      imageOnLeft: false,
      imageHeight: 300,
      imageWidth: 450
    },
    {
      category: "Parents",
      imageUrl: "/landing/studying_laptop.png",
      imageAlt: "studying_laptop",
      quotes: [
        {
          text: "We looked into hiring a private consultant, but Unify gave us everything we needed — for way less.",
          author: "Karen, Parent of Grade 11 Student"
        },
        {
          text: "For once, I actually felt part of the process without hovering or nagging.",
          author: "James, Dad of a Grade 12 Student"
        }
      ],
      imageOnLeft: true,
      imageHeight: 300,
      imageWidth: 400
    },
    {
      category: "Advisors & Experts",
      imageUrl: "/landing/presenting.png",
      imageAlt: "presenting",
      quotes: [
        {
          text: "Unify reflects what students really need to navigate Canadian admissions.",
          author: "Educational Consultant, Vancouver"
        },
        {
          text: "This kind of tool should be standard — it brings clarity, structure, and accessibility to a messy process.",
          author: "UBC Admissions Advisor (Consultant Partner)"
        }
      ],
      imageOnLeft: false,
      imageHeight: 300,
      imageWidth: 400
    }
  ];