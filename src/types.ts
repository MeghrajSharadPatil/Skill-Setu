export type CompetencyDomain = 
  | "Statistical Competencies"
  | "Technical Competencies"
  | "Digital Governance"
  | "Behavioural and Managerial Competencies";

export interface SkillItem {
  id: string;
  name: string;
  domain: CompetencyDomain;
  description: string;
  currentLevel: number; // 1 to 5 scale
  requiredLevel: number; // 1 to 5 scale benchmark for role
  importance: "High" | "Critical" | "Medium";
  recentAssessmentScore?: number;
}

export type UserProfileType = "official" | "student";

export interface OfficialProfile {
  id: string;
  name: string;
  email: string;
  userType?: UserProfileType;
  designation: string;
  cadre: 
    | "Indian Statistical Service (ISS)" 
    | "Subordinate Statistical Service (SSS)" 
    | "State DES Official" 
    | "General Central Service"
    | "Student (Undergraduate/Postgraduate)"
    | "Research Scholar / Ph.D."
    | "Civil Services / ISS Aspirant";
  department: string; // e.g. "Department of Statistics & Mathematics" or "Field Operations Division (FOD)"
  ministry: string; // for official: "Ministry of Statistics and PI", for student: "University / College / Institute"
  currentAssignment: string; // for official: "Annual Survey of Industries", for student: "ISS Exam Preparation / Academic Studies"
  experienceYears: number; // for official: years of service, for student: year of study (1-5)
  education: string; // e.g. "B.Sc. Statistics", "M.Sc. Data Science", "Ph.D. Economics"
  targetRole: string; // e.g. "Indian Statistical Service (ISS)", "Data Scientist", "Public Policy Analyst"
  karmayogiId: string; // for official: Karmayogi ID, for student: Student ID / Roll No.
  completedHours: number;
  allocatedHours: number;
  certificatesEarned: number;
  authProvider?: "google" | "email" | "karmayogi_sso";
  lastLoginAt?: string;
  authSessionId?: string;
}

export interface IGOTCourse {
  id: string;
  courseCode: string;
  title: string;
  titleHindi?: string;
  provider: "NSSTA" | "iGOT Karmayogi Bharat" | "NITI Aayog" | "ISTM" | "NIC" | "IIPA" | "RBI College of Agr. Banking";
  category: CompetencyDomain;
  competencyMapped: string[];
  level: "Basic" | "Intermediate" | "Advanced";
  durationHours: number;
  rating: number;
  enrolledCount: number;
  completionRate: number;
  tpacApproved: boolean; // NSSTA's TPAC Recommended Training Programme
  format: "Self-Paced e-Learning" | "Virtual Lab" | "Blended / Hybrid" | "Classroom (NSSTA Greater Noida)";
  description: string;
  syllabus: string[];
  status: "Not Enrolled" | "In Progress" | "Completed";
  progressPercentage: number;
  isAllocated?: boolean;
  allocationReason?: string;
  recommendedRole?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competencyTag: string;
  difficulty: "Foundational" | "Intermediate" | "Advanced";
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;
  competencyGainTag: string;
  feedback: string;
}

export interface TrainingMaterialPreset {
  id: string;
  title: string;
  subtitle: string;
  domain: CompetencyDomain;
  sourceDoc: string;
  excerpt: string;
  wordCount: number;
}

export interface AdminAnalyticsMetrics {
  totalKarmayogis: string;
  totalCourses: string;
  totalCompletions: string;
  monthlyActive: string;
  certificatesIssuedYesterday: string;
  unionCBPs: number;
  stateCBPs: number;
  employeesWithCBPs: string;
  roleRelevantCompletions: string;
  competencyBreakdown: {
    domain: string;
    count: number;
    percentage: number;
  }[];
  levelDistribution: {
    level: string;
    count: number;
  }[];
  topEmergingSkills: {
    skill: string;
    growthDemand: string;
    urgency: "High" | "Medium" | "Critical";
  }[];
}
