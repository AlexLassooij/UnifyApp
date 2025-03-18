import { Application, ApplicationStatus } from "../datamodel/datamodel";

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