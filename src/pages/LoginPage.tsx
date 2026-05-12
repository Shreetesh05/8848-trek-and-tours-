import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Mountain,
  Github,
  Twitter,
} from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-stone-900 to-amber-900 p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 h-60 w-60 -translate-x-1/2 rounded-full bg-stone-500/10 blur-3xl" />
      </div>

      {/* Mountain Silhouette SVG (Decorative) */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#f8fafc"
            fillOpacity="0.1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="px-8 pb-8 pt-10">
            {/* Logo & Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-500 shadow-lg">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Trailhead</h1>
              <p className="mt-2 text-sm text-stone-200/80">
                Sign in to continue your adventure
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-stone-200"
                >
                  Email address
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-3 text-white placeholder-stone-400 backdrop-blur-sm transition duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    placeholder="explorer@trailhead.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-200"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-10 text-white placeholder-stone-400 backdrop-blur-sm transition duration-200 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-stone-400 bg-white/10 text-emerald-500 focus:ring-emerald-400/50"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-stone-200"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-amber-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>

              {/* Social Login */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-stone-300">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  <Twitter className="mr-2 h-5 w-5" />
                  Twitter
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-stone-300">
              New to Trailhead?{" "}
              <a
                href="#"
                className="font-medium text-emerald-300 hover:text-emerald-200"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400/60">
        © 2026 Trailhead Adventures — Find your path.
      </div>

      {/* Custom Animation Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;