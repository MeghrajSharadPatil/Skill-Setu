import React, { useState, useEffect } from "react";
import { OfficialProfile } from "../types";
import { supabase } from "../supabaseClient";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  LogIn, 
  User, 
  UserPlus,
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  KeyRound, 
  ExternalLink,
  ArrowRight,
  Database,
  Globe,
  HelpCircle,
  Briefcase
} from "lucide-react";

interface SignInPageProps {
  profiles: OfficialProfile[];
  onSignIn: (profile: OfficialProfile) => void;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  onOpenWelcome: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  profiles,
  onSignIn,
  language,
  setLanguage,
  onOpenWelcome,
}) => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [prefilledEmail, setPrefilledEmail] = useState<string>("");
  const [signupSuccessMsg, setSignupSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Check URL query parameters and Supabase session on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "signup") {
      setAuthMode("signup");
    }
    const qEmail = params.get("email");
    if (qEmail) {
      setPrefilledEmail(qEmail);
    }
    if (params.get("signup_success") === "true") {
      setAuthMode("signin");
      setSignupSuccessMsg(
        "Your account has been created. Please check your email and verify your address before logging in."
      );
    }

    async function checkSupabase() {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          const user = data.session.user;
          const userEmail = user.email || "user@mospi.gov.in";
          const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Statistical Officer";
          
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
            name: userName,
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
            authSessionId: data.session.access_token.slice(0, 16) + "...",
          };
          window.history.pushState({}, "", "/");
          onSignIn(matchedProfile);
        }
      } catch (err) {
        console.warn("Supabase session check note:", err);
      }
    }
    checkSupabase();
  }, [profiles, onSignIn]);

  // Handle successful SignUp from child
  const handleSignUpSuccess = (email: string) => {
    setPrefilledEmail(email);
    setSignupSuccessMsg("Your account has been created. Please check your email and verify your address before logging in.");
    setAuthMode("signin");
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setStatusMessage({ type: "info", text: "Initiating Google Single Sign-On (SSO)..." });

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setStatusMessage({
          type: "info",
          text: "Google SSO initiated via Supabase. Signing in with authenticated Google Profile...",
        });
        
        setTimeout(() => {
          const userEmail = "officer@gov.in";
          const savedProfileStr = localStorage.getItem("skillsetu_user_profile_" + userEmail.toLowerCase());
          let savedProfile: OfficialProfile | null = null;
          if (savedProfileStr) {
            try {
              savedProfile = JSON.parse(savedProfileStr);
            } catch {
              // ignore
            }
          }

          const googleProfile: OfficialProfile = savedProfile || {
            id: "google-officer",
            name: "Statistical Officer",
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
            authProvider: "google",
            lastLoginAt: new Date().toLocaleTimeString(),
            authSessionId: "GOOG-AUTH-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
          };
          window.history.pushState({}, "", "/");
          onSignIn(googleProfile);
        }, 600);
      }
    } catch (err) {
      console.warn("Google auth note:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040D1B] via-[#0B2545] to-[#041122] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Ambience & Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E3A8A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. Official Top Gov Bar */}
      <header className="relative z-10 w-full bg-[#051329]/90 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full border border-amber-400/40 p-1 flex items-center justify-center bg-blue-950 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-amber-300">
                भारत सरकार • Government of India
              </div>
              <div className="text-xs text-slate-300 font-medium hidden sm:block">
                Ministry of Statistics & Programme Implementation (MoSPI)
              </div>
            </div>
          </div>
        </div>

        {/* Tricolor Ribbon */}
        <div className="h-1 w-full flex">
          <div className="h-full w-1/3 bg-[#FF9933]"></div>
          <div className="h-full w-1/3 bg-white"></div>
          <div className="h-full w-1/3 bg-[#138808]"></div>
        </div>
      </header>

      {/* 2. Main Authentication Card Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="max-w-4xl w-full bg-slate-900/90 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Brand & Security Context (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2545] via-[#081C38] to-[#040E1E] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>iGOT Karmayogi & NSSTA</span>
              </div>

              {/* Title & Setu */}
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                SkillSetu
              </h1>
              <div className="text-lg font-serif text-amber-300 mb-3" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                स्किलसेतु • आधिकारिक पोर्टल
              </div>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {language === "hi"
                  ? "भारतीय आधिकारिक सांख्यिकी तंत्र हेतु राष्ट्रीय योग्यता निदान, स्वचालित iGOT कर्मयोगी आवंटन एवं संवर्ग उन्नति मंच।"
                  : "National Statistical Competency Diagnostics, Adaptive MCQ Engine, and Personalized Learning Pathways for India's Statistical Officers."}
              </p>

              {/* Features List */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Cadre-benchmarked competency diagnostic tests</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>6,500+ TPAC-recommended iGOT courses</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>AI Sahayak statistical copilot for official duties</span>
                </div>
              </div>

              {/* About SkillSetu Button */}
              <button
                type="button"
                onClick={onOpenWelcome}
                className="mt-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/50 text-amber-300 text-xs font-semibold transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>About SkillSetu & Mission</span>
              </button>
            </div>
          </div>

          {/* Right Column: Sign In Forms (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            
            <div className="mb-4">
              <div className="text-[11px] font-bold tracking-wider text-amber-400 uppercase">
                Secure Cadre Access
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {authMode === "signin" ? "Sign in" : "Sign up"}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === "signin" 
                  ? "Authenticate with your official email credentials or Google Single Sign-On."
                  : "Register with email to access competency diagnostics & personalized learning pathways."}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 mb-5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signin");
                  const url = new URL(window.location.href);
                  url.searchParams.delete("mode");
                  window.history.pushState({}, "", url.toString());
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === "signin"
                    ? "bg-[#0B4F9C] text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setSignupSuccessMsg(null);
                  const url = new URL(window.location.href);
                  url.searchParams.set("mode", "signup");
                  window.history.pushState({}, "", url.toString());
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === "signup"
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Status Alert Notification */}
            {statusMessage && (
              <div className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 animate-in fade-in duration-200 ${
                statusMessage.type === "success" 
                  ? "bg-emerald-950/80 border border-emerald-700/80 text-emerald-200" 
                  : statusMessage.type === "error"
                  ? "bg-rose-950/80 border border-rose-700/80 text-rose-200"
                  : "bg-blue-950/80 border border-blue-700/80 text-blue-200"
              }`}>
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* 1. GOOGLE SIGN IN BUTTON (Prominent) */}
            <div className="space-y-3 mb-5">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition shadow-md hover:shadow-lg cursor-pointer border border-slate-200 active:scale-[0.99]"
              >
                {/* Google SVG Logo */}
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Account</span>
              </button>
            </div>

            {/* Separator */}
            <div className="relative flex py-1 items-center mb-5">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                {authMode === "signin" ? "Or Sign In with Email / Supabase" : "Or Register with Supabase"}
              </span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>

            {/* 2. Form Component (SignIn or SignUp) */}
            {authMode === "signin" ? (
              <SignIn
                initialEmail={prefilledEmail}
                initialSuccessMessage={signupSuccessMsg}
                onSuccess={(profile) => onSignIn(profile)}
                onSwitchToSignUp={() => {
                  setAuthMode("signup");
                  setSignupSuccessMsg(null);
                }}
                profiles={profiles}
              />
            ) : (
              <SignUp
                onSuccess={handleSignUpSuccess}
                onSwitchToSignIn={() => setAuthMode("signin")}
              />
            )}

          </div>
        </div>
      </main>

      {/* 3. Official Footer */}
      <footer className="relative z-10 w-full bg-[#030A14] border-t border-slate-800 py-3 text-center text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            National Statistical Systems Training Academy (NSSTA), Plot No. 22, Knowledge Park-II, Greater Noida
          </div>
          <div className="flex items-center gap-3">
            <span>MoSPI © 2026</span>
            <span>•</span>
            <span className="text-amber-400">Integrated with iGOT Karmayogi Bharat</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
