import React, { useState } from "react";
import { OfficialProfile, UserProfileType } from "../types";
import { supabase } from "../supabaseClient";
import { 
  X, 
  User, 
  Mail, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Award, 
  Clock, 
  LogOut, 
  CheckCircle2, 
  Target, 
  BookOpen,
  LayoutDashboard,
  Edit3, 
  Save, 
  Check,
  ShieldCheck,
  FileText,
  PhoneCall,
  School,
  Compass,
  Sparkles
} from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OfficialProfile;
  onSignOut: () => void;
  onUpdateProfile: (updatedProfile: OfficialProfile) => void;
  language: "en" | "hi";
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSignOut,
  onUpdateProfile,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<"cadre" | "dashboard">("cadre");

  // Edit / Update Profile State
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Helper to determine if current profile is a student/scholar
  const isProfileStudent = (p: OfficialProfile): boolean => {
    return p.userType === "student" || 
      p.cadre?.includes("Student") || 
      p.cadre?.includes("Scholar") || 
      p.cadre?.includes("Aspirant");
  };

  const isCurrentStudent = isProfileStudent(profile);

  // Form Fields State
  const [formData, setFormData] = useState({
    userType: (profile.userType || (isCurrentStudent ? "student" : "official")) as UserProfileType,
    name: profile.name || "",
    cadre: profile.cadre || (isCurrentStudent ? "Student (Undergraduate/Postgraduate)" : "Subordinate Statistical Service (SSS)"),
    designation: profile.designation || "",
    ministry: profile.ministry || (isCurrentStudent ? "" : "Ministry of Statistics and Programme Implementation (MoSPI)"),
    department: profile.department || "",
    currentAssignment: profile.currentAssignment || "",
    education: profile.education || "",
    experienceYears: profile.experienceYears || 0,
    targetRole: profile.targetRole || "",
    karmayogiId: profile.karmayogiId || "",
  });

  // Sync form data if profile changes
  React.useEffect(() => {
    const isStudent = isProfileStudent(profile);
    setFormData({
      userType: (profile.userType || (isStudent ? "student" : "official")) as UserProfileType,
      name: profile.name || "",
      cadre: profile.cadre || (isStudent ? "Student (Undergraduate/Postgraduate)" : "Subordinate Statistical Service (SSS)"),
      designation: profile.designation || "",
      ministry: profile.ministry || (isStudent ? "" : "Ministry of Statistics and Programme Implementation (MoSPI)"),
      department: profile.department || "",
      currentAssignment: profile.currentAssignment || "",
      education: profile.education || "",
      experienceYears: profile.experienceYears || 0,
      targetRole: profile.targetRole || "",
      karmayogiId: profile.karmayogiId || "",
    });
  }, [profile]);

  if (!isOpen) return null;

  const handleSignOutClick = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    onSignOut();
    onClose();
  };

  // Switch role type between Official and Student
  const handleSwitchUserType = (newType: UserProfileType) => {
    if (newType === formData.userType) return;
    if (newType === "student") {
      setFormData(prev => ({
        ...prev,
        userType: "student",
        cadre: (prev.cadre?.includes("Student") || prev.cadre?.includes("Scholar") || prev.cadre?.includes("Aspirant"))
          ? prev.cadre
          : "Student (Undergraduate/Postgraduate)",
        ministry: prev.ministry === "Ministry of Statistics and Programme Implementation (MoSPI)" ? "" : prev.ministry,
        designation: prev.designation || "Statistics Scholar & Aspirant",
        targetRole: prev.targetRole || "Indian Statistical Service (ISS) Examination",
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        userType: "official",
        cadre: (!prev.cadre?.includes("Student") && !prev.cadre?.includes("Scholar") && !prev.cadre?.includes("Aspirant"))
          ? prev.cadre
          : "Subordinate Statistical Service (SSS)",
        ministry: prev.ministry || "Ministry of Statistics and Programme Implementation (MoSPI)",
        designation: prev.designation === "Statistics Scholar & Aspirant" ? "Senior Statistical Officer (SSO)" : prev.designation,
        targetRole: prev.targetRole || "Assistant Director (Data Analytics & Sample Design)",
      }));
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const isStudent = formData.userType === "student";

    const updated: OfficialProfile = {
      ...profile,
      userType: formData.userType,
      name: formData.name.trim() || profile.name,
      cadre: formData.cadre as OfficialProfile["cadre"],
      designation: formData.designation.trim() || (isStudent ? "Statistics Student & Aspirant" : "Statistical Officer"),
      ministry: formData.ministry.trim() || (isStudent ? "University / Academic Institution" : "Ministry of Statistics and Programme Implementation (MoSPI)"),
      department: formData.department.trim(),
      currentAssignment: formData.currentAssignment.trim(),
      education: formData.education.trim(),
      experienceYears: Number(formData.experienceYears) || 0,
      targetRole: formData.targetRole.trim(),
      karmayogiId: formData.karmayogiId.trim(),
    };

    onUpdateProfile(updated);
    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Compute initials safely
  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "O";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with National Theme */}
        <div className="bg-gradient-to-r from-[#0B4F9C] via-[#0E3A6D] to-[#133054] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#0B4F9C] flex items-center justify-center font-black text-2xl shadow-md border-2 border-amber-400 shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 ${
                  isCurrentStudent 
                    ? "bg-emerald-400 text-emerald-950" 
                    : "bg-amber-400 text-slate-950"
                }`}>
                  {isCurrentStudent ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                  <span>{profile.cadre || (isCurrentStudent ? "Student / Scholar" : "Statistical Cadre")}</span>
                </span>
                
                {profile.karmayogiId && (
                  <span className="text-xs text-white/80 font-mono">
                    {isCurrentStudent ? "Roll / ID: " : "ID: "}{profile.karmayogiId}
                  </span>
                )}
                
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/40">
                  {profile.authProvider === "google" ? "Google SSO" : "Active Session"}
                </span>
              </div>
              <h3 className="text-xl font-extrabold flex items-center gap-2">
                <span>{profile.name}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </h3>
              <p className="text-xs text-white/90">
                {isCurrentStudent ? (
                  <span>
                    {profile.education || "Academic Scholar"}
                    {profile.ministry ? ` • ${profile.ministry}` : ""}
                  </span>
                ) : (
                  <span>
                    {profile.designation || (
                      <span className="italic text-amber-200">Designation not set (Click Update Profile)</span>
                    )}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Modal Tab Switcher */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/15">
            <button
              onClick={() => setActiveTab("cadre")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "cadre"
                  ? "bg-white text-[#0B4F9C] shadow-xs"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              {isCurrentStudent ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student & Academic Profile</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Officer Profile & Cadre</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("dashboard");
                setIsEditing(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "dashboard"
                  ? "bg-white text-[#0B4F9C] shadow-xs"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Simple Dashboard</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: CADRE / STUDENT PROFILE OVERVIEW */}
          {activeTab === "cadre" && (
            <>
              {/* Success Notification */}
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    {isCurrentStudent 
                      ? "Student & academic profile details updated successfully!" 
                      : "Officer profile details updated successfully!"}
                  </span>
                </div>
              )}

              {/* VIEW MODE */}
              {!isEditing ? (
                <div className="space-y-4">
                  {/* Action Bar */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        {isCurrentStudent ? (
                          <>
                            <GraduationCap className="w-4 h-4 text-[#0B4F9C]" />
                            <span>Student & Academic Learning Record</span>
                          </>
                        ) : (
                          <>
                            <Briefcase className="w-4 h-4 text-[#0B4F9C]" />
                            <span>Official Cadre & Deployment Record</span>
                          </>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {isCurrentStudent 
                          ? "Academic enrollment, university affiliation, and statistical career track."
                          : "Verified personal and organizational deployment information."}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B4F9C] hover:bg-[#093e7a] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Profile</span>
                    </button>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="space-y-3 bg-slate-50/70 border border-slate-200 rounded-xl p-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <span className="text-slate-500 block text-[11px]">Full Name</span>
                        <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5 text-xs">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {profile.name}
                        </span>
                      </div>

                      {/* Email Address */}
                      <div>
                        <span className="text-slate-500 block text-[11px]">Email Address</span>
                        <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5 text-xs">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {profile.email}
                        </span>
                      </div>

                      {/* Student vs Official Fields */}
                      {isCurrentStudent ? (
                        <>
                          {/* Student Track */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Academic Category / Track</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.cadre || <span className="text-amber-600 italic">Not set</span>}
                            </span>
                          </div>

                          {/* University / College */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">College / University / Institution</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <Building2 className="w-3.5 h-3.5 text-slate-400" />
                              {profile.ministry || <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>}
                            </span>
                          </div>

                          {/* Department / Faculty */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Department / Faculty / School</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.department || <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>}
                            </span>
                          </div>

                          {/* Degree Program */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Degree / Academic Program</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                              {profile.education || <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>}
                            </span>
                          </div>

                          {/* Year of Study */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Year of Study / Semester</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {profile.experienceYears > 0 
                                ? `Year ${profile.experienceYears} of Study` 
                                : <span className="text-slate-500">Undergraduate / Postgraduate</span>}
                            </span>
                          </div>

                          {/* Student Roll No */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Student Roll No. / Enrollment ID</span>
                            <span className="font-semibold text-slate-800 font-mono mt-0.5 block text-xs">
                              {profile.karmayogiId || <span className="text-slate-400 italic font-sans">Not set</span>}
                            </span>
                          </div>

                          {/* Target Career Track / Goal */}
                          <div className="sm:col-span-2">
                            <span className="text-slate-500 block text-[11px]">Target Career Goal / Competitive Examination</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <Target className="w-3.5 h-3.5 text-[#0B4F9C]" />
                              {profile.targetRole || <span className="text-amber-600 italic">Not specified (e.g. Indian Statistical Service, Data Scientist)</span>}
                            </span>
                          </div>

                          {/* Current Academic Focus */}
                          <div className="sm:col-span-2">
                            <span className="text-slate-500 block text-[11px]">Current Academic Focus & Core Subjects</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              {profile.currentAssignment || <span className="text-slate-500 italic">General Statistics & Data Science</span>}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Official Cadre */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Official Cadre</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.cadre || <span className="text-amber-600 italic">Not set</span>}
                            </span>
                          </div>

                          {/* Official Designation */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Official Designation</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.designation || (
                                <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>
                              )}
                            </span>
                          </div>

                          {/* Ministry */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Ministry</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <Building2 className="w-3.5 h-3.5 text-slate-400" />
                              {profile.ministry || (
                                <span className="text-amber-600 italic">Not specified</span>
                              )}
                            </span>
                          </div>

                          {/* Department */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Department / Division / Office</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.department || (
                                <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>
                              )}
                            </span>
                          </div>

                          {/* Current Posting */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Current Posting / Assignment</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.currentAssignment || (
                                <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>
                              )}
                            </span>
                          </div>

                          {/* Qualifications */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Academic & Professional Qualifications</span>
                            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                              {profile.education || (
                                <span className="text-amber-600 italic">Not specified (Click Update Profile)</span>
                              )}
                            </span>
                          </div>

                          {/* Years of Service */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">Years of Service / Experience</span>
                            <span className="font-semibold text-slate-800 mt-0.5 block text-xs">
                              {profile.experienceYears > 0 
                                ? `${profile.experienceYears} Years` 
                                : <span className="text-slate-400 italic">Not specified</span>}
                            </span>
                          </div>

                          {/* Karmayogi ID */}
                          <div>
                            <span className="text-slate-500 block text-[11px]">iGOT Karmayogi ID / Employee Code</span>
                            <span className="font-semibold text-slate-800 font-mono mt-0.5 block text-xs">
                              {profile.karmayogiId || (
                                <span className="text-slate-400 italic font-sans">Not set</span>
                              )}
                            </span>
                          </div>

                          {/* Target Role */}
                          {profile.targetRole && (
                            <div className="sm:col-span-2">
                              <span className="text-slate-500 block text-[11px]">Target Role / Career Progression</span>
                              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 text-xs">
                                <Target className="w-3.5 h-3.5 text-[#0B4F9C]" />
                                {profile.targetRole}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Informational Prompt if details are missing */}
                  {((isCurrentStudent && (!profile.ministry || !profile.education)) ||
                    (!isCurrentStudent && (!profile.designation || !profile.department))) && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold">
                          {isCurrentStudent ? "Complete Your Student Profile" : "Complete Your Officer Profile"}
                        </div>
                        <div className="text-[11px] text-amber-800 mt-0.5">
                          {isCurrentStudent
                            ? "Add your university, academic degree, and target career track to receive customized study materials and ISS exam syllabus modules."
                            : "Add your official designation and department to receive targeted competency assessments and course recommendations."}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs whitespace-nowrap transition cursor-pointer shrink-0"
                      >
                        Add Info
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* EDIT / UPDATE PROFILE FORM */
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-[#0B4F9C]" />
                        <span>Update Profile Details</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Select whether you are a Government Officer or University Student / Scholar below.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* PROFILE TYPE SWITCHER (OFFICIAL vs STUDENT) */}
                  <div className="bg-slate-100 p-2 rounded-xl border border-slate-200">
                    <label className="block text-[10px] font-extrabold text-slate-600 mb-1.5 px-1 uppercase tracking-wider">
                      I am using this portal as:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleSwitchUserType("official")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                          formData.userType === "official"
                            ? "bg-[#0B4F9C] text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                        }`}
                      >
                        <Briefcase className="w-4 h-4 shrink-0" />
                        <span>Government Official / Officer</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSwitchUserType("student")}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                          formData.userType === "student"
                            ? "bg-[#0B4F9C] text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 shrink-0" />
                        <span>Student / Academic Scholar</span>
                      </button>
                    </div>
                  </div>

                  {/* FORM FIELDS CONDITIONED ON USER TYPE */}
                  {formData.userType === "student" ? (
                    /* STUDENT PROFILE FIELDS */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Aakash Varma"
                        />
                      </div>

                      {/* Student Track */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Academic Category / Track
                        </label>
                        <select
                          value={formData.cadre}
                          onChange={(e) => setFormData({ ...formData, cadre: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs bg-white"
                        >
                          <option value="Student (Undergraduate/Postgraduate)">Student (Undergraduate/Postgraduate)</option>
                          <option value="Research Scholar / Ph.D.">Research Scholar / Ph.D.</option>
                          <option value="Civil Services / ISS Aspirant">Civil Services / ISS Aspirant</option>
                        </select>
                      </div>

                      {/* College / University */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          College / University / Educational Institution *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.ministry}
                          onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Delhi University / Indian Statistical Institute (ISI)"
                        />
                      </div>

                      {/* Department / Faculty */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Department / Faculty / School
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Department of Statistics & Operations Research"
                        />
                      </div>

                      {/* Degree Program */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Degree / Academic Program
                        </label>
                        <input
                          type="text"
                          value={formData.education}
                          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. B.Sc. (Hons) Statistics / M.Sc. Statistics / M.A. Economics"
                        />
                      </div>

                      {/* Year of Study */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Current Year of Study
                        </label>
                        <select
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs bg-white"
                        >
                          <option value="1">1st Year (Undergraduate / Masters)</option>
                          <option value="2">2nd Year (Undergraduate / Masters)</option>
                          <option value="3">3rd / Final Year (Undergraduate)</option>
                          <option value="4">4th Year / Postgrad Year 2</option>
                          <option value="5">Ph.D. / Doctoral Research Fellow</option>
                          <option value="0">Graduated / Full-Time ISS Aspirant</option>
                        </select>
                      </div>

                      {/* Target Career Goal / Competitive Exam */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Target Career Goal / Competitive Exam Track
                        </label>
                        <input
                          type="text"
                          value={formData.targetRole}
                          onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Indian Statistical Service (ISS) Exam / Data Scientist in Public Sector / RBI Grade B"
                        />
                      </div>

                      {/* Current Academic Focus / Subjects */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Current Academic Focus & Core Subjects
                        </label>
                        <input
                          type="text"
                          value={formData.currentAssignment}
                          onChange={(e) => setFormData({ ...formData, currentAssignment: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Survey Sampling Theory, Econometrics, Probability & Mathematical Statistics, Python/R"
                        />
                      </div>

                      {/* Student ID / Roll No */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Student Roll No. / Enrollment ID (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.karmayogiId}
                          onChange={(e) => setFormData({ ...formData, karmayogiId: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. DU-STAT-2024-8831"
                        />
                      </div>

                      {/* Academic Designation / Status */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Academic Bio Title
                        </label>
                        <input
                          type="text"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. M.Sc. Statistics Scholar & ISS Aspirant"
                        />
                      </div>
                    </div>
                  ) : (
                    /* GOVERNMENT OFFICIAL PROFILE FIELDS */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Statistical Officer Name"
                        />
                      </div>

                      {/* Official Cadre */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Cadre / Service
                        </label>
                        <select
                          value={formData.cadre}
                          onChange={(e) => setFormData({ ...formData, cadre: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs bg-white"
                        >
                          <option value="Subordinate Statistical Service (SSS)">Subordinate Statistical Service (SSS)</option>
                          <option value="Indian Statistical Service (ISS)">Indian Statistical Service (ISS)</option>
                          <option value="State DES Official">State DES Official</option>
                          <option value="General Central Service">General Central Service</option>
                        </select>
                      </div>

                      {/* Designation */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Official Designation
                        </label>
                        <input
                          type="text"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Senior Statistical Officer (SSO)"
                        />
                      </div>

                      {/* Ministry */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Ministry
                        </label>
                        <input
                          type="text"
                          value={formData.ministry}
                          onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Ministry of Statistics and Programme Implementation (MoSPI)"
                        />
                      </div>

                      {/* Department / Division */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Department / Division / Field Unit
                        </label>
                        <input
                          type="text"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Field Operations Division (FOD), Regional Office"
                        />
                      </div>

                      {/* Current Assignment */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Current Posting / Primary Assignment
                        </label>
                        <input
                          type="text"
                          value={formData.currentAssignment}
                          onChange={(e) => setFormData({ ...formData, currentAssignment: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Annual Survey of Industries (ASI) / Price Statistics"
                        />
                      </div>

                      {/* Academic Qualifications */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Academic Qualifications
                        </label>
                        <input
                          type="text"
                          value={formData.education}
                          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. M.Sc. in Statistics"
                        />
                      </div>

                      {/* Years of Experience */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Years of Service / Experience
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={formData.experienceYears}
                          onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="0"
                        />
                      </div>

                      {/* Target Role */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Target Role / Career Progression
                        </label>
                        <input
                          type="text"
                          value={formData.targetRole}
                          onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. Assistant Director (Data Analytics & Sample Design)"
                        />
                      </div>

                      {/* Karmayogi ID */}
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Karmayogi Bharat ID / Employee Code (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.karmayogiId}
                          onChange={(e) => setFormData({ ...formData, karmayogiId: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B4F9C] focus:border-transparent text-xs"
                          placeholder="e.g. KMY-2024-XXXX"
                        />
                      </div>
                    </div>
                  )}

                  {/* Form Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B4F9C] hover:bg-[#093e7a] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Profile</span>
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* TAB 2: SIMPLE DASHBOARD (NO API KEYS OR TECHNICAL SECRETS) */}
          {activeTab === "dashboard" && (
            <div className="space-y-4">
              {/* Summary Card (Student vs Official) */}
              <div className="bg-gradient-to-r from-[#0B4F9C] to-[#133A6B] rounded-xl p-4 text-white shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    {isCurrentStudent ? (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Student & Scholar Overview</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Officer Overview</span>
                      </>
                    )}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {isCurrentStudent ? "Academic Portal Active" : "Portal Active"}
                  </span>
                </div>

                <div className="text-base font-bold text-white">{profile.name}</div>
                <div className="text-xs text-blue-100 mt-0.5">
                  {isCurrentStudent ? (
                    <span>{profile.education || "Statistics Scholar"} • {profile.cadre}</span>
                  ) : (
                    <span>{profile.designation ? profile.designation : "Designation not set"} • {profile.cadre}</span>
                  )}
                </div>
                <div className="text-[11px] text-blue-200/80 mt-1">
                  {profile.ministry || (isCurrentStudent ? "Affiliated University" : "Ministry of Statistics and Programme Implementation")}
                </div>
              </div>

              {/* 3 Simple Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-[#0B4F9C]">
                    <Target className="w-4 h-4" />
                    <span className="font-bold text-slate-900">
                      {isCurrentStudent ? "Syllabus Competencies" : "Competencies"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {isCurrentStudent
                      ? "Skill tracking covering Probability, Inference, Sample Surveys, and Econometrics."
                      : "Personalized skill assessment across official statistical domains."}
                  </p>
                  <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    {isCurrentStudent ? "ISS Syllabus Aligned" : "Diagnostic Ready"}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-[#0B4F9C]">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-bold text-slate-900">
                      {isCurrentStudent ? "Datasets & Study Labs" : "iGOT Courses"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {isCurrentStudent
                      ? "MoSPI official datasets, NSS survey rounds, SNA 2008, and Python/R labs."
                      : "National curriculum mapped to your statistical cadre & role."}
                  </p>
                  <div className="mt-2 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block">
                    {isCurrentStudent ? "MoSPI Materials" : "Curriculum Aligned"}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2 text-[#0B4F9C]">
                    <Award className="w-4 h-4" />
                    <span className="font-bold text-slate-900">
                      {isCurrentStudent ? "Quizzes & Badges" : "Certificates"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {isCurrentStudent
                      ? "Interactive MCQs, timed mock examinations, and verified skill badges."
                      : "Digital verification aligned with NSSTA and Karmayogi standards."}
                  </p>
                  <div className="mt-2 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded inline-block">
                    {isCurrentStudent ? "Academic Verified" : "Karmayogi Verified"}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B4F9C]" />
                  <span>Account & Access Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500 block">Registered Email</span>
                    <span className="font-semibold text-slate-800 truncate block mt-0.5">{profile.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Authentication Type</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {profile.authProvider === "google" ? "Google Single Sign-On" : "Email & Password"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Account Category</span>
                    <span className="font-semibold text-emerald-700 block mt-0.5">
                      {isCurrentStudent ? "University Student / Academic Scholar" : "Government Statistical Officer"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Institutional Affiliation</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {profile.ministry || (isCurrentStudent ? "Enrolled University" : "MoSPI / DES")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Support & Assistance */}
              <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-3.5 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0B4F9C] text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">
                      {isCurrentStudent ? "NSSTA Student & Aspirant Desk" : "NSSTA & Karmayogi Helpdesk"}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Support: <span className="font-medium text-[#0B4F9C]">
                        {isCurrentStudent ? "academic-support@mospi.gov.in" : "support-nssta@gov.in"}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                  Mon - Fri (09:30 - 18:00 IST)
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleSignOutClick}
            className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out of Portal
          </button>

          <div className="flex items-center gap-2">
            {activeTab === "dashboard" && (
              <button
                onClick={() => setActiveTab("cadre")}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition cursor-pointer"
              >
                Back to Profile
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs cursor-pointer"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
