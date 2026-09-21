import React, { useState } from "react";
import { OfficialProfile } from "../types";
import { 
  X, 
  LogIn, 
  ShieldCheck, 
  Lock, 
  Mail, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle,
  Building
} from "lucide-react";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: OfficialProfile[];
  onSignIn: (profile: OfficialProfile) => void;
  language: "en" | "hi";
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  profiles,
  onSignIn,
  language,
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(profiles[0]?.id || "");
  const [karmayogiId, setKarmayogiId] = useState<string>("KY-ISS-2014-8832");
  const [password, setPassword] = useState<string>("••••••••••••");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const found = profiles.find((p) => p.id === selectedProfileId) || profiles[0];
      onSignIn(found);
      setIsLoading(false);
      onClose();
    }, 400);
  };

  const handleSelectQuickProfile = (profile: OfficialProfile) => {
    setSelectedProfileId(profile.id);
    setKarmayogiId(profile.karmayogiId);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor Bar */}
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>

        {/* Modal Header */}
        <div className="bg-[#0b2545] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Official Government Portal
              </div>
              <h3 className="text-lg font-black text-white">
                Sign In to SkillSetu
              </h3>
              <p className="text-xs text-slate-300">
                iGOT Karmayogi & MoSPI Single Sign-On (SSO)
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Quick Profile Selection for Officers */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Select Officer Profile to Sign In:
            </label>
            <div className="space-y-2">
              {profiles.map((p) => {
                const isSelected = selectedProfileId === p.id;
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => handleSelectQuickProfile(p)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 border-[#0B4F9C] shadow-2xs"
                        : "bg-slate-50/70 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                        isSelected ? "bg-[#0B4F9C] text-white" : "bg-slate-200 text-slate-700"
                      }`}>
                        {p.name.split(" ")[1]?.[0] || p.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[10px] text-slate-500">
                          {p.designation.split("(")[0].trim()} • {p.cadre.split(" ")[0]}
                        </div>
                      </div>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-[#0B4F9C]" />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Select</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-medium uppercase">Or Credentials</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Karmayogi ID / Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={karmayogiId}
                  onChange={(e) => setKarmayogiId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B4F9C] focus:outline-none"
                  placeholder="e.g. KY-ISS-2014-8832"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Password / Digital Token
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#0B4F9C] focus:outline-none"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0B4F9C] hover:bg-[#083a75] text-white text-xs font-bold py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 transition cursor-pointer mt-4"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? "Authenticating with NIC / iGOT..." : "Sign In with Karmayogi ID"}
            </button>
          </form>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              Demo mode enabled: Selecting any officer above and clicking Sign In will immediately populate their personalized competency profile and assigned iGOT courses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
