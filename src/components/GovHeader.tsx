import React from "react";
import { OfficialProfile } from "../types";
import { ShieldCheck, Globe, LogIn, LogOut, User, ChevronDown, Sparkles } from "lucide-react";

interface GovHeaderProps {
  currentProfile: OfficialProfile;
  profiles: OfficialProfile[];
  onSelectProfile: (profile: OfficialProfile) => void;
  isAuthenticated: boolean;
  onOpenSignIn: () => void;
  onOpenProfile: () => void;
  onSignOut: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  onOpenSahayak: () => void;
  onOpenWelcome?: () => void;
}

export const GovHeader: React.FC<GovHeaderProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  isAuthenticated,
  onOpenSignIn,
  onOpenProfile,
  onSignOut,
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenSahayak,
  onOpenWelcome,
}) => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      {/* 1. Tricolor Accent Line */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Top Accessibility & Official Gov Bar */}
      <div className="bg-[#0b2545] text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        {/* Left: Quick Welcome Intro pill */}
        <div className="flex items-center space-x-2">
          {onOpenWelcome && (
            <button
              id="gov-welcome-intro-btn"
              onClick={onOpenWelcome}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] font-bold text-amber-300 transition cursor-pointer shadow-xs group"
              title={language === "hi" ? "स्किलसेतु परिचय व स्वागत एनीमेशन देखें" : "View SkillSetu Welcome Introduction & Animation"}
            >
              <Sparkles className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{language === "hi" ? "स्वागत एनीमेशन" : "Welcome Intro"}</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="flex items-center">
            <button
              id="gov-language-toggle"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="group inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/95 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-400/50 shadow-inner text-[11px] font-medium text-slate-200 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400/50 select-none"
              title={language === "en" ? "Switch language to हिन्दी" : "Switch language to English"}
            >
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-400/15 text-amber-400 group-hover:bg-amber-400/25 transition-colors">
                <Globe className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45" />
              </div>

              <div className="flex items-center bg-slate-900/90 rounded-full p-0.5 border border-slate-700/70 text-[10px]">
                <span className={`px-1.5 py-0.5 rounded-full transition-all duration-150 ${
                  language === "en" 
                    ? "bg-amber-400 text-slate-950 font-black shadow-2xs" 
                    : "text-slate-400 hover:text-slate-200 font-medium"
                }`}>
                  EN
                </span>
                <span className={`px-1.5 py-0.5 rounded-full transition-all duration-150 ${
                  language === "hi" 
                    ? "bg-amber-400 text-slate-950 font-black shadow-2xs" 
                    : "text-slate-400 hover:text-slate-200 font-medium"
                }`}>
                  हिन्दी
                </span>
              </div>

              <span className="text-[10px] text-amber-300/90 font-bold group-hover:text-amber-300 transition-colors">
                {language === "en" ? "English" : "हिन्दी"}
              </span>
            </button>
          </div>

          <span className="text-slate-600">|</span>

          {/* User Profile & Sign In Option */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenProfile}
                className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-200 px-2.5 py-0.5 rounded border border-slate-700 transition text-[11px] font-medium cursor-pointer shadow-xs"
                title="View & Edit Official Profile"
              >
                <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-[9px]">
                  {currentProfile.name.split(" ")[1]?.[0] || currentProfile.name[0]}
                </div>
                <span className="max-w-[130px] truncate">{currentProfile.name}</span>
                <span className="text-[10px] bg-blue-900 text-blue-200 px-1 py-0.2 rounded font-bold">Profile</span>
              </button>

              <button
                onClick={onSignOut}
                className="text-slate-400 hover:text-rose-300 text-[11px] font-medium flex items-center gap-1 transition px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="flex items-center space-x-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3 py-1 rounded transition text-xs cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Brand & Identity Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Ashoka Emblem + MoSPI / NSSTA Branding */}
        <div className="flex items-center space-x-4">
          {/* Ashoka Emblem Vector representation */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center p-1 bg-amber-50/50 rounded-lg border border-amber-200/60">
            <svg
              className="w-10 h-12 text-[#133054]"
              viewBox="0 0 24 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ashoka Stambha Lion & Chakra stylized silhouette */}
              <circle cx="12" cy="5" r="3.5" fill="#133054" />
              <path d="M8 8.5C8 7.5 16 7.5 16 8.5V11H8V8.5Z" fill="#133054" />
              <rect x="7" y="11" width="10" height="5" rx="1" fill="#c2410c" />
              <circle cx="12" cy="19" r="3" fill="#1e3a8a" stroke="#ffffff" strokeWidth="0.8" />
              <path d="M6 24C6 22.5 18 22.5 18 24V26H6V24Z" fill="#133054" />
              <text x="12" y="27.5" fontSize="2.8" textAnchor="middle" fill="#0b2545" fontWeight="bold">
                सत्यमेव जयते
              </text>
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-100/80 px-2 py-0.5 rounded">
                {language === "hi" ? "सांख्यिकी उत्कृष्टता मंच" : "Statistical Skill Intelligence"}
              </span>
              <span className="text-[11px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                NSSTA & MoSPI
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <h1 id="app-title-heading" className="text-xl sm:text-2xl font-extrabold text-[#0B4F9C] tracking-tight leading-tight">
                {language === "hi" ? "स्किलसेतु" : "SkillSetu"}
              </h1>
              {onOpenWelcome && (
                <button
                  onClick={onOpenWelcome}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0B4F9C] hover:text-white bg-blue-50 hover:bg-[#0B4F9C] border border-blue-200 px-2 py-0.5 rounded-full transition cursor-pointer shadow-2xs"
                  title="Watch Welcome Animation / मंच परिचय एनीमेशन देखें"
                >
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>{language === "hi" ? "एनीमेशन" : "Intro"}</span>
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              {language === "hi"
                ? "राष्ट्रीय सांख्यिकी प्रणाली प्रशिक्षण अकादमी (NSSTA) एवं iGOT कर्मयोगी एकीकरण"
                : "National Statistical Systems Training Academy & iGOT Karmayogi Ecosystem"}
            </p>
          </div>
        </div>

        {/* Right: Karmayogi Bharat Branding & Logged-in Officer Pill */}
        <div className="flex items-center space-x-4">
          {/* Karmayogi Bharat Emblem Tag */}
          <div className="hidden lg:flex items-center space-x-2.5 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              क
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">कर्मयोगी भारत</div>
              <div className="text-[10px] text-amber-800 font-serif italic">लोकहितं मम करणीयम्</div>
            </div>
          </div>

          {/* Active Officer Card / Sign In Action */}
          {isAuthenticated ? (
            <button
              onClick={onOpenProfile}
              className="bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-[#0B4F9C] rounded-xl p-2.5 flex items-center space-x-3 text-left shadow-xs transition cursor-pointer group"
              title="Click to view & edit User Profile"
            >
              <div className="w-9 h-9 rounded-full bg-[#0B4F9C] text-white flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-105 transition">
                {currentProfile.name.split(" ")[1]?.[0] || "O"}
              </div>
              <div className="text-xs leading-tight">
                <div className="font-bold text-slate-900 flex items-center gap-1 group-hover:text-[#0B4F9C] transition">
                  <span>{currentProfile.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Online Active Session"></span>
                </div>
                <div className="text-slate-600 text-[11px] font-medium">{currentProfile.designation}</div>
                <div className="text-[10px] text-[#0B4F9C] font-semibold flex items-center gap-1">
                  <span>{currentProfile.cadre}</span>
                  <span className="text-slate-400 font-normal group-hover:text-[#0B4F9C]">• View Profile →</span>
                </div>
              </div>
            </button>
          ) : (
            <button
              onClick={onOpenSignIn}
              className="bg-[#0B4F9C] hover:bg-[#083a75] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-amber-300" />
              <span>Sign In with Karmayogi ID</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Primary Navigation Bar */}
      <nav className="bg-[#0B4F9C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto">
          <div className="flex space-x-1 sm:space-x-2 py-1">
            {[
              { id: "overview", label: language === "hi" ? "डैशबोर्ड" : "Dashboard" },
              { id: "assessment", label: language === "hi" ? "MCQ टेस्ट व कौशल अंतर पहचान" : "Solve MCQs & Identify Gaps" },
              { id: "pathways", label: language === "hi" ? "आवंटित iGOT पाठ्यक्रम" : "Allocated iGOT Courses" },
              { id: "competency", label: language === "hi" ? "दक्षता एवं कौशल प्रोफ़ाइल" : "Competency Profile" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-md transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-white text-[#0B4F9C] shadow-sm"
                    : "text-blue-100 hover:bg-[#083a75] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick AI Assistant Trigger in Nav */}
          <button
            onClick={onOpenSahayak}
            className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded shadow-sm transition"
          >
            <span className="w-2 h-2 rounded-full bg-slate-900 animate-ping"></span>
            {language === "hi" ? "सांख्यिकी AI सहायक" : "Statistical AI Sahayak"}
          </button>
        </div>
      </nav>
    </header>
  );
};
