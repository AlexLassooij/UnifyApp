import { Application, ApplicationStatus, Program } from "../datamodel/datamodel";

export const dummy_applications: Application[] = [
    {
      status: 'in_progress' as ApplicationStatus,
      program_id: '1',
      university: 'McGill University',
      program: 'Computer Science',
      application_date: new Date("2024-02-15"),
      application_deadline: new Date("2024-03-15"),
      last_updated: new Date("2024-02-28"),
      notes: [
        {
          text: "Remember to pay the $120 application fee before submitting final documents."
        },
        {
          text: "Prof. Johnson agreed to write a reference letter - follow up by March 1st."
        }
      ],
      sub_tasks: [
        {
          name: "Submit Transcripts",
          status: "completed" as ApplicationStatus,
          deadline: new Date("2024-02-28"),
          notes: "Official transcript sent via mail on Feb 15"
        },
        {
          name: "Personal Statement",
          status: "in_progress" as ApplicationStatus,
          deadline: new Date("2024-03-10"),
          notes: "First draft complete, need final review"
        },
        {
          name: "Pay Application Fee",
          status: "not_started" as ApplicationStatus,
          deadline: new Date("2024-03-14"),
          notes: ""
        }
      ]
    },
    {
      program_id: '2',
      status: 'not_started' as ApplicationStatus,
      university: 'University of Toronto',
      program: 'Data Science',
      application_date: new Date("2024-02-15"),
      application_deadline: new Date("2024-03-15"),
      last_updated: new Date("2024-02-28"),
      notes: [],
      sub_tasks: []
    },
    // Add a third example with only notes but no tasks
    {
      program_id: '3',
      status: 'not_started' as ApplicationStatus,
      university: 'University of British Columbia',
      program: 'Computer Engineering',
      application_date: new Date("2024-02-15"),
      application_deadline: new Date("2024-03-15"),
      last_updated: new Date("2024-02-28"),
      notes: [
        {
          text: "Need minimum 85% in Math and Physics to be competitive."
        }
      ],
      sub_tasks: []
    }
  ];

  export const PROGRAMS: Program[] = [
    {
      "id": "u_of_t_computer_science",
      "university_id": "u_of_t",
      "university_name": "University of Toronto",
      "university_location": "Toronto, ON",
      "faculty": "science",
      "program_name": "Computer Science",
      "degree_type": "Bachelor of Science",
      "annual_tuition": 8113,
      "program_length": 4,
      "specializations": [
        { "name": "Artificial Intelligence", "link": "/programs/uoft-cs-ai" },
        { "name": "Game Design", "link": "/programs/uoft-cs-gamedesign" },
        { "name": "Data Science", "link": "/programs/uoft-cs-datascience" }
      ],
      "program_description": [
        {
          "text": "The Computer Science program at the University of Toronto provides students with a comprehensive foundation in computer science theory and practice."
        },
        {
          "subheading": "Program Focus",
          "text": "Focus areas include algorithms, artificial intelligence, computer systems, and software engineering."
        }
      ],
      "language_of_instruction": "English",
      "program_requirements": ["english", "math_calculus", "physics"],
      "specific_requirements": [
        {
          "curriculum_type": "ON",
          "requirements": [{ "text": "English 4U" }, { "text": "Calculus and Vectors 4U" }, { "text": "Advanced Functions 4U" }]
        }
      ],
      "application_deadline": [
        {
          "type": "regular_admission",
          "date": "2024-01-15T00:00:00.000Z",
          "description": "Regular admission deadline"
        }
      ],
      "career_opportunities": [
        {
          "text": "Graduates pursue careers as software developers, data scientists, and systems analysts in various industries."
        }
      ],
      "tldr": [
        {
          "subheading": "Key Points",
          "bullets": [
            { "text": "Highly competitive program with strong industry connections" },
            { "text": "Emphasis on theoretical foundations and practical applications" },
            { "text": "Co-op opportunities available" }
          ]
        }
      ],
      "is_new": true
    },
    {
      "id": "mcgill_software_engineering",
      "university_id": "mcgill",
      "university_name": "McGill University",
      "university_location": "Montreal, QC",
      "faculty": "engineering",
      "program_name": "Software Engineering",
      "degree_type": "Bachelor of Engineering",
      "annual_tuition": 8113,
      "program_length": 4,
      "specializations": [
        { "name": "Web Development", "link": "/programs/mcgill-se-webdev" },
        { "name": "Mobile Applications", "link": "/programs/mcgill-se-mobile" }
      ],
      "program_description": [
        {
          "text": "McGill's Software Engineering program combines computer science fundamentals with engineering principles to develop complex software systems."
        }
      ],
      "language_of_instruction": "English",
      "program_requirements": ["english", "math_calculus", "physics", "chemistry"],
      "application_deadline": [
        {
          "type": "regular_admission",
          "date": "2024-01-15T00:00:00.000Z",
          "description": "Regular admission deadline"
        }
      ],
      "career_opportunities": [
        {
          "text": "Graduates work as software engineers, project managers, and consultants in technology companies and other sectors."
        }
      ],
      "tldr": [
        {
          "subheading": "Program Highlights",
          "bullets": [
            { "text": "Accredited by the Canadian Engineering Accreditation Board" },
            { "text": "Strong focus on software design and architecture" },
            { "text": "Internship opportunities with leading tech companies" }
          ]
        }
      ],
      "is_new": true
    },
    {
      "id": "ubc_science",
      "university_id": "ubc",
      "university_name": "University of British Columbia",
      "university_location": "Vancouver, BC",
      "faculty": "science",
      "program_name": "Science",
      "degree_type": "Bachelor of Science",
      "annual_tuition": 8113,
      "program_length": 4,
      "specializations": [
        { "name": "Machine Learning", "link": "/programs/ubc-ds-ml" },
        { "name": "Big Data Analytics", "link": "/programs/ubc-ds-bigdata" }
      ],
      "program_description": [
        {
          "text": "UBC's Data Science program prepares students to extract knowledge and insights from structured and unstructured data using scientific methods, processes, algorithms, and systems."
        }
      ],
      "language_of_instruction": "English",
      "program_requirements": ["english", "math_calculus", "math_algebra", "physics"],
      "application_deadline": [
        {
          "type": "early_admission",
          "date": "2024-01-01T00:00:00.000Z",
          "description": "Early admission deadline"
        },
        {
          "type": "regular_admission",
          "date": "2024-01-15T00:00:00.000Z",
          "description": "Regular admission deadline"
        }
      ],
      "career_opportunities": [
        {
          "text": "Graduates pursue careers as data scientists, data analysts, and machine learning engineers in various industries."
        }
      ],
      "tldr": [
        {
          "subheading": "Program Overview",
          "bullets": [
            { "text": "Interdisciplinary program combining statistics, computer science, and domain expertise" },
            { "text": "Hands-on experience with real-world data sets" },
            { "text": "Research opportunities with faculty" }
          ]
        }
      ],
      "is_new": true
    }
  ];