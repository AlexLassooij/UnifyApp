import { SubheadingAndBulletPoints, SubheadingAndParagraph, SubheadingAndParagraphList, ParagraphList, TextField } from "../utility/text_types";

export type GradeLetter = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F"
export type Province = "AB" | "BC" | "MB" | "NB" | "NL" | "NS" | "NT" | "NU" | "ON" | "PE" | "QC" | "SK" | "YT" | null
export type CurriculumType = Province | "IB" | "AP";
export type Subject = 
  | "english" | "math_algebra" | "math_calculus" | "math_foundation" | "biology" | "chemistry" | "physics" 
  | "social_studies" | "other_language" | "fine_art" | "other" | "physical_education"
export type ApplicationStatus = "not_started" | "in_progress" | "completed" 
export type ApplicationOutcome = "pending" | "accepted" | "rejected" | "waitlisted" | "deferred" | "withdrawn" | "cancelled" | "expired"

export interface Course {
  subject: string;
  course_code: string; // will usually be one, e.g. Mathematics 30-1, but for subjects like social science there will be multiple. Use length of list, or another property to indicate whether the subject is singular or broad
}// maybe specify if one course is the 'primary' course, and the others are 'alternatives'
// just one, make duplicates if needed, fetch all matching the subject if needed


export interface Curriculum {
  curriculum_type: CurriculumType;
  subjects: Course[];
}

export interface UserGrade {
  curriculum_type: CurriculumType;
  subject: string;
  course_code: string;
  grade: number;
  year: string;
  completed: "in_progress" | "completed";
}

export interface User {
  id?: string
  name: string;
  email: string;
  high_school: string;
  curriculum: CurriculumType;
  province: Province;
  saved_programs: string[]; // FK, unique
  saved_universities: string[]; // FK, unique
  recommended_programs: string[]; // FK, unique
  recommended_universities: string[]; // FK, unique
  grades: UserGrade[];
  // TODO : add user preferences
}
    
export interface University {
  id?: string
  univesity_name: string;
  abbreviated_name: string;
  province: Province;
  location: string;
  qs_ranking: number;
  mcl_ranking: number;
  description: SubheadingAndParagraph[] | ParagraphList;
  academics: TextField[];
  student_orgs: TextField[];
  social_life: TextField[];
  athletics: TextField[];
  commute: boolean;
  housing_guaranteed: TextField[];
  housing_on_campus: TextField[];
  housing_off_campus: TextField[];
  student_faculty_ratio: string;
  international_ratio: string;
  gender_ratio: string;
  student_body_size: number;
  general_admision_requirements: string;
  accesibility: string;
  homepage: string
}

export interface Program {
  id?: string
  university_id: string;
  faculty: string;
  program_name: string;
  degree_type: string;
  specializations: { name: string; link: string }[]
  program_description: SubheadingAndParagraph[] | ParagraphList;
  program_length: number;
  language_of_instruction: "English" | "French";
  program_requirements: Subject[]; // may need to add ability to manually add specific requirements instead of automaticall converting from a base
  additional_requirements: SubheadingAndBulletPoints[];
  application_deadline: Date;
  other_deadlines: Date[];
  career_opportunities: SubheadingAndParagraph[] | SubheadingAndParagraphList;
  tldr: SubheadingAndBulletPoints[]
}

export interface Application {
  user_id: string;
  program_id: string;
  status: ApplicationStatus;
  application_date: Date;
  application_deadline: Date;
  last_updated: Date;
  notes: SubheadingAndBulletPoints[];
  sub_tasks: {
    name: string;
    status: ApplicationStatus;
    deadline: Date;
    notes: string;
  }[]
}

    // {
  //   curriculum: AB;
  //   courses: [
  //     {
  //       subject: math_algebra;
  //       curriculum_code: Mathematics 30-1
  //     };
  //     {
  //       subject: math_calculus;
  //       curriculum_code: Mathematics 31
  //     }
  //   ]
  // }