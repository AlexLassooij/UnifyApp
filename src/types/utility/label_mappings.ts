import { GradeLetter, Province, CurriculumType, Subject, ApplicationStatus, ApplicationOutcome } from "../datamodel/datamodel";

export const GradeLetterLabels: Record<GradeLetter, string> = {
  "A+": "A+",
  "A": "A",
  "A-": "A-",
  "B+": "B+",
  "B": "B",
  "B-": "B-",
  "C+": "C+",
  "C": "C",
  "C-": "C-",
  "D+": "D+",
  "D": "D",
  "D-": "D-",
  "F": "F"
};

export const PercentageToGradeLetter = (percentage: number): GradeLetter => {
    if (percentage >= 90) return "A+";
    if (percentage >= 85) return "A";
    if (percentage >= 80) return "A-";
    if (percentage >= 77) return "B+";
    if (percentage >= 73) return "B";
    if (percentage >= 70) return "B-";
    if (percentage >= 67) return "C+";
    if (percentage >= 63) return "C";
    if (percentage >= 60) return "C-";
    if (percentage >= 57) return "D+";
    if (percentage >= 53) return "D";
    if (percentage >= 50) return "D-";
    return "F";
  };

export const ProvinceLabels: Record<Province, string> = {
  "AB": "Alberta",
  "BC": "British Columbia",
  "MB": "Manitoba",
  "NB": "New Brunswick",
  "NL": "Newfoundland and Labrador",
  "NS": "Nova Scotia",
  "NT": "Northwest Territories",
  "NU": "Nunavut",
  "ON": "Ontario",
  "PE": "Prince Edward Island",
  "QC": "Quebec",
  "SK": "Saskatchewan",
  "YT": "Yukon"
};

export const CurriculumTypeLabels: Record<CurriculumType, string> = {
  "AB": "Alberta",
  "BC": "British Columbia",
  "MB": "Manitoba",
  "NB": "New Brunswick",
  "NL": "Newfoundland and Labrador",
  "NS": "Nova Scotia",
  "NT": "Northwest Territories",
  "NU": "Nunavut",
  "ON": "Ontario",
  "PE": "Prince Edward Island",
  "QC": "Quebec",
  "SK": "Saskatchewan",
  "YT": "Yukon",
  "IB": "International Baccalaureate",
  "AP": "Advanced Placement"
};

export const SubjectLabels: Record<Subject, string> = {
  "english": "English",
  "math_algebra": "Math Algebra",
  "math_calculus": "Math Calculus",
  "math_foundation": "Math Foundation",
  "biology": "Biology",
  "chemistry": "Chemistry",
  "physics": "Physics",
  "social_studies": "Social Studies",
  "other_language": "Other Language",
  "fine_art": "Fine Arts",
  "other": "Other",
  "physical_education": "Physical Education"
};

export const ApplicationStatusLabels: Record<ApplicationStatus, string> = {
  "not_started": "Not Started",
  "in_progress": "In Progress",
  "completed": "Completed"
};

export const ApplicationOutcomeLabels: Record<ApplicationOutcome, string> = {
  "pending": "Pending",
  "accepted": "Accepted",
  "rejected": "Rejected",
  "waitlisted": "Waitlisted",
  "deferred": "Deferred",
  "withdrawn": "Withdrawn",
  "cancelled": "Cancelled",
  "expired": "Expired"
};