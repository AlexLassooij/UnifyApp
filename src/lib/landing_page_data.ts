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
        "Unify helped me discover programs I never would have considered on my own. The personalized recommendations were spot on for my interests and career goals.",
        "The application timeline feature kept me organized and ahead of deadlines, which really reduced my stress levels during the whole process.",
        "I'm now in my dream program, and I credit Unify with helping me find the perfect match for my academic goals and learning style."
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