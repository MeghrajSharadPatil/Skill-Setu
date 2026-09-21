import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Mail, Lock, LogIn, AlertCircle, CheckCircle2 } from "lucide-react";
import { OfficialProfile } from "../types";

interface SignInProps {
  initialEmail?: string;
  initialSuccessMessage?: string | null;
  onSuccess: (profile: OfficialProfile) => void;
  onSwitchToSignUp: () => void;
  profiles: OfficialProfile[];
}

export const SignIn: React.FC<SignInProps> = ({
  initialEmail = "",
  initialSuccessMessage = null,
  onSuccess,
  onSwitchToSignUp,
  profiles,
}) => {
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(initialSuccessMessage);

  // Sync with URL query parameter or props
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryEmail = params.get("email");
    const signupSuccess = params.get("signup_success") === "true";

    if (queryEmail) {
      setEmail(queryEmail);
    } else if (initialEmail) {
      setEmail(initialEmail);
    }

    if (signupSuccess || initialSuccessMessage) {
      setSuccessMessage(
        initialSuccessMessage || 
        "Your account has been created. Please check your email and verify your address before logging in."
      );
    }
  }, [initialEmail, initialSuccessMessage]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      // 2) For Sign In: Use supabase.auth.signInWithPassword({ email, password })
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      // Only redirect when a real session exists after login
      if (data?.session?.user) {
        // Clear query parameters
        window.history.pushState({}, "", "/");

        const user = data.session.user;
        const userEmail = (user.email || email).trim();
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
          authProvider: "email",
          lastLoginAt: new Date().toLocaleTimeString(),
          authSessionId: data.session.access_token.slice(0, 18) + "...",
        };

        onSuccess(matchedProfile);
      } else {
        setErrorMessage("Check your email and confirm your account before logging in.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Success message above form when coming from Sign Up */}
      {successMessage && (
        <div className="mb-4 p-3.5 rounded-xl text-xs flex items-start gap-2.5 bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Officer Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder="name@mospi.gov.in"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-300">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              placeholder="••••••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0B4F9C] to-[#1258A2] hover:from-[#094182] hover:to-[#0f4d8e] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md cursor-pointer border border-blue-400/30 active:scale-[0.99] disabled:opacity-50"
        >
          <LogIn className="w-4 h-4" />
          <span>{isLoading ? "Signing In..." : "Sign In with Email"}</span>
        </button>

        {/* 4) Simple error handling under the form */}
        {errorMessage && (
          <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium animate-in fade-in duration-200">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </p>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-400">
          Need an officer account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUp}
            className="text-amber-400 font-bold hover:underline cursor-pointer"
          >
            Create an Account
          </button>
        </p>
      </div>
    </div>
  );
};
