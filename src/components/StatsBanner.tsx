import React from "react";
import { Users, BookOpen, CheckCircle2, UserCheck, Award, TrendingUp, Compass, Cpu, Target } from "lucide-react";

interface StatsBannerProps {
  language: "en" | "hi";
  onNavigateTab: (tab: string) => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ language, onNavigateTab }) => {
  return (
    <div className="w-full space-y-6">
      {/* 1. Primary Government Statistics Blue Ribbon (Directly mirroring the user's uploaded iGOT Karmayogi screenshot) */}
      <div className="bg-[#1258A2] text-white rounded-xl shadow-md p-5 border border-blue-700">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-blue-400/30">
          {/* Metric 1 */}
          <div className="flex items-center space-x-3.5 px-2 pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">1,72,89,315</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">
                {language === "hi" ? "कुल कर्मयोगी ऑनबोर्डेड" : "Total Karmayogis Onboarded"}
              </div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center space-x-3.5 px-2 pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">6,536</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">
                {language === "hi" ? "कुल पाठ्यक्रम" : "Total Courses"}
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center space-x-3.5 px-2 pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">15,80,67,605</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">
                {language === "hi" ? "कुल समापन" : "Total Completions"}
              </div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-center space-x-3.5 px-2 pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">22,16,815</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">
                {language === "hi" ? "मासिक सक्रिय उपयोगकर्ता" : "Monthly Active Users"}
              </div>
            </div>
          </div>

          {/* Metric 5 */}
          <div className="flex items-center space-x-3.5 px-2 pt-2 md:pt-0">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight">3,24,511</div>
              <div className="text-xs text-blue-100 font-medium leading-tight">
                {language === "hi" ? "कल जारी प्रमाणपत्र" : "Certificates Issued Yesterday"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Rule to Role Based Learning & Democratised Learning Panels (from Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Rule to Role Based Learning (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="bg-[#1967B2] text-white px-5 py-3 flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-300" />
              {language === "hi" ? "नियम से भूमिका आधारित शिक्षण (Rule to Role Based Learning)" : "Rule to Role Based Learning"}
            </h3>
            <span className="text-xs bg-blue-900/60 px-2.5 py-0.5 rounded text-blue-100">MoSPI & NSSTA Cadre</span>
          </div>

          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Union CBPs</div>
                  <div className="text-lg font-extrabold text-slate-800">1,434</div>
                </div>
              </div>

              <div className="bg-orange-50/60 border border-orange-200/70 rounded-lg p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Employees with CBPs</div>
                  <div className="text-lg font-extrabold text-slate-800">43,45,664</div>
                </div>
              </div>

              <div className="bg-blue-50/60 border border-blue-200/70 rounded-lg p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">State CBPs</div>
                  <div className="text-lg font-extrabold text-slate-800">2,609</div>
                </div>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-lg p-3.5 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Role Relevant Completions</div>
                  <div className="text-lg font-extrabold text-slate-800">12,374,227</div>
                </div>
              </div>
            </div>

            {/* Courses by Competency & Level Breakdown */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-2">
                  {language === "hi" ? "दक्षता अनुसार पाठ्यक्रम" : "Courses by Competency Domain"}
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1967B2]"></span>
                      Domain (Statistical & Tech)
                    </span>
                    <span className="font-bold text-slate-800">3,113</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      Functional (Governance & Digital)
                    </span>
                    <span className="font-bold text-slate-800">1,290</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      Behavioural & Leadership
                    </span>
                    <span className="font-bold text-slate-800">2,133</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-2">
                  {language === "hi" ? "स्तर अनुसार पाठ्यक्रम" : "Courses by Difficulty Level"}
                </span>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Basic (Foundational)</span>
                    <span className="font-bold text-slate-800">3,757</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Intermediate (Applied)</span>
                    <span className="font-bold text-slate-800">1,034</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Advanced (Expert / Research)</span>
                    <span className="font-bold text-slate-800">42</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between text-xs">
              <span className="text-blue-900 font-medium">
                Want to identify your specific competency gaps against MoSPI benchmark?
              </span>
              <button
                onClick={() => onNavigateTab("competency")}
                className="bg-[#0B4F9C] hover:bg-[#083a75] text-white px-3 py-1.5 rounded font-semibold transition"
              >
                Assess My Gaps →
              </button>
            </div>
          </div>
        </div>

        {/* Right: Shared National Aspirations & Democratised Learning (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shared National Aspirations */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="bg-[#1967B2] text-white px-5 py-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-300" />
                {language === "hi" ? "साझा राष्ट्रीय आकांक्षाएं" : "Shared National Aspirations"}
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs font-semibold text-slate-600">Course Completion for National Priorities</div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">AI & Emerging Tech</div>
                    <div className="text-[11px] text-slate-500">Python, ML in Stats, Cloud</div>
                  </div>
                </div>
                <div className="text-base font-extrabold text-slate-900">3,38,80,712</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <Users className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Citizen Centricity & Jan Bhagidari</div>
                    <div className="text-[11px] text-slate-500">Open Data, Field Enumeration</div>
                  </div>
                </div>
                <div className="text-base font-extrabold text-slate-900">1,50,86,052</div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Viksit Bharat 2047</div>
                    <div className="text-[11px] text-slate-500">High-Frequency Macro Aggregates</div>
                  </div>
                </div>
                <div className="text-base font-extrabold text-slate-900">1,10,49,297</div>
              </div>
            </div>
          </div>

          {/* Quick Action to AI MCQ Generator */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 p-4 rounded-xl shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-950">
                {language === "hi" ? "नया एआई मूल्यांकन इंजन" : "Intelligent Assessment Engine"}
              </div>
              <div className="text-sm font-bold text-slate-950">
                {language === "hi"
                  ? "दस्तावेज़ों से स्वतः MCQs एवं क्विज़ बनाएं"
                  : "Auto-Generate MCQs & Quizzes from Official Manuals"}
              </div>
            </div>
            <button
              onClick={() => onNavigateTab("assessment")}
              className="bg-slate-950 hover:bg-slate-900 text-amber-400 text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs"
            >
              Launch Engine →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
