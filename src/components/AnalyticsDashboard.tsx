import React, { useState } from "react";
import { OfficialProfile, SkillItem, IGOTCourse } from "../types";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Award, 
  ShieldCheck, 
  Cpu, 
  Calendar, 
  Compass, 
  Download, 
  Layers,
  Building2,
  FileSpreadsheet
} from "lucide-react";

interface AnalyticsDashboardProps {
  profile: OfficialProfile;
  skills: SkillItem[];
  courses: IGOTCourse[];
  language: "en" | "hi";
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  profile,
  skills,
  courses,
  language,
}) => {
  const [viewMode, setViewMode] = useState<"learner" | "administrator">("learner");

  // Division-wise compliance dummy stats for Admin
  const divisionStats = [
    { name: "Survey Design & Research Div (SDRD)", onBoarded: "96%", cbpsComplete: "84%", avgCompetency: 4.2 },
    { name: "Field Operations Division (FOD)", onBoarded: "98%", cbpsComplete: "78%", avgCompetency: 3.8 },
    { name: "National Accounts Division (NAD)", onBoarded: "94%", cbpsComplete: "89%", avgCompetency: 4.4 },
    { name: "Price Statistics Division (PSD)", onBoarded: "92%", cbpsComplete: "81%", avgCompetency: 4.0 },
    { name: "Data Processing Division (DPD)", onBoarded: "97%", cbpsComplete: "86%", avgCompetency: 4.1 },
    { name: "State Directorates of Economics (DES)", onBoarded: "88%", cbpsComplete: "72%", avgCompetency: 3.5 },
  ];

  // Emerging Skills forecast
  const emergingSkillsForecast = [
    { skill: "Python & Polars for High-speed Microdata", demandGrowth: "+148%", targetBy2026: "3,200 Officers", priority: "Critical" },
    { skill: "Machine Learning for Missing Value Imputation", demandGrowth: "+112%", targetBy2026: "1,850 Officers", priority: "High" },
    { skill: "GIS Spatial Analytics on Bhuvan & QGIS", demandGrowth: "+95%", targetBy2026: "2,400 Officers", priority: "High" },
    { skill: "DPDP Act 2023 Survey Anonymization", demandGrowth: "+180%", targetBy2026: "4,500 Officers", priority: "Critical" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header with View Toggle */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#0B4F9C] uppercase bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
              MoSPI Cadre Management & Capacity Building
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            {language === "hi" ? "क्षमता निर्माण विश्लेषिकी डैशबोर्ड" : "Skill Intelligence & Capacity Analytics"}
          </h2>
          <p className="text-xs text-slate-500">
            Real-time competency tracking, iGOT course completion rates, and predictive workforce forecasting.
          </p>
        </div>

        {/* View Switcher */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setViewMode("learner")}
            className={`px-4 py-1.5 rounded-lg transition ${
              viewMode === "learner"
                ? "bg-[#0B4F9C] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Officer Dashboard
          </button>
          <button
            onClick={() => setViewMode("administrator")}
            className={`px-4 py-1.5 rounded-lg transition ${
              viewMode === "administrator"
                ? "bg-[#0B4F9C] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            MoSPI Admin / Cadre View
          </button>
        </div>
      </div>

      {/* LEARNER VIEW */}
      {viewMode === "learner" && (
        <div className="space-y-6">
          {/* Top personal metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Capacity Building Hours</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {profile.completedHours} <span className="text-xs text-slate-400 font-normal">/ {profile.allocatedHours} hrs</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#0B4F9C] rounded-full"
                  style={{ width: `${(profile.completedHours / profile.allocatedHours) * 100}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Target for FY 2026-27</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Competency Index</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                3.4 <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
              </div>
              <div className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +0.6 gain this quarter
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Role Target: 4.2 for promotion</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">iGOT Courses Completed</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {courses.filter((c) => c.status === "Completed").length} <span className="text-xs text-slate-400 font-normal">Modules</span>
              </div>
              <div className="text-xs text-blue-600 font-semibold mt-2">
                {courses.filter((c) => c.status === "In Progress").length} currently in progress
              </div>
              <div className="text-[10px] text-slate-400 mt-1">100% role-relevant CBPs</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Verifiable Certificates</div>
              <div className="text-2xl font-extrabold text-amber-600 mt-1">
                {profile.certificatesEarned}
              </div>
              <div className="text-xs text-slate-600 font-semibold mt-2 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" /> NSSTA & iGOT Authenticated
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Stored in DigiLocker</div>
            </div>
          </div>

          {/* Competency Domain Progress breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Domain Proficiency Breakdown</h3>
              <div className="space-y-3">
                {[
                  { domain: "Statistical Competencies", score: 3.8, benchmark: 4.5, color: "bg-blue-600" },
                  { domain: "Technical Competencies", score: 2.8, benchmark: 4.2, color: "bg-amber-500" },
                  { domain: "Digital Governance", score: 3.2, benchmark: 4.0, color: "bg-emerald-600" },
                  { domain: "Behavioural & Leadership", score: 4.1, benchmark: 4.5, color: "bg-indigo-600" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1 text-xs">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-800">{item.domain}</span>
                      <span className="text-slate-500">
                        {item.score} / {item.benchmark} Target
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Assessment Logs */}
            <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Recent AI Assessment Logs</h3>
              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-800">NSS 79th Round Sampling Protocol Assessment</div>
                    <div className="text-[11px] text-slate-500">5 Questions • Score: 100% (5/5)</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    Passed (+0.4 Level)
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-800">SNA 2008 & GVA Estimation Quick Quiz</div>
                    <div className="text-[11px] text-slate-500">5 Questions • Score: 80% (4/5)</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    Passed (+0.3 Level)
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-800">DPDP Act 2023 Anonymization Check</div>
                    <div className="text-[11px] text-slate-500">3 Questions • Score: 100% (3/3)</div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                    Passed (+0.3 Level)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMINISTRATOR VIEW (MoSPI & NSSTA Executive Cadre View) */}
      {viewMode === "administrator" && (
        <div className="space-y-6">
          {/* Admin National Macro Metric Cards (Mirroring screenshot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Total MoSPI Personnel Onboarded</div>
              <div className="text-2xl font-extrabold text-[#0B4F9C] mt-1">18,450</div>
              <div className="text-xs text-emerald-600 font-semibold mt-1">96.8% of sanctioned cadre strength</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Union MoSPI CBPs Active</div>
              <div className="text-2xl font-extrabold text-amber-600 mt-1">1,434</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Aligned with CBC Framework</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">Role Relevant Completions</div>
              <div className="text-2xl font-extrabold text-emerald-600 mt-1">1,42,890</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Avg 3.8 courses per official</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
              <div className="text-xs text-slate-500 font-medium">NSSTA TPAC Programme Adoption</div>
              <div className="text-2xl font-extrabold text-indigo-600 mt-1">88.4%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Target 90% by Dec 2026</div>
            </div>
          </div>

          {/* Division Heatmap Table */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0B4F9C]" />
                MoSPI Divisions & State Directorates Competency Compliance
              </h3>
              <button
                onClick={() => alert("Exporting Cadre Capacity Building Plan (CSV)...")}
                className="text-xs font-bold text-[#0B4F9C] hover:text-blue-800 flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-600 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Division / Directorate</th>
                    <th className="px-4 py-3">Onboarded %</th>
                    <th className="px-4 py-3">CBP Completion</th>
                    <th className="px-4 py-3">Avg Competency Index</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {divisionStats.map((div, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{div.name}</td>
                      <td className="px-4 py-3 font-mono text-slate-700">{div.onBoarded}</td>
                      <td className="px-4 py-3 font-mono text-slate-700">{div.cbpsComplete}</td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">{div.avgCompetency} / 5.0</td>
                      <td className="px-4 py-3">
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          High Compliance
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Predictive Emerging Skills Forecasting for 2026-2028 */}
          <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  Predictive AI Capacity Building Forecast (2026-2028)
                </h3>
                <p className="text-xs text-slate-500">
                  Forecasted high-demand skill areas required for modernization of India's Official Statistical System.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergingSkillsForecast.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.priority === "Critical"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.priority} Urgency
                    </span>
                    <span className="text-xs font-bold text-indigo-600">{item.demandGrowth}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs leading-snug">{item.skill}</div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    Training Target: <strong>{item.targetBy2026}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
