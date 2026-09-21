import React, { useState } from "react";
import { IGOTCourse, OfficialProfile, CompetencyDomain } from "../types";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  ExternalLink, 
  PlayCircle, 
  Filter, 
  Star, 
  ShieldCheck, 
  Search,
  FileText,
  Sparkles,
  Layers,
  Target,
  AlertCircle
} from "lucide-react";

interface LearningPathwaysProps {
  courses: IGOTCourse[];
  profile: OfficialProfile;
  onEnrollCourse: (courseId: string) => void;
  onCompleteCourse: (courseId: string) => void;
  onViewCertificate: (course: IGOTCourse) => void;
  filterKeyword?: string;
  language: "en" | "hi";
}

export const LearningPathways: React.FC<LearningPathwaysProps> = ({
  courses,
  profile,
  onEnrollCourse,
  onCompleteCourse,
  onViewCertificate,
  filterKeyword = "",
  language,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [onlyTPAC, setOnlyTPAC] = useState<boolean>(false);
  const [onlyAllocated, setOnlyAllocated] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(filterKeyword);
  const [activeSyllabusCourse, setActiveSyllabusCourse] = useState<IGOTCourse | null>(null);

  const allocatedCount = courses.filter((c) => c.isAllocated).length;

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesTPAC = !onlyTPAC || c.tpacApproved;
    const matchesAllocated = !onlyAllocated || c.isAllocated;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.competencyMapped.some((cmp) => cmp.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesTPAC && matchesAllocated && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Banner for iGOT & NSSTA Pathways */}
      <div className="bg-gradient-to-r from-[#0B4F9C] to-[#163f73] text-white rounded-xl shadow-xs p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              iGOT Karmayogi & NSSTA TPAC
            </span>
            <span className="text-xs text-blue-200">Rule-to-Role Learning Repository</span>
          </div>
          <h2 className="text-xl font-extrabold">
            {language === "hi"
              ? "सांख्यिकी अधिकारियों हेतु व्यक्तिगत प्रशिक्षण मार्ग"
              : "Personalized Learning Pathways for Official Statistics"}
          </h2>
          <p className="text-xs text-blue-100 max-w-2xl mt-1">
            Courses directly mapped to bridge your identified competency gaps in Survey Design, National Accounts,
            Data Quality, and Python/AI, aligned with NSSTA's Annual Training Calendar.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-lg text-xs space-y-1">
          <div className="text-amber-300 font-bold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Completed Hours: {profile.completedHours} / {profile.allocatedHours} hrs
          </div>
          <div className="text-blue-100">Certificates Earned: <strong>{profile.certificatesEarned}</strong></div>
        </div>
      </div>

      {/* 2. Filter and Search Controls */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by topic, competency, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4F9C]"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setOnlyAllocated(!onlyAllocated)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                onlyAllocated
                  ? "bg-[#0B4F9C] text-white shadow-2xs"
                  : "bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-600" />
              Allocated for Competency Gaps ({allocatedCount})
            </button>

            <button
              onClick={() => setOnlyTPAC(!onlyTPAC)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                onlyTPAC
                  ? "bg-amber-500 text-slate-950 shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              NSSTA TPAC Approved Only
            </button>

            {/* Clear Filters */}
            {(searchQuery || onlyTPAC || onlyAllocated || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setOnlyTPAC(false);
                  setOnlyAllocated(false);
                  setSelectedCategory("All");
                }}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Domain Category pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 text-xs">
          {[
            "All",
            "Statistical Competencies",
            "Technical Competencies",
            "Digital Governance",
            "Behavioural and Managerial Competencies",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? "bg-[#0B4F9C] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const isCompleted = course.status === "Completed";
          const isInProgress = course.status === "In Progress";

          return (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-md transition overflow-hidden group"
            >
              <div>
                {/* Course Header with Badge & Provider */}
                <div className="bg-slate-50 border-b border-slate-100 p-3.5 flex justify-between items-start">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-slate-500 block">
                      {course.courseCode}
                    </span>
                    <span className="text-xs font-bold text-[#0B4F9C]">{course.provider}</span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {course.isAllocated && (
                      <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Gap Allocated
                      </span>
                    )}
                    {course.tpacApproved && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-amber-700" />
                        TPAC Approved
                      </span>
                    )}
                    <span className="text-[10px] bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-[#0B4F9C] transition">
                    {course.title}
                  </h3>
                  {course.titleHindi && (
                    <div className="text-xs text-slate-500 font-serif">{course.titleHindi}</div>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {course.isAllocated && course.allocationReason && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-[11px] text-amber-900 flex items-start gap-1.5">
                      <Target className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Allocation Reason:</strong> {course.allocationReason}
                      </div>
                    </div>
                  )}

                  {/* Competency tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {course.competencyMapped.map((cmp, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-[#0B4F9C] text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-100"
                      >
                        {cmp}
                      </span>
                    ))}
                  </div>

                  {/* Course specs */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.durationHours} hrs
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {course.rating} ({course.enrolledCount.toLocaleString()} enrolled)
                    </span>
                  </div>

                  {/* Progress bar if in progress or completed */}
                  {(isInProgress || isCompleted) && (
                    <div className="pt-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
                        <span>Status: <strong>{course.status}</strong></span>
                        <span>{course.progressPercentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isCompleted ? "bg-emerald-500" : "bg-[#0B4F9C]"
                          }`}
                          style={{ width: `${course.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveSyllabusCourse(course)}
                  className="text-xs text-slate-700 hover:text-[#0B4F9C] font-semibold flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Syllabus
                </button>

                <div className="flex items-center gap-1.5">
                  {isCompleted ? (
                    <button
                      onClick={() => onViewCertificate(course)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Certificate
                    </button>
                  ) : isInProgress ? (
                    <button
                      onClick={() => onCompleteCourse(course.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-slate-950" />
                      Complete Module
                    </button>
                  ) : (
                    <button
                      onClick={() => onEnrollCourse(course.id)}
                      className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs transition"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      Enroll via iGOT
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Syllabus Modal */}
      {activeSyllabusCourse && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                  {activeSyllabusCourse.courseCode} • {activeSyllabusCourse.provider}
                </span>
                <h3 className="text-base font-bold text-slate-900">{activeSyllabusCourse.title}</h3>
              </div>
              <button
                onClick={() => setActiveSyllabusCourse(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
              {activeSyllabusCourse.description}
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Official Curriculum & Modules:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeSyllabusCourse.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 bg-slate-50/70 p-2 rounded border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#0B4F9C] flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Duration: {activeSyllabusCourse.durationHours} Hours</span>
              <button
                onClick={() => {
                  onEnrollCourse(activeSyllabusCourse.id);
                  setActiveSyllabusCourse(null);
                }}
                className="bg-[#0B4F9C] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#083a75] transition"
              >
                Enroll in Course Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
