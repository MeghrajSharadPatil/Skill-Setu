import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Mail, Lock, User, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

interface SignUpProps {
  onSuccess: (email: string) => void;
  onSwitchToSignIn: () => void;
  isLoading?: boolean;
}

export const SignUp: React.FC<SignUpProps> = ({
  onSuccess,
  onSwitchToSignIn,
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      // 1) For Sign Up: Use supabase.auth.signUp({ email, password })
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim() || undefined,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      // If data.session is null, email confirmation is required:
      // "After signUp(), if data.session is null, don’t redirect to the dashboard.
      //  Just show: 'Check your email and confirm your account before logging in.'"
      // "After a successful Supabase signUp({ email, password }):
      //  - Do NOT auto-login.
      //  - Redirect the user to the Sign In page.
      //  - Keep / pre-fill the email they just used for signup in the Sign In form."

      // Ensure no auto-login if session was returned
      if (data?.session) {
        await supabase.auth.signOut();
      }

      const registeredEmail = email.trim();

      // Pass email via query parameter so it persists on reload as well
      const url = new URL(window.location.href);
      url.searchParams.set("email", registeredEmail);
      url.searchParams.set("signup_success", "true");
      url.searchParams.delete("mode");
      window.history.pushState({}, "", url.toString());

      // Trigger navigation to Sign In with pre-filled email
      onSuccess(registeredEmail);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Informational Notification */}
      {infoMessage && (
        <div className="mb-4 p-3 rounded-xl text-xs flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{infoMessage}</span>
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name (Optional)
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B4F9C]/20 focus:border-[#0B4F9C] focus:outline-none transition"
              placeholder="e.g. Dr. Rajesh Kumar Sharma"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B4F9C]/20 focus:border-[#0B4F9C] focus:outline-none transition"
              placeholder="name@mospi.gov.in or student@university.edu"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700">
              Create Password
            </label>
            <span className="text-[10px] text-slate-500 font-medium">Min. 6 characters</span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B4F9C]/20 focus:border-[#0B4F9C] focus:outline-none transition"
              placeholder="••••••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-sm hover:shadow cursor-pointer active:scale-[0.99] disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
        </button>

        {/* Error handling under the form */}
        {errorMessage && (
          <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 font-medium animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}
      </form>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-[#0B4F9C] font-bold hover:underline cursor-pointer"
          >
            Sign In here
          </button>
        </p>
      </div>
    </div>
  );
};
