import React, { useState } from "react";
import { OfficialProfile, SkillItem, CompetencyDomain } from "../types";
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sliders, 
  BarChart3, 
  RefreshCw,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  ChevronRight
} from "lucide-react";

interface CompetencyAssessmentProps {
  profile: OfficialProfile;
  skills: SkillItem[];
  onUpdateSkillLevel: (skillId: string, newLevel: number) => void;
  onNavigateToPathways: (domainFilter?: string) => void;
  language: "en" | "hi";
}

export const CompetencyAssessment: React.FC<CompetencyAssessmentProps> = ({
  profile,
  skills,
  onUpdateSkillLevel,
  onNavigateToPathways,
  language,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<CompetencyDomain | "All">("All");
  const [isAnalyzingGaps, setIsAnalyzingGaps] = useState(false);
  const [aiGapResults, setAiGapResults] = useState<any | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Domain list
  const domains: CompetencyDomain[] = [
    "Statistical Competencies",
    "Technical Competencies",
    "Digital Governance",
    "Behavioural and Managerial Competencies",
  ];

  const filteredSkills = selectedDomain === "All"
    ? skills
    : skills.filter((s) => s.domain === selectedDomain);

  // Calculate gaps
  const skillsWithGaps = skills
    .map((s) => ({
      ...s,
      gap: Number((s.requiredLevel - s.currentLevel).toFixed(1)),
    }))
    .sort((a, b) => b.gap - a.gap);

  const criticalGaps = skillsWithGaps.filter((s) => s.gap > 0.5);

  const runAiGapAnalysis = async () => {
    setIsAnalyzingGaps(true);
    try {
      const response = await fetch("/api/gemini/competency-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            designation: profile.designation,
            cadre: profile.cadre,
            department: profile.department,
            experience: profile.experienceYears,
            targetRole: profile.targetRole,
            competencies: skills.map((s) => ({ name: s.name, current: s.currentLevel, target: s.requiredLevel })),
          },
        }),
      });
      const data = await response.json();
      if (data.analysis) {
        setAiGapResults(data.analysis);
      }
    } catch (err) {
      console.error("AI gap analysis error:", err);
    } finally {
      setIsAnalyzingGaps(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Official Officer Profile Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B4F9C] to-[#1a64b8] text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white text-2xl font-black border border-white/20 shadow-inner">
              {profile.name.split(" ")[1]?.[0] || "O"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                  {profile.cadre}
                </span>
                <span className="text-xs text-blue-200 font-mono">ID: {profile.karmayogiId}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-0.5">{profile.name}</h2>
              <p className="text-xs text-blue-100 font-medium">{profile.designation}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={runAiGapAnalysis}
              disabled={isAnalyzingGaps}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
            >
              {isAnalyzingGaps ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing MoSPI Framework...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-900" />
                  {language === "hi" ? "AI कौशल-अंतर मूल्यांकन चलाएं" : "Run AI Skill-Gap Analysis"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Profile metadata bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block font-medium">Department / Division</span>
            <span className="font-semibold text-slate-800">{profile.department}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">Current Assignment</span>
            <span className="font-semibold text-slate-800">{profile.currentAssignment}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">Target Promotion / Role</span>
            <span className="font-semibold text-[#0B4F9C]">{profile.targetRole}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-medium">Experience & Education</span>
            <span className="font-semibold text-slate-800">
              {profile.experienceYears} Years • {profile.education.split(",")[0]}
            </span>
          </div>
        </div>
      </div>

      {/* 2. AI Skill-Gap Analysis Results (If generated or top urgent gaps) */}
      <div className="bg-white rounded-xl shadow-xs border border-amber-200/80 overflow-hidden">
        <div className="bg-amber-50/90 border-b border-amber-200/80 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === "hi"
                  ? "एआई कौशल-अंतर निदान (AI Competency Gap Diagnosis)"
                  : "AI Competency Gap Diagnosis & Capacity Building Roadmap"}
              </h3>
              <p className="text-xs text-amber-900 font-medium">
                Target Role Benchmark: {profile.targetRole}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToPathways()}
            className="text-xs font-bold text-[#0B4F9C] hover:text-blue-800 flex items-center gap-1 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-2xs"
          >
            Bridge Gaps via iGOT →
          </button>
        </div>

        <div className="p-5 space-y-4">
          {aiGapResults ? (
            <div className="space-y-4">
              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-[#0B4F9C] block mb-1">MoSPI Executive Synthesis:</span>
                {aiGapResults.gapSummary}
              </div>

              {/* Priority gaps cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {aiGapResults.priorityGaps?.map((gap: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-slate-500">{gap.domain}</span>
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        {gap.gapLevel}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{gap.skill}</div>
                    <div className="text-slate-600 text-[11px]">{gap.actionPlan}</div>
                  </div>
                ))}
              </div>

              {/* Recommended Trajectory */}
              {aiGapResults.recommendedTrajectory && (
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200">
                  <div className="text-xs font-bold text-slate-800 mb-2">3-Stage Capacity Building Trajectory:</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    {aiGapResults.recommendedTrajectory.map((step: string, i: number) => (
                      <div key={i} className="flex items-start space-x-2 bg-white p-2.5 rounded border border-slate-200">
                        <span className="w-5 h-5 rounded-full bg-[#0B4F9C] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-slate-700 font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Default instant gap indicators based on data matrix
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                The platform evaluated your profile against the MoSPI Competency Framework. You have{" "}
                <span className="font-bold text-rose-600">{criticalGaps.length} priority skill gaps</span> requiring
                targeted upskilling on iGOT Karmayogi before recommendation for {profile.targetRole}.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {criticalGaps.slice(0, 3).map((g) => (
                  <div key={g.id} className="bg-amber-50/50 border border-amber-200 rounded-lg p-3.5 text-xs space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-amber-800 uppercase">{g.domain.split(" ")[0]}</span>
                      <span className="text-rose-600 font-extrabold text-xs">Gap: -{g.gap}</span>
                    </div>
                    <div className="font-bold text-slate-900">{g.name}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Current: <strong>{g.currentLevel}</strong>/5</span>
                      <span>Target: <strong>{g.requiredLevel}</strong>/5</span>
                    </div>
                    <button
                      onClick={() => onNavigateToPathways(g.name)}
                      className="w-full mt-2 text-center text-[11px] bg-white hover:bg-amber-100 border border-amber-300 font-bold text-amber-900 py-1 rounded transition"
                    >
                      View Recommended iGOT Course →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Comprehensive Competency Matrix (4 Domains with Interactive Sliders) */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {language === "hi" ? "दक्षता मूल्यांकन मैट्रिक्स" : "Official Statistics Competency Matrix"}
            </h3>
            <p className="text-xs text-slate-500">
              Evaluate or adjust current proficiency (1 to 5 scale) against the role benchmark.
            </p>
          </div>

          {/* Domain Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedDomain("All")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                selectedDomain === "All"
                  ? "bg-[#0B4F9C] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              All Domains
            </button>
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  selectedDomain === d
                    ? "bg-[#0B4F9C] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {d.replace("Competencies", "").trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => {
            const gap = Number((skill.requiredLevel - skill.currentLevel).toFixed(1));
            const progressPercent = Math.min(100, Math.round((skill.currentLevel / skill.requiredLevel) * 100));

            return (
              <div
                key={skill.id}
                className={`p-4 rounded-xl border transition ${
                  gap > 0.5
                    ? "border-amber-200 bg-amber-50/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#0B4F9C] uppercase tracking-wider">
                      {skill.domain}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                  </div>
                  <span
                    className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                      gap <= 0
                        ? "bg-emerald-100 text-emerald-800"
                        : gap > 1.0
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {gap <= 0 ? "Benchmark Met" : `Gap: -${gap}`}
                  </span>
                </div>

                <p className="text-xs text-slate-600 my-2 leading-relaxed">{skill.description}</p>

                {/* Progress bar visual */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>
                      Current: <strong className="text-slate-900">{skill.currentLevel}</strong> / 5.0
                    </span>
                    <span>
                      Role Target: <strong className="text-[#0B4F9C]">{skill.requiredLevel}</strong> / 5.0
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        gap <= 0 ? "bg-emerald-500" : gap > 1 ? "bg-amber-500" : "bg-[#0B4F9C]"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Slider to adjust self-assessment */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Adjust Level:</span>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={skill.currentLevel}
                    onChange={(e) => onUpdateSkillLevel(skill.id, parseFloat(e.target.value))}
                    className="w-32 accent-[#0B4F9C] cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-700">{skill.currentLevel.toFixed(1)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
