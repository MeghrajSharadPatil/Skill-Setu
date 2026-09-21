import React, { useState, useEffect } from "react";
import { GovHeader } from "./components/GovHeader";
import { StatsBanner } from "./components/StatsBanner";
import { CompetencyAssessment } from "./components/CompetencyAssessment";
import { LearningPathways } from "./components/LearningPathways";
import { AssessmentEngine } from "./components/AssessmentEngine";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { AiSahayakModal } from "./components/AiSahayakModal";
import { KarmayogiCertificateModal } from "./components/KarmayogiCertificateModal";
import { UserProfileModal } from "./components/UserProfileModal";
import { SignInModal } from "./components/SignInModal";
import { SignInPage } from "./components/SignInPage";
import { WelcomeAnimation } from "./components/WelcomeAnimation";
import { supabase } from "./supabaseClient";

import { 
  INITIAL_OFFICIAL_PROFILES, 
  INITIAL_SKILLS, 
  IGOT_COURSE_CATALOGUE, 
  TRAINING_MATERIAL_PRESETS 
} from "./data/curriculumData";
import { OfficialProfile, SkillItem, IGOTCourse } from "./types";
import { 
  Bot, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  FileText,
  LogIn
} from "lucide-react";

export default function App() {
  // Global Profile state (defaults to Senior Statistical Officer Dr. Rajesh Sharma)
  const [profiles, setProfiles] = useState<OfficialProfile[]>(INITIAL_OFFICIAL_PROFILES);
  const [currentProfile, setCurrentProfile] = useState<OfficialProfile>(INITIAL_OFFICIAL_PROFILES[0]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Skills state for current profile
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);

  // Courses state
  const [courses, setCourses] = useState<IGOTCourse[]>(IGOT_COURSE_CATALOGUE);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>("overview");

  // UI preferences
  const [language, setLanguage] = useState<"en" | "hi">("en");

  // Pathways filter pass-through
  const [pathwayFilterKeyword, setPathwayFilterKeyword] = useState<string>("");

  // Modals state
  const [isSahayakOpen, setIsSahayakOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [certificateModalCourse, setCertificateModalCourse] = useState<IGOTCourse | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(true);

  // Protect private pages with supabase.auth.getSession() — if no session, redirect to /login
  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const user = session.user;
          const userEmail = (user.email || "").trim();
          
          // Check if user has saved profile locally
          const savedProfileStr = localStorage.getItem("skillsetu_user_profile_" + userEmail.toLowerCase());
          let savedProfile: OfficialProfile | null = null;
          if (savedProfileStr) {
            try {
              savedProfile = JSON.parse(savedProfileStr);
            } catch {
              // ignore
            }
          }

          const matchedProfile: OfficialProfile = savedProfile || {
            id: user.id || "user-" + Math.random().toString(36).substring(2, 9),
            name: user.user_metadata?.full_name || userEmail.split("@")[0] || "Statistical Officer",
            email: userEmail,
            designation: "",
            cadre: "Subordinate Statistical Service (SSS)",
            department: "",
            ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
            currentAssignment: "",
            experienceYears: 0,
            education: "",
            targetRole: "",
            karmayogiId: "",
            completedHours: 0,
            allocatedHours: 40,
            certificatesEarned: 0,
            authProvider: (user.app_metadata?.provider as "google" | "email") || "email",
            lastLoginAt: new Date().toLocaleTimeString(),
            authSessionId: session.access_token.slice(0, 16) + "...",
          };
          setCurrentProfile(matchedProfile);
          setIsAuthenticated(true);
          if (window.location.pathname === "/login") {
            window.history.pushState({}, "", "/");
          }
        } else {
          setIsAuthenticated(false);
          if (window.location.pathname !== "/login") {
            window.history.pushState({}, "", "/login");
          }
        }
      } catch (err) {
        console.warn("Auth session check error:", err);
      }
    }

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "USER_UPDATED") && session?.user) {
        setIsAuthenticated(true);
        if (window.location.pathname === "/login") {
          window.history.pushState({}, "", "/");
        }
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        window.history.pushState({}, "", "/login");
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Update officer profile & persist
  const handleUpdateProfile = (updatedProfile: OfficialProfile) => {
    setCurrentProfile(updatedProfile);
    if (updatedProfile.email) {
      localStorage.setItem(
        "skillsetu_user_profile_" + updatedProfile.email.toLowerCase(),
        JSON.stringify(updatedProfile)
      );
    }
  };

  // Sign In handler
  const handleSignIn = (profile: OfficialProfile) => {
    const userEmail = (profile.email || "").toLowerCase();
    const savedProfileStr = localStorage.getItem("skillsetu_user_profile_" + userEmail);
    let finalProfile = profile;
    if (savedProfileStr) {
      try {
        finalProfile = { ...profile, ...JSON.parse(savedProfileStr) };
      } catch {
        // ignore
      }
    }
    setCurrentProfile(finalProfile);
    setIsAuthenticated(true);
    setIsSignInOpen(false);
    window.history.pushState({}, "", "/");
  };

  // Sign Out handler
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn("Sign out err:", err);
    }
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    setIsSignInOpen(false);
    window.history.pushState({}, "", "/login");
  };

  // Adjust skill level manually via slider
  const handleUpdateSkillLevel = (skillId: string, newLevel: number) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === skillId ? { ...s, currentLevel: Math.round(newLevel * 10) / 10 } : s))
    );
  };

  // Course enrollment
  const handleEnrollCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, status: "In Progress", progressPercentage: 25 }
          : c
      )
    );
  };

  // Course completion & update profile hours
  const handleCompleteCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, status: "Completed", progressPercentage: 100 }
          : c
      )
    );

    // Increment profile learning hours and certificates
    setCurrentProfile((prev) => ({
      ...prev,
      completedHours: prev.completedHours + course.durationHours,
      certificatesEarned: prev.certificatesEarned + 1,
    }));

    // Also boost mapped skills
    setSkills((prev) =>
      prev.map((s) => {
        if (course.competencyMapped.some((m) => s.name.toLowerCase().includes(m.toLowerCase()) || m.toLowerCase().includes(s.name.toLowerCase()))) {
          return { ...s, currentLevel: Math.min(5.0, Math.round((s.currentLevel + 0.4) * 10) / 10) };
        }
        return s;
      })
    );
  };

  // Allocate courses automatically based on MCQ test performance
  const handleAllocateCoursesFromQuiz = (competencyTag: string, scorePercentage: number) => {
    // 1. Update competency assessment score in skills state
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase().includes(competencyTag.toLowerCase()) || competencyTag.toLowerCase().includes(s.name.toLowerCase())) {
          return {
            ...s,
            recentAssessmentScore: scorePercentage,
          };
        }
        return s;
      })
    );

    // 2. Mark matching iGOT courses as allocated with personalized justification
    setCourses((prev) =>
      prev.map((c) => {
        const matchesTag = c.competencyMapped.some(
          (m) =>
            m.toLowerCase().includes(competencyTag.toLowerCase()) ||
            competencyTag.toLowerCase().includes(m.toLowerCase())
        );

        if (matchesTag) {
          const reason =
            scorePercentage < 70
              ? `Remedial Allocation: Score of ${scorePercentage}% in MCQ assessment revealed foundational competency gaps in ${competencyTag}.`
              : `Progression Allocation: Qualified MCQ assessment (${scorePercentage}%). Allocated to advance proficiency towards cadre role benchmark.`;

          return {
            ...c,
            isAllocated: true,
            allocationReason: reason,
            status: c.status === "Completed" ? "Completed" : "In Progress",
          };
        }
        return c;
      })
    );
  };

  // Boost skill when passing an assessment
  const handleCompetencyGain = (competencyName: string, scoreGained: number) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name.toLowerCase().includes(competencyName.toLowerCase()) || competencyName.toLowerCase().includes(s.name.toLowerCase())) {
          return { ...s, currentLevel: Math.min(5.0, Math.round((s.currentLevel + scoreGained) * 10) / 10) };
        }
        return s;
      })
    );
    setCurrentProfile((prev) => ({
      ...prev,
      completedHours: prev.completedHours + 2,
    }));
  };

  // View certificate for course
  const handleViewCertificate = (course: IGOTCourse) => {
    setCertificateModalCourse(course);
    setIsCertificateOpen(true);
  };

  // Navigate to pathways with specific search keyword
  const handleNavigateToPathways = (keyword?: string) => {
    if (keyword) setPathwayFilterKeyword(keyword);
    setActiveTab("pathways");
  };

  // If user is not authenticated, show the official Sign In Page
  // (with Welcome Intro animation running on first entry)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040D1B]">
        <SignInPage
          profiles={profiles}
          onSignIn={handleSignIn}
          language={language}
          setLanguage={setLanguage}
          onOpenWelcome={() => setIsWelcomeOpen(true)}
        />

        {/* Welcome Animation Modal */}
        <WelcomeAnimation
          isOpen={isWelcomeOpen}
          onClose={() => setIsWelcomeOpen(false)}
          language={language}
          onExploreSection={(tabId) => {
            setActiveTab(tabId);
            setIsWelcomeOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-slate-800 flex flex-col text-[15px]">
      {/* 1. Official Government Top Header */}
      <GovHeader
        currentProfile={currentProfile}
        isAuthenticated={isAuthenticated}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSignOut={handleSignOut}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onOpenSahayak={() => setIsSahayakOpen(true)}
        onOpenWelcome={() => setIsWelcomeOpen(true)}
      />

      {/* 2. Main Body Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* TAB 1: OVERVIEW & NATIONAL STATS BANNER */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* SkillSetu Welcome Ribbon Banner */}
            <div className="bg-gradient-to-r from-[#0B2545] via-[#0E3563] to-[#1258A2] rounded-2xl p-5 sm:p-6 text-white shadow-md border border-blue-900/40 relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {language === "hi" ? "आधिकारिक मंच" : "Official Platform"}
                    </span>
                    <span className="text-xs text-blue-200">
                      MoSPI & NSSTA • iGOT Karmayogi
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    <span>
                      {language === "hi"
                        ? `स्वागत है, ${currentProfile.name}`
                        : `Welcome, ${currentProfile.name}`}
                    </span>
                    <span className="text-amber-400 font-serif text-base sm:text-lg font-normal">| सेतु</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
                    {language === "hi"
                      ? "भारतीय आधिकारिक सांख्यिकी प्रणाली के लिए AI-सक्षम योग्यता पहचान, अनुकूलित पाठ्यचर्या व दक्ष भारत 2047 सेतु।"
                      : "National statistical competency architecture bridging official cadre profiling, automated MCQ diagnostics, and personalized iGOT Karmayogi learning pathways."}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsWelcomeOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-amber-950/30 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
                  title="Replay the SkillSetu Welcome Animation"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{language === "hi" ? "परिचय एनीमेशन देखें" : "Watch Welcome Intro"}</span>
                </button>
              </div>
            </div>

            <StatsBanner
              language={language}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />

            {/* Quick Officer / Student Snapshot Card / Guest Sign In Banner */}
            {isAuthenticated ? (
              <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="w-12 h-12 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0B4F9C] flex items-center justify-center font-extrabold text-lg transition cursor-pointer shadow-xs shrink-0"
                    title="Click to view full profile"
                  >
                    {currentProfile.name.split(" ")[1]?.[0] || currentProfile.name[0] || "U"}
                  </button>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        currentProfile.userType === "student"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {currentProfile.cadre}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {currentProfile.userType === "student" ? "Roll / ID: " : "Karmayogi ID: "}
                        {currentProfile.karmayogiId || (currentProfile.userType === "student" ? "Enrolled Student" : "Active Officer")}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5 flex items-center gap-2">
                      <span>Welcome back, {currentProfile.name}</span>
                      <button
                        onClick={() => setIsProfileOpen(true)}
                        className="text-xs text-[#0B4F9C] font-semibold hover:underline cursor-pointer"
                      >
                        (View Profile)
                      </button>
                    </h3>
                    <p className="text-xs text-slate-600">
                      {currentProfile.userType === "student" ? (
                        <span>
                          {currentProfile.education || currentProfile.designation || "Statistics Scholar"}
                          {currentProfile.ministry ? ` • ${currentProfile.ministry}` : ""}
                        </span>
                      ) : (
                        <span>
                          {currentProfile.designation || "Statistical Officer"}
                          {currentProfile.department ? ` • ${currentProfile.department}` : (currentProfile.ministry ? ` • ${currentProfile.ministry}` : "")}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActiveTab("assessment")}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>
                      {currentProfile.userType === "student" 
                        ? "Take Practice MCQs & Diagnostic →" 
                        : "Solve MCQs to Identify Gaps & Get Courses →"}
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("pathways")}
                    className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-2xs flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {currentProfile.userType === "student" 
                        ? `Study Courses (${courses.filter(c => c.isAllocated).length})` 
                        : `View Allocated Courses (${courses.filter(c => c.isAllocated).length})`}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-[#0b2545] to-[#133054] text-white rounded-xl shadow-xs border border-blue-800 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center font-extrabold text-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded uppercase tracking-wider">
                        Official MoSPI & iGOT Portal
                      </span>
                      <span className="text-xs text-slate-300">
                        Statistical Service Sign In
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      You are currently viewing as Guest Officer
                    </h3>
                    <p className="text-xs text-slate-300">
                      Sign in with your Karmayogi ID to record competency scores and receive personalized iGOT course allocations.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In with Karmayogi ID →
                  </button>
                </div>
              </div>
            )}

            {/* Core Capability Spotlight - Clear 3-Step Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                onClick={() => setActiveTab("assessment")}
                className="bg-white rounded-xl border-2 border-amber-400 p-5 shadow-xs hover:shadow-md transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#0B4F9C] transition flex items-center justify-between">
                  <span>Step 1: Solve MCQ Questions</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">Primary Flow</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Take objective AI assessments based on official MoSPI circulars, NSS survey methodologies, and SNA guidelines.
                </p>
                <div className="text-xs font-bold text-amber-800 pt-2 flex items-center gap-1">
                  Solve MCQs Now <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("assessment")}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#0B4F9C] hover:shadow-md transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B4F9C] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0B4F9C] transition">
                  Step 2: Understand Competency Gaps
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The system analyzes question-by-question responses, computes knowledge gaps, and provides pedagogical explanations.
                </p>
                <div className="text-xs font-bold text-[#0B4F9C] pt-2 flex items-center gap-1">
                  View Gap Diagnostics <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("pathways")}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#0B4F9C] hover:shadow-md transition cursor-pointer space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0B4F9C] transition">
                  Step 3: Allocated iGOT Courses
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Relevant iGOT Karmayogi and NSSTA courses are automatically allocated to your profile based on your test performance.
                </p>
                <div className="text-xs font-bold text-emerald-700 pt-2 flex items-center gap-1">
                  Browse Allocated Courses <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPETENCY & SKILL GAP */}
        {activeTab === "competency" && (
          <CompetencyAssessment
            profile={currentProfile}
            skills={skills}
            onUpdateSkillLevel={handleUpdateSkillLevel}
            onNavigateToPathways={handleNavigateToPathways}
            language={language}
          />
        )}

        {/* TAB 3: iGOT & NSSTA PATHWAYS */}
        {activeTab === "pathways" && (
          <LearningPathways
            courses={courses}
            profile={currentProfile}
            onEnrollCourse={handleEnrollCourse}
            onCompleteCourse={handleCompleteCourse}
            onViewCertificate={handleViewCertificate}
            filterKeyword={pathwayFilterKeyword}
            language={language}
          />
        )}

        {/* TAB 4: AI ASSESSMENT & MCQ ENGINE */}
        {activeTab === "assessment" && (
          <AssessmentEngine
            presets={TRAINING_MATERIAL_PRESETS}
            courses={courses}
            onCompetencyGain={handleCompetencyGain}
            onAllocateCourses={handleAllocateCoursesFromQuiz}
            onNavigateToPathways={handleNavigateToPathways}
            language={language}
          />
        )}

        {/* TAB 5: ANALYTICS DASHBOARD */}
        {activeTab === "analytics" && (
          <AnalyticsDashboard
            profile={currentProfile}
            skills={skills}
            courses={courses}
            language={language}
          />
        )}
      </main>

      {/* Floating AI Sahayak Trigger Button */}
      <button
        onClick={() => setIsSahayakOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-[#0B4F9C] hover:bg-[#083a75] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg border-2 border-amber-400 flex items-center gap-2 cursor-pointer transition hover:scale-105"
        title="Open Karmayogi Statistical AI Sahayak"
      >
        <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm">
          क
        </div>
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          Statistical AI Sahayak
        </span>
      </button>

      {/* 3. Official Government Footer */}
      <footer className="bg-[#0b2545] text-slate-300 border-t-4 border-[#FF9933] mt-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">SkillSetu (स्किलसेतु)</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An AI-enabled competency intelligence and personalized capacity building portal for the Official
              Statistical System of India.
            </p>
            <div className="text-amber-400 text-[11px] font-semibold">
              Aligned with National Programme for Civil Services Capacity Building (NPCSCB)
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Related Official Portals</div>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>
                <a href="https://igotkarmayogi.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  iGOT Karmayogi Bharat <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://mospi.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  Ministry of Statistics & PI (MoSPI) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="http://nssta.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  NSSTA Greater Noida <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://cbc.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  Capacity Building Commission (CBC) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Competency Frameworks</div>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Statistical & Methodological Competencies</li>
              <li>• Technical & Data Science Competencies</li>
              <li>• Digital Governance & DPDP Act 2023</li>
              <li>• Leadership & Behavioural Competencies</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="font-bold text-white text-sm">Security & Compliance</div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Hosted on National Informatics Centre (NIC) Government Cloud Infrastructure. Compliant with Government of India Cyber Security Guidelines and
              GIGW (Guidelines for Indian Government Websites) 3.0.
            </p>
            <div className="pt-2 text-[10px] text-slate-500 font-mono">
              Applet Build Version: 2026.4.1-MoSPI
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="bg-[#07172b] py-3 text-center text-slate-400 text-[11px] border-t border-slate-800">
          © {new Date().getFullYear()} National Statistical Systems Training Academy (NSSTA), Ministry of Statistics &
          Programme Implementation, Government of India. All Rights Reserved.
        </div>
      </footer>

      {/* AI Assistant Modal */}
      <AiSahayakModal
        isOpen={isSahayakOpen}
        onClose={() => setIsSahayakOpen(false)}
        profile={currentProfile}
        language={language}
      />

      {/* Official Certificate Modal */}
      <KarmayogiCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        profile={currentProfile}
        course={certificateModalCourse}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={currentProfile}
        onSignOut={handleSignOut}
        onUpdateProfile={handleUpdateProfile}
        language={language}
      />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        profiles={profiles}
        onSignIn={handleSignIn}
        language={language}
      />

      {/* Welcome Animation Modal */}
      <WelcomeAnimation
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        language={language}
        onExploreSection={(tabId) => setActiveTab(tabId)}
      />
    </div>
  );
}

