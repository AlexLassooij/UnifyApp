import { SubheadingAndBulletPoints, SubheadingAndParagraph, SubheadingAndParagraphList, ParagraphList, TextField } from "../utility/text_types";

export type GradeLetter = "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-" | "F"
export type Province = "AB" | "BC" | "MB" | "NB" | "NL" | "NS" | "NT" | "NU" | "ON" | "PE" | "QC" | "SK" | "YT" | "none";
export type CurriculumType = Province | "IB" | "AP";
export type FacultyType = "agriculture" | "applied_sciences" | "architecture" | "arts" | "biology" | "business" | "commerce" | "communication" | "computer_science" | "continuing_education" | "dentistry" | "education" | "engineering" | "environment" | "fine_arts" | "forestry" | "graduate_studies" | "health_sciences" | "humanities" | "information_technology" | "journalism" | "kinesiology" | "law" | "library_science" | "mathematics" | "media_studies" | "medicine" | "music" | "nursing" | "other" | "pharmacy" | "public_health" | "public_policy" | "science" | "social_sciences" | "social_work" | "veterinary_medicine";
export type Subject = 
  | "english" | "math_algebra" | "math_calculus" | "math_foundation" | "biology" | "chemistry" | "physics" 
  | "social_studies" | "other_language" | "fine_art" | "other" | "physical_education"
export type ApplicationStatus = "not_started" | "in_progress" | "completed" 
export type ApplicationOutcome = "pending" | "accepted" | "rejected" | "waitlisted" | "deferred" | "withdrawn" | "cancelled" | "expired"
export type DeadlineType = "early_admission" | "regular_admission" | "scholarship" | "international" | "other"

export interface FacultyTypeOption {
  value: FacultyType; // Lowercase with underscores for backend
  label: string; // Display name
}



export interface Course {
  subject: Subject;
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
  id?: string;
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
  program_match_scores?: {
    program_id: string;
    score: number;
  }[];
}
    
export interface University {
  univesity_name: string;
  abbreviated_name: string;
  province: Province;
  location: string;
  qs_ranking: number;
  mcl_ranking: number;
  description: SubheadingAndParagraph[];
  academics: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  student_orgs: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  social_life: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  athletics: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  housing_guaranteed: SubheadingAndParagraph[];
  housing_on_campus: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  housing_off_campus: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  commute: boolean;
  student_faculty_ratio: string;
  international_ratio: string;
  gender_ratio: string;
  student_body_size: number;
  walk_score: number;
  general_admision_requirements: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  general_course_requirements: Subject[]; // may need to add ability to manually add specific requirements instead of automaticall converting from a base
  accesibility: string;
  strengths: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  mental_health_resources: SubheadingAndParagraph[] | SubheadingAndBulletPoints[];
  homepage: string
}

export interface Program {
  id: string;
  university_id: string
  university_name: string
  university_location: string;
  program_name: string;
  faculty: FacultyType; // may have to define a type
  degree_type: string;
  annual_tuition: number;
  program_length: number;
  specializations: { 
    name: string; 
    link: string 
  }[]
  program_description: SubheadingAndParagraph[];
  language_of_instruction: "English" | "French";
  program_requirements: Subject[]; // may need to add ability to manually add specific requirements instead of automaticall converting from a base
  specific_requirements?: {
    curriculum_type: CurriculumType;
    requirements: ParagraphList
  }[];
  additional_requirements?: ParagraphList;
  application_deadline: {
    type: DeadlineType,
    date: Date,
    description: string
  }[];
  career_opportunities: SubheadingAndParagraph[];
  tldr: SubheadingAndBulletPoints[]
  is_new?: boolean // Added for UI display
}

export interface Application {
  id?: string;
  program_id: string;
  university: string;
  program: string;
  status: ApplicationStatus;
  application_date: Date;
  application_deadline: Date;
  last_updated: Date;
  notes: ParagraphList;
  sub_tasks: {
    name: string;
    status: ApplicationStatus;
    deadline: Date;
    notes: string;
  }[]
}