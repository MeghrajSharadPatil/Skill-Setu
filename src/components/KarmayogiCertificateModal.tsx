import React from "react";
import { OfficialProfile, IGOTCourse } from "../types";
import { Award, CheckCircle2, Download, Printer, X, ShieldCheck } from "lucide-react";

interface KarmayogiCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: OfficialProfile;
  course: IGOTCourse | null;
}

export const KarmayogiCertificateModal: React.FC<KarmayogiCertificateModalProps> = ({
  isOpen,
  onClose,
  profile,
  course,
}) => {
  if (!isOpen) return null;

  const certTitle = course ? course.title : "Official Statistical Competencies & Data Governance";
  const certCode = course ? course.courseCode : "NSSTA-STAT-CORE";
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const certId = `KMY-MOSPI-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border-4 border-amber-500/40 p-6 md:p-8 space-y-6 relative overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Decorative Border */}
        <div className="border-2 border-[#0B4F9C] p-6 rounded-xl bg-gradient-to-b from-amber-50/20 via-white to-blue-50/20 text-center space-y-5">
          {/* Header Seals */}
          <div className="flex items-center justify-between px-4">
            {/* Ashoka Stambha Emblem */}
            <div className="flex flex-col items-center">
              <svg className="w-12 h-14 text-[#0B4F9C]" viewBox="0 0 24 28" fill="currentColor">
                <circle cx="12" cy="5" r="3.5" fill="#0B4F9C" />
                <path d="M8 8.5C8 7.5 16 7.5 16 8.5V11H8V8.5Z" fill="#0B4F9C" />
                <rect x="7" y="11" width="10" height="5" rx="1" fill="#c2410c" />
                <circle cx="12" cy="19" r="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="0.8" />
                <path d="M6 24C6 22.5 18 22.5 18 24V26H6V24Z" fill="#0B4F9C" />
              </svg>
              <span className="text-[9px] font-bold text-slate-800">सत्यमेव जयते</span>
            </div>

            {/* Central Ministry & Mission Karmayogi Heading */}
            <div>
              <div className="text-[11px] font-bold tracking-widest text-[#0B4F9C] uppercase">
                GOVERNMENT OF INDIA • भारत सरकार
              </div>
              <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                Ministry of Statistics & Programme Implementation (MoSPI)
              </div>
              <div className="text-xs font-semibold text-amber-800">
                National Statistical Systems Training Academy (NSSTA)
              </div>
              <div className="text-[10px] text-slate-500 font-serif italic mt-0.5">
                Mission Karmayogi • National Programme for Civil Services Capacity Building (NPCSCB)
              </div>
            </div>

            {/* Karmayogi Bharat Emblem */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                क
              </div>
              <span className="text-[9px] font-bold text-orange-900 mt-1">कर्मयोगी भारत</span>
            </div>
          </div>

          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#0B4F9C] to-transparent my-2"></div>

          {/* Certificate Body */}
          <div className="space-y-2 py-2">
            <div className="text-xs font-serif uppercase tracking-widest text-slate-500">
              Certificate of Competency Completion
            </div>
            <div className="text-sm text-slate-600">This is to certify that</div>
            <div className="text-2xl font-black text-[#0B4F9C] font-serif tracking-wide underline decoration-amber-400 decoration-2 underline-offset-4">
              {profile.name}
            </div>
            <div className="text-xs text-slate-700 font-medium">
              {profile.designation} • {profile.cadre}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Karmayogi ID: {profile.karmayogiId} • Department: {profile.department}
            </div>

            <div className="text-xs text-slate-600 max-w-xl mx-auto pt-3 leading-relaxed">
              has successfully fulfilled all role-relevant competency benchmarks, practical laboratory modules, and
              AI assessment evaluations in:
            </div>

            <div className="text-lg font-extrabold text-slate-900 py-1 bg-amber-50 border border-amber-200/80 rounded-lg max-w-lg mx-auto">
              {certTitle}
            </div>

            <div className="text-[11px] text-slate-500">
              Course Code: <span className="font-mono font-bold text-slate-800">{certCode}</span> • NSSTA TPAC Approved
              Program
            </div>
          </div>

          {/* Signatures and QR Code */}
          <div className="pt-6 grid grid-cols-3 items-end border-t border-slate-200 text-xs text-slate-600">
            {/* Left Signatory */}
            <div className="text-center">
              <div className="font-serif italic text-sm text-slate-900 font-bold mb-1">
                Dr. Alok Srivastava, ISS
              </div>
              <div className="h-0.5 w-32 bg-slate-400 mx-auto mb-1"></div>
              <div className="text-[10px] font-bold text-slate-800">Director General</div>
              <div className="text-[9px] text-slate-500">National Statistical Systems Training Academy</div>
            </div>

            {/* Center: Official Seal & QR code */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center p-1 shadow-inner">
                <Award className="w-8 h-8 text-amber-700" />
              </div>
              <div className="text-[9px] font-mono text-slate-600 mt-1">ID: {certId}</div>
              <div className="text-[8px] text-emerald-700 font-bold flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3" /> DigiLocker Verified
              </div>
            </div>

            {/* Right Signatory */}
            <div className="text-center">
              <div className="font-serif italic text-sm text-slate-900 font-bold mb-1">
                Prof. S. R. Ramachandran
              </div>
              <div className="h-0.5 w-32 bg-slate-400 mx-auto mb-1"></div>
              <div className="text-[10px] font-bold text-slate-800">Member (Training & Cadre)</div>
              <div className="text-[9px] text-slate-500">Capacity Building Commission (CBC)</div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500">
            Issued on: <strong>{issueDate}</strong>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              Print Certificate
            </button>
            <button
              onClick={() => {
                alert(`Official Karmayogi Certificate (${certId}) downloaded.`);
              }}
              className="bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4" />
              Download Official PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
